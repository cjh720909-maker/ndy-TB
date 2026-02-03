const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const FEE_FILE = path.join(DATA_DIR, 'fee_master.json');
const HISTORY_FILE = path.join(DATA_DIR, 'settlement_history.json');
const DRIVER_FILE = path.join(DATA_DIR, 'drivers.json');
const AFFILIATION_FILE = path.join(DATA_DIR, 'affiliations.json');

// 디렉터리 및 파일 초기화
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(FEE_FILE)) fs.writeFileSync(FEE_FILE, JSON.stringify([]));
if (!fs.existsSync(HISTORY_FILE)) fs.writeFileSync(HISTORY_FILE, JSON.stringify([]));
if (!fs.existsSync(DRIVER_FILE)) fs.writeFileSync(DRIVER_FILE, JSON.stringify([]));
if (!fs.existsSync(AFFILIATION_FILE)) fs.writeFileSync(AFFILIATION_FILE, JSON.stringify([]));

function readJson(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    } catch (e) {
        console.error(`Read error (${filePath}):`, e);
        return [];
    }
}

function writeJson(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (e) {
        console.error(`Write error (${filePath}):`, e);
        return false;
    }
}

// --- Fee Master Functions ---

function getFees() {
    return readJson(FEE_FILE);
}

function saveFee(fee) {
    const list = getFees();
    const updateDate = new Date().toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' });

    const feeIdx = fee.idx ? parseInt(fee.idx) : null;
    let targetIdx = -1;
    let isPriceChanged = fee.isPriceChanged === true; // 플래그 우선 확인

    if (feeIdx) {
        targetIdx = list.findIndex(item => parseInt(item.idx) === feeIdx);
        if (targetIdx !== -1) {
            if (list[targetIdx].readonly) return false;
            // 플래그가 없으면 직접 비교 (안전장치)
            if (fee.isPriceChanged === undefined) {
                if (parseInt(list[targetIdx].price) !== parseInt(fee.price)) {
                    isPriceChanged = true;
                }
            }
        }
    }

    if (isPriceChanged || !feeIdx) {
        // [A] 신규 레코드 생성 시나리오
        // 기존 데이터가 있다면 필드 누락 방지를 위해 병합
        const baseData = targetIdx !== -1 ? list[targetIdx] : {};
        const newRecord = {
            ...baseData,
            ...fee,
            idx: Date.now(),
            created_at: new Date(),
            updated_at: new Date(),
            readonly: false,
            price: parseInt(fee.price)
        };

        // [B] 이전 데이터 동결 처리
        const affMatch = String(newRecord.affiliation || '').trim();
        const regMatch = String(newRecord.region || '').trim();
        const yrMatch = parseInt(newRecord.year);

        list.forEach(item => {
            if (!item.readonly &&
                String(item.affiliation || '').trim() === affMatch &&
                parseInt(item.year) === yrMatch &&
                String(item.region || '').trim() === regMatch
            ) {
                item.region = (item.region || '').replace(' (변경)', '') + ' (변경)';
                item.memo = (item.memo ? item.memo + ' ' : '') + `[${updateDate} 수정]`;
                item.readonly = true;
                item.updated_at = new Date();
            }
        });

        list.push(newRecord);
    } else {
        // [C] 단순 업데이트 시나리오
        if (targetIdx !== -1) {
            list[targetIdx] = {
                ...list[targetIdx],
                ...fee,
                idx: feeIdx, // ID 보존
                updated_at: new Date()
            };
        }
    }

    return writeJson(FEE_FILE, list);
}

function archiveFee(idx) {
    const list = getFees();
    const updateDate = new Date().toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' });
    const targetIdx = list.findIndex(item => parseInt(item.idx) === parseInt(idx));

    if (targetIdx !== -1) {
        const item = list[targetIdx];
        item.region = (item.region || '').replace(' (변경)', '') + ' (변경)';
        item.memo = (item.memo ? item.memo + ' ' : '') + `[${updateDate} 이력전환]`;
        item.readonly = true;
        item.updated_at = new Date();
        return writeJson(FEE_FILE, list);
    }
    return false;
}

function deleteFee(idx) {
    const list = getFees();
    const newList = list.filter(item => parseInt(item.idx) !== parseInt(idx));
    return writeJson(FEE_FILE, newList);
}

