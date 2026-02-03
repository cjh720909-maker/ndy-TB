// dispatch_server.js
// [SME 개발 사수] 배차 요약 화면 (기사별 납품처/중량 집계)
require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
// const open = require('open'); // 브라우저 자동 실행용 (선택 사항, 없으면 생략 가능)

const app = express();
const port = 3011; // 기존 3010과 충돌 방지
const prisma = new PrismaClient();
const storage = require('./storage'); // JSON 로컬 저장소 추가

// 정적 파일 제공 (혹시 필요할 경우를 대비)
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const iconv = require('iconv-lite');

// ------------------------------------------------------------------
// [핵심] 깨진 한글 복구 함수 (EUC-KR)
// ------------------------------------------------------------------
function fixEncoding(str) {
    if (typeof str !== 'string') return str;
    try {
        // DB에서 binary로 읽어서 EUC-KR로 디코딩
        return iconv.decode(Buffer.from(str, 'binary'), 'euc-kr');
    } catch (e) {
        return str;
    }
}

// ------------------------------------------------------------------
// API: 배차 요약 정보 조회
// ------------------------------------------------------------------
app.get('/api/summary', async (req, res) => {
    try {
        const { startDate, endDate, drivers, custName } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: "시작일과 종료일을 입력해주세요." });
        }

        console.log(`[API] 배차 요약 조회 요청: ${startDate} ~ ${endDate}, 고객사: ${custName || '전체'}`);

        // 고객사 필터링 조건 (인코딩/공백 해결 방식)
        let customerCondition = "";
        if (custName && custName !== "") {
            customerCondition = ` AND TRIM(CONVERT(CAST(b.CB_DIV_CUST AS BINARY) USING euckr)) = CONVERT('${custName}' USING euckr)`;
        }

        const query = `
        SELECT
            b.B_DATE,
            c.CA_NAME,
            c.CA_NO,
            c.CA_KG,
            c.CA_GUN,
            GROUP_CONCAT(DISTINCT b.B_C_NAME SEPARATOR ', ') as dest_list,
            GROUP_CONCAT(DISTINCT b.CB_ADDRESS SEPARATOR '||') as addr_list,
            COUNT(DISTINCT b.B_C_NAME) as delivery_dest_count,
            COUNT(*) as total_count,
            SUM(b.B_KG) as total_weight
        FROM t_balju b
        LEFT JOIN t_car c ON b.CB_DRIVER = c.CB_DRIVER
        WHERE b.B_DATE >= '${startDate}' AND b.B_DATE <= '${endDate}'
        ${customerCondition}
        AND b.CB_DRIVER IS NOT NULL AND b.CB_DRIVER <> ''
        GROUP BY b.B_DATE, c.CA_NAME, c.CA_NO, c.CA_KG, c.CA_GUN
        ORDER BY b.B_DATE ASC, c.CA_NAME ASC
        `;

        const result = await prisma.$queryRawUnsafe(query);
        console.log(`[API] DB 조회 결과 수: ${result.length}개`);

        // [핵심] 등록된 용차 기사 목록 로드 (최팀장님 요청: 등록된 기사만 정산 대상으로)
        const registeredDrivers = storage.getDrivers();
        const registeredNames = new Set(registeredDrivers.map(d => (d.name || '').replace(/\s/g, '').trim()));

        // BigInt 처리 + 한글 인코딩 변환 + 이름 조합
        const serializedResult = result.map(row => {
            // [개선] 날짜 형식을 YYYY-MM-DD로 고정 (중복 정산 방지 필터링 정확도 향상)
            const rawDate = row.B_DATE || '';
            const date = (typeof rawDate === 'string') ? rawDate.substring(0, 10) : new Date(rawDate).toISOString().split('T')[0];
            const realName = fixEncoding(row.CA_NAME) || '미지정';
            const carNo = fixEncoding(row.CA_NO) || '';
            const destList = fixEncoding(row.dest_list) || '';
            const addrList = fixEncoding(row.addr_list) || '';
            const driverDiv = fixEncoding(row.CA_GUN) || '-';

            return {
                date: date,
                driverName: realName,
                driverDiv: driverDiv,
                carNo: carNo,
                destList: destList,
                addrDetail: addrList,
                maxWeight: Number(row.CA_KG || 0) * 1000,
                destCount: Number(row.delivery_dest_count || 0),
                totalCount: Number(row.total_count || 0),
                totalWeight: Number(row.total_weight || 0)
            };
        });

        // [필터링] 기사명 검색 조건 추출
        const searchDrivers = req.query.drivers ? req.query.drivers.split(',').map(d => d.trim()).filter(d => d) : [];

        // [핵심] 날짜 + 기사명 기준 통합
        const consolidatedMap = new Map();

        serializedResult.forEach(row => {
            const cleanDriverName = (row.driverName || '').replace(/\s/g, '').trim();

            const registeredDriver = registeredDrivers.find(d => (d.name || '').replace(/\s/g, '').trim() === cleanDriverName);
            if (!registeredDriver) return;

            // 기사명 검색 필터링
            if (searchDrivers.length > 0) {
                const isMatch = searchDrivers.some(sn => cleanDriverName.includes(sn.replace(/\s/g, '')));
                if (!isMatch) return;
            }

            const key = `${row.date}_${cleanDriverName}`;
            if (!consolidatedMap.has(key)) {
                consolidatedMap.set(key, {
                    date: row.date,
                    driverName: row.driverName,
                    // [개선] 기사 마스터의 소속사 우선 사용 (단가표 매칭용)
                    driverDiv: registeredDriver.affiliation || (row.driverDiv && row.driverDiv !== '-' ? row.driverDiv.replace(/[\r\n]/g, ' ').trim() : ''),
                    tonnage: (row.maxWeight / 1000) + 'T',
                    destDetail: '',
                    addrDetail: '',
                    destCount: 0,
                    totalCount: 0,
                    totalWeight: 0,
                    destSet: new Set(),
                    addrSet: new Set()
                });
            }

            const target = consolidatedMap.get(key);
            if ((!target.driverDiv || target.driverDiv === '-') && (row.driverDiv && row.driverDiv !== '-')) {
                target.driverDiv = row.driverDiv.replace(/[\r\n]/g, ' ').trim();
            }

            // target.destCount += row.destCount; // 단순 합산 대신 고유 주소 카운트로 대체 (최팀장님 요청)
            target.totalCount += row.totalCount;
            target.totalWeight += row.totalWeight;

            // 납품처 및 주소 리스트 합치기
            if (row.destList) {
                row.destList.split(',').forEach(d => {
                    const trimmed = d.replace(/[\r\n]/g, ' ').trim();
                    if (trimmed) target.destSet.add(trimmed);
                });
            }
            if (row.addrDetail) {
                row.addrDetail.split('||').forEach(a => {
                    const trimmed = a.replace(/[\r\n]/g, ' ').trim();
                    if (trimmed) target.addrSet.add(trimmed);
                });
            }
        });

        const history = storage.getHistory();
        const settledKeys = new Set(history.map(h => `${h.date}_${(h.name || h.driverName || '').replace(/\s/g, '').trim()}`));

        const finalResult = Array.from(consolidatedMap.values())
            .map(item => {
                item.destDetail = Array.from(item.destSet).join(', ') || '-';
                item.addrDetail = Array.from(item.addrSet).join('||') || '-';
                // [개선] 동일 주소는 한 곳으로 집계 (최팀장님 룰)
                item.destCount = item.addrSet.size;
                // [개선] 중량 소수점 올림 처리 (최팀장님 요청)
                item.totalWeight = Math.ceil(item.totalWeight || 0);

                delete item.destSet;
                delete item.addrSet;
                return item;
            })
            // [중복 방지] 이미 정산된 내역은 자동 정산 목록에서 제외
            .filter(item => {
                const key = `${item.date}_${(item.driverName || '').replace(/\s/g, '').trim()}`;
                return !settledKeys.has(key);
            });

        // 전체 합계 계산 (통합된 결과 기준)
        const summary = {
            totalDrivers: finalResult.length,
            totalDestinations: finalResult.reduce((acc, cur) => acc + cur.destCount, 0),
            totalShipments: finalResult.reduce((acc, cur) => acc + cur.totalCount, 0),
            totalWeight: Number(finalResult.reduce((acc, cur) => acc + cur.totalWeight, 0).toFixed(2))
        };

        res.json({
            data: finalResult,
            summary: summary
        });

    } catch (e) {
        console.error("API 에러:", e);
        if (!res.headersSent) {
            res.status(500).json({ error: e.message });
        }
    }
});

// ------------------------------------------------------------------
// API: 용차 비용 목록 조회
// ------------------------------------------------------------------
app.get('/api/yongcha-costs', async (req, res) => {
    try {
        const { startDate, endDate, driverName } = req.query;
        let whereClause = "WHERE 1=1";

        if (startDate && endDate) {
            whereClause += ` AND IC_DATE >= '${startDate}' AND IC_DATE <= '${endDate}'`;
        }

        if (driverName && driverName !== '') {
            whereClause += ` AND TRIM(CONVERT(CAST(IC_NAME AS BINARY) USING euckr)) LIKE CONVERT('%${driverName}%' USING euckr)`;
        }

        const query = `
            SELECT 
                IC_IDX, IC_DATE, IC_NAME, IC_SO, IC_NAP, IC_TON, IC_KUM, IC_YO, IC_CHUNG, IC_UN, IC_MEMO, IC_DONE, IC_MAGAM
            FROM t_il_car
            ${whereClause}
            ORDER BY IC_DATE DESC, IC_IDX DESC
        `;

        const result = await prisma.$queryRawUnsafe(query);

        const safeResult = result.map(row => ({
            idx: Number(row.IC_IDX),
            date: row.IC_DATE,
            name: fixEncoding(row.IC_NAME),
            so: fixEncoding(row.IC_SO),
            nap: fixEncoding(row.IC_NAP),
            ton: fixEncoding(row.IC_TON),
            kum: Number(row.IC_KUM || 0),
            yo: fixEncoding(row.IC_YO),
            chung: fixEncoding(row.IC_CHUNG),
            un: Number(row.IC_UN || 0),
            memo: fixEncoding(row.IC_MEMO),
            done: row.IC_DONE,
            magam: row.IC_MAGAM
        }));

        res.json({ data: safeResult });

    } catch (e) {
        console.error("Yongcha GET Error:", e);
        res.status(500).json({ error: e.message });
    }
});