function saveFeesBulk(fees) {
    const list = getFees();
    const updateDate = new Date().toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' });
    let count = 0;
    const now = Date.now();

    fees.forEach(newFee => {
        const feeIdx = newFee.idx ? parseInt(newFee.idx) : null;
        let targetIdx = -1;

        if (feeIdx) {
            targetIdx = list.findIndex(item => parseInt(item.idx) === feeIdx);
        }

        let isPriceChanged = newFee.isPriceChanged === true; // 플래그 우선 확인
        const newPrice = parseInt(newFee.price);

        if (targetIdx !== -1 && newFee.isPriceChanged === undefined) {
            // 플래그가 없으면 직접 비교 (안전장치)
            if (parseInt(list[targetIdx].price) !== newPrice) {
                isPriceChanged = true;
            }
        }

        // 금액 변동 또는 아예 신규인 경우
        if (isPriceChanged || targetIdx === -1) {
            // [데이터 병합] 기존 활성 데이터에서 기본 정보를 가져와 필드 누락 방지
            const baseData = targetIdx !== -1 ? list[targetIdx] : {};
            const newRecord = {
                ...baseData,
                ...newFee,
                idx: now + (count++),
                created_at: new Date(),
                updated_at: new Date(),
                readonly: false,
                price: newPrice,
                memo: newFee.memo || baseData.memo || ''
            };

            const affMatch = String(newRecord.affiliation || '').trim();
            const regMatch = String(newRecord.region || '').trim();
            const yrMatch = parseInt(newRecord.year);

            // [이전 데이터 일괄 동결 처리]
            list.forEach(item => {
                if (!item.readonly &&
                    String(item.affiliation || '').trim() === affMatch &&
                    parseInt(item.year) === yrMatch &&
                    String(item.region || '').trim() === regMatch
                ) {
                    item.region = (item.region || '').replace(' (변경)', '') + ' (변경)';
                    item.memo = (item.memo ? item.memo + ' ' : '') + `[${updateDate} 수정]`;
                    item.readonly = true;
                    item.updated_at = new Date();
                }
            });

            list.push(newRecord);
        } else if (targetIdx !== -1) {
            // 정보만 변경되는 경우 (예: 수정 사유 등)
            list[targetIdx] = {
                ...list[targetIdx],
                ...newFee,
                idx: feeIdx,
                updated_at: new Date()
            };
        }
    });

    return writeJson(FEE_FILE, list);
}

// --- Settlement History Functions ---

function getHistory() {
    return readJson(HISTORY_FILE);
}

function saveHistory(record) {
    const list = getHistory();
    if (record.idx) {
        // Update
        const targetIdx = list.findIndex(item => item.idx === parseInt(record.idx));
        if (targetIdx !== -1) {
            list[targetIdx] = { ...list[targetIdx], ...record, updated_at: new Date() };
        } else {
            // idx가 있지만 목록에 없는 경우 신규 취급 (또는 에러 처리)
            record.idx = Date.now() + Math.floor(Math.random() * 1000);
            record.saved_at = new Date();
            list.push(record);
        }
    } else {
        // Insert
        record.idx = Date.now() + Math.floor(Math.random() * 1000);
        record.saved_at = new Date();
        list.push(record);
    }
    return writeJson(HISTORY_FILE, list);
}

function deleteHistory(idx) {
    const list = getHistory();
    const newList = list.filter(item => item.idx !== parseInt(idx));
    return writeJson(HISTORY_FILE, newList);
}

// --- Driver Master Functions ---

function getDrivers() {
    return readJson(DRIVER_FILE);
}

function saveDriver(driver) {
    const list = getDrivers();
    if (driver.idx) {
        const targetIdx = list.findIndex(item => item.idx === parseInt(driver.idx));
        if (targetIdx !== -1) {
            list[targetIdx] = { ...list[targetIdx], ...driver, updated_at: new Date() };
        }
    } else {
        driver.idx = Date.now();
        driver.created_at = new Date();
        list.push(driver);
    }
    return writeJson(DRIVER_FILE, list);
}

function deleteDriver(idx) {
    const list = getDrivers();
    const newList = list.filter(item => item.idx !== parseInt(idx));
    return writeJson(DRIVER_FILE, newList);
}

// --- Affiliation Master Functions ---

function getAffiliations() {
    return readJson(AFFILIATION_FILE);
}

function saveAffiliation(aff) {
    const list = getAffiliations();
    if (aff.idx) {
        const targetIdx = list.findIndex(item => item.idx === parseInt(aff.idx));
        if (targetIdx !== -1) {
            list[targetIdx] = { ...list[targetIdx], ...aff, updated_at: new Date() };
        }
    } else {
        aff.idx = Date.now();
        aff.created_at = new Date();
        list.push(aff);
    }
    return writeJson(AFFILIATION_FILE, list);
}

function deleteAffiliation(idx) {
    const list = getAffiliations();
    const newList = list.filter(item => item.idx !== parseInt(idx));
    return writeJson(AFFILIATION_FILE, newList);
}

module.exports = {
    getFees,
    saveFee,
    saveFeesBulk,
    deleteFee,
    getHistory,
    saveHistory,
    deleteHistory,
    getDrivers,
    saveDriver,
    deleteDriver,
    getAffiliations,
    saveAffiliation,
    deleteAffiliation
};