// ------------------------------------------------------------------
// API: 용차 비용 저장/수정 (JSON Storage 전환)
// ------------------------------------------------------------------
app.post('/api/yongcha-costs', async (req, res) => {
    try {
        const success = storage.saveHistory(req.body);
        res.json({ success: true, message: success ? "저장되었습니다." : "저장 실패" });
    } catch (e) {
        console.error("Yongcha POST Error:", e);
        res.status(500).json({ error: e.message });
    }
});

// ------------------------------------------------------------------
// API: 용차 비용 삭제 (JSON Storage 전환)
// ------------------------------------------------------------------
app.delete('/api/yongcha-costs', async (req, res) => {
    try {
        const { idx } = req.query;
        if (!idx) return res.status(400).json({ error: "ID가 없습니다." });

        const success = storage.deleteHistory(idx);
        res.json({ success, message: success ? "삭제되었습니다." : "삭제 실패" });
    } catch (e) {
        console.error("Yongcha DELETE Error:", e);
        res.status(500).json({ error: e.message });
    }
});

// ------------------------------------------------------------------
// API: 피킹 분석 정보 조회 (배차명별 상세 집계 - t_code_340 매칭 적용)


// ------------------------------------------------------------------
// API: 고객사 목록 조회 (t_cust 기준)
// ------------------------------------------------------------------
app.get('/api/customers', async (req, res) => {
    try {
        const query = `SELECT DISTINCT CB_DIV_CUST FROM t_cust WHERE CB_DIV_CUST IS NOT NULL AND CB_DIV_CUST <> '' ORDER BY CB_DIV_CUST ASC`;
        const result = await prisma.$queryRawUnsafe(query);
        const customers = result.map(row => fixEncoding(row.CB_DIV_CUST)).filter(name => name);
        console.log(`[API] 고객사 목록 로드 성공: ${customers.length}개`);
        res.json({ data: customers });
    } catch (e) {
        console.error("Customers API Error:", e);
        res.status(500).json({ error: e.message });
    }
});

// ------------------------------------------------------------------
// API: 비용 단가 마스터 (JSON Storage)
// ------------------------------------------------------------------
app.get('/api/fees', (req, res) => {
    res.json({ data: storage.getFees() });
});

app.post('/api/fees/archive', (req, res) => {
    const { idx } = req.body;
    if (!idx) return res.status(400).json({ success: false, message: "ID가 필요합니다." });
    const success = storage.archiveFee(idx);
    res.json({ success, message: success ? "이력으로 전환되었습니다." : "전환 실패" });
});

app.post('/api/fees', (req, res) => {
    const success = storage.saveFee(req.body);
    res.json({ success, message: success ? "저장되었습니다." : "저장 실패" });
});

app.delete('/api/fees', (req, res) => {
    const success = storage.deleteFee(req.query.idx);
    res.json({ success, message: success ? "삭제되었습니다." : "삭제 실패" });
});

app.post('/api/fees/bulk', (req, res) => {
    try {
        const { fees } = req.body;
        console.log(`[bulk] 요청 수신: ${fees ? fees.length : 0}건`);
        if (!fees || !Array.isArray(fees)) {
            return res.status(400).json({ success: false, message: "올바른 데이터 형식이 아닙니다." });
        }
        const success = storage.saveFeesBulk(fees);
        console.log(`[bulk] 저장 성공 여부: ${success}`);
        res.json({ success, message: success ? `${fees.length}건의 단가가 처리되었습니다.` : "일괄 저장 실패" });
    } catch (e) {
        console.error("[bulk] 에러 발생:", e);
        res.status(500).json({ success: false, message: "서버 처리 중 오류가 발생했습니다: " + e.message });
    }
});

app.get('/api/ping', (req, res) => res.json({ status: 'ok', time: new Date() }));

// ------------------------------------------------------------------
// API: 정산 결과 저장 및 히스토리 조회
// ------------------------------------------------------------------
app.get('/api/settlement-history', (req, res) => {
    const { startDate, endDate, name } = req.query;
    let list = storage.getHistory();

    // 백엔드 필터링 적용
    if (startDate || endDate || name) {
        list = list.filter(row => {
            if (startDate && row.date < startDate) return false;
            if (endDate && row.date > endDate) return false;
            // name 필터: 기사명에 포함되어 있는지 확인 (대소문자 무시 및 공백 제거 비교)
            if (name) {
                const searchName = name.replace(/\s/g, '').toLowerCase();
                const targetName = (row.name || '').replace(/\s/g, '').toLowerCase();
                if (!targetName.includes(searchName)) return false;
            }
            return true;
        });
    }

    // 최신순 정렬
    list.sort((a, b) => {
        if (a.date !== b.date) return b.date.localeCompare(a.date);
        return (b.idx || 0) - (a.idx || 0);
    });

    res.json({ data: list });
});

app.post('/api/save-settlement', (req, res) => {
    const success = storage.saveHistory(req.body);
    res.json({ success, message: success ? "정산 기록이 전송되었습니다." : "전송 실패" });
});

app.delete('/api/settlement-history', (req, res) => {
    const success = storage.deleteHistory(req.query.idx);
    res.json({ success, message: success ? "삭제되었습니다." : "삭제 실패" });
});

// ------------------------------------------------------------------
// API: 용차 기사 마스터
// ------------------------------------------------------------------
app.get('/api/drivers', (req, res) => {
    res.json({ data: storage.getDrivers() });
});

app.post('/api/drivers', (req, res) => {
    const success = storage.saveDriver(req.body);
    res.json({ success, message: success ? "저장되었습니다." : "저장 실패" });
});

app.delete('/api/drivers', (req, res) => {
    const success = storage.deleteDriver(req.query.idx);
    res.json({ success, message: success ? "삭제되었습니다." : "삭제 실패" });
});

// ------------------------------------------------------------------
// API: 소속 마스터
// ------------------------------------------------------------------
app.get('/api/affiliations', (req, res) => {
    res.json({ data: storage.getAffiliations() });
});

app.post('/api/affiliations', (req, res) => {
    const success = storage.saveAffiliation(req.body);
    res.json({ success, message: success ? "저장되었습니다." : "저장 실패" });
});

app.delete('/api/affiliations', (req, res) => {
    const success = storage.deleteAffiliation(req.query.idx);
    res.json({ success, message: success ? "삭제되었습니다." : "삭제 실패" });
});

// ------------------------------------------------------------------
// API: 헬스체크 및 버전 확인
// ------------------------------------------------------------------
app.get('/api/ping', (req, res) => {
    res.json({ status: 'ok', version: '1.3.2', time: new Date() });
});

// 글로벌 에러 핸들러 (HTML 대신 항상 JSON 반환)
app.use((err, req, res, next) => {
    console.error("[Global Error]", err);
    res.status(err.status || 500).json({
        success: false,
        message: "서버 오류가 발생했습니다.",
        error: err.message
    });
});

app.listen(port, () => {
    console.log(`[Server] http://localhost:${port} 에서 서버 실행 중...`);
});

module.exports = app;
