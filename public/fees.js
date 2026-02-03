/**
 * 용차단가조회 및 관리 로직 - 매트릭스 방식 엑셀 연동 버전
 */

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/fees' || window.location.pathname === '/fee-entry') {
        const view = window.location.pathname.replace('/', '');
        if (view === 'fees') fetchFeeMaster();
    }
});

let feeEditIdx = null;
let entryDataList = []; // 현재 조회된 단가 리스트
let entryChanges = {}; // 변경된 항목 추적 {idx: {field: value}}
let bulkUploadData = []; // 엑셀 업로드 대기 데이터

async function fetchFeeMaster() {
    const container = document.getElementById('fees-matrix-body');
    const yearEl = document.getElementById('report-fee-year');
    const year = yearEl ? yearEl.value : new Date().getFullYear().toString();
    const affiliationEl = document.getElementById('report-fee-affiliation');
    const affiliation = affiliationEl ? affiliationEl.value.trim() : '';

    try {
        const res = await fetch('/api/fees');
        const { data } = await res.json();

        // 필터링
        let filtered = (data || []).filter(row => {
            if (year && row.year != year) return false;
            if (affiliation && !row.affiliation.toLowerCase().includes(affiliation.toLowerCase())) return false;
            return true;
        });

        renderFeeMatrix(filtered);
    } catch (e) {
        console.error('Fees Load Error:', e);
        container.innerHTML = '<div class="p-8 text-center text-red-500">데이터 로드 오류가 발생했습니다.</div>';
    }
}

/**
 * 리스트 형태로 렌더링
 */
/**
 * 엑셀 매트릭스 스타일로 렌더링 (행: 지역, 열: 소속사)
 */
function renderFeeMatrix(data) {
    const tbody = document.getElementById('fees-matrix-body');
    const thead = document.getElementById('fees-matrix-header');

    if (!data || data.length === 0) {
        thead.innerHTML = '';
        tbody.innerHTML = '<tr><td class="p-12 text-center text-slate-400 font-medium">조회된 단가 정보가 없습니다. 🧐</td></tr>';
        return;
    }

    // 1. 유니크한 소속사(Col)와 지역(Row) 추출
    const affiliationsMap = new Set();
    const regionsMap = new Set();
    data.forEach(row => {
        if (row.affiliation) affiliationsMap.add(row.affiliation);
        if (row.region) regionsMap.add(row.region);
    });

    // 2. 소속사 정렬 (최팀장님 요청: '이룸'을 가장 앞으로)
    const sortedAffs = Array.from(affiliationsMap).sort((a, b) => {
        if (a === '이룸') return -1;
        if (b === '이룸') return 1;
        return a.localeCompare(b);
    });
    const sortedRegions = Array.from(regionsMap).sort();

    // 3. 데이터 맵핑 (지역 + 소속사 조합)
    const feeLookup = {};
    data.forEach(row => {
        const key = `${row.region}|${row.affiliation}`;
        // 최신 데이터(readonly가 아닌 것 우선) 저장
        if (!feeLookup[key] || !row.readonly) {
            feeLookup[key] = row;
        }
    });

    // 4. 헤더 렌더링 (밝은 배경에 검정 글씨로 반전 - 시인성 확보)
    const colWidth = 110;
    thead.innerHTML = `
        <tr class="divide-x divide-slate-300 border-b border-slate-300 bg-slate-100">
            <th class="w-[160px] min-w-[160px] px-4 py-1.5 bg-slate-200 text-slate-900 sticky top-0 left-0 z-[100] border-r border-slate-300 shadow-[2px_2px_5px_rgba(0,0,0,0.1)] text-[10px]">지역 / 소속사</th>
            ${sortedAffs.map(aff => `
                <th class="min-w-[${colWidth}px] px-3 py-1.5 text-center text-[10px] font-black tracking-tighter truncate bg-slate-100 text-slate-900 sticky top-0 z-[80] shadow-[0_2px_3px_rgba(0,0,0,0.05)] border-b border-slate-300" title="${aff}">${aff}</th>
            `).join('')}
            <th class="w-full bg-slate-100 text-slate-900 sticky top-0 z-[75] border-b border-slate-300"></th>
        </tr>
    `;

    // 5. 바디 렌더링 (높이 대폭 축소)
    tbody.innerHTML = sortedRegions.map(region => {
        return `
            <tr class="divide-x divide-slate-200 hover:bg-indigo-50/40 transition-colors border-b border-slate-200 h-7">
                <td class="w-[160px] min-w-[160px] font-bold text-slate-800 px-4 py-1 bg-white sticky left-0 z-[50] border-r border-slate-200 shadow-[2px_0_5px_rgba(0,0,0,0.02)] truncate text-[10px]">${region}</td>
                ${sortedAffs.map(aff => {
            const row = feeLookup[`${region}|${aff}`];
            const price = row ? formatNumber(row.price) : '-';
            const isReadonly = row && row.readonly;
            return `
                        <td class="min-w-[${colWidth}px] px-3 py-1 text-right text-[11px] ${isReadonly ? 'text-slate-300 font-normal' : 'font-black text-indigo-700'}">
                            ${price}
                        </td>
                    `;
        }).join('')}
                <td class="w-full"></td>
            </tr>
        `;
    }).join('');
}

/**
 * 업체별/연도별 매트릭스 방식 엑셀 양식 다운로드
 * 가로: 소속사(업체명), 세로: 지역
 */
function downloadFeeTemplate() {
    const yearEl = document.getElementById('report-fee-year');
    const year = yearEl ? yearEl.value : new Date().getFullYear().toString();

    // [개선] 최상단에 연도 정보 배치 (최팀장님 제안)
    const headerRow1 = [["적용연도", year]];
    const headerRow2 = [[]]; // 빈 줄
    const matrixHeader = [["지역명(필수)", "신동철", "이룸", "심철환", "김태호", "박기사", "최기사"]];

    // 샘플 데이터
    const sampleRows = [
        ["창원, 밀양", 9, 9, 9, 9.5, 9, 9],
        ["울산, 거제", 12.5, 12.5, 13, 12, 12.5, 12.5],
        ["함안, 남해", 10.5, 10, 11, 10.5, 10, 10],
        ["납품처추가", 1, 1, 1.5, 1, 1, 1],
        ["P박스", 1, 1, 1, 1, 1, 1],
        ["회송", 10, 10, 12, 10, 10, 10]
    ];

    const finalAoa = headerRow1.concat(headerRow2).concat(matrixHeader).concat(sampleRows);
    const ws = XLSX.utils.aoa_to_sheet(finalAoa);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "단가입력_매트릭스");

    // 컬럼 너비 설정
    ws['!cols'] = [
        { wch: 20 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 15 }, { wch: 30 }
    ];

    const fileName = `전업체_단가표_양식_${year}년.xlsx`;
    XLSX.writeFile(wb, fileName);
}

/**
 * [핵심] 엑셀 파일 처리 핸들러
 */
function handleFeeExcel(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            if (rows.length < 2) {
                alert("데이터가 없습니다. 양식에 맞게 작성해 주세요.");
                return;
            }

            processMatrixExcelRows(rows);
        } catch (err) {
            console.error("Excel Read Error:", err);
            alert("엑셀 파일을 읽는 중 오류가 발생했습니다.");
        }
    };
    reader.readAsArrayBuffer(file);
    event.target.value = '';
}

/**
 * [핵심] 매트릭스 행/열 분해 로직 - 철저한 예외 처리
 */
function processMatrixExcelRows(rows) {
    try {
        if (!rows || rows.length < 1) {
            alert("엑셀 파일에 데이터가 없습니다. 🧐");
            return;
        }

        // 0. 연도 자동 인식 (1행에서 추출, 없으면 화면 설정값 사용)
        let year = null;
        const firstRow = rows[0];
        if (firstRow && (String(firstRow[0]).includes('연도') || String(firstRow[0]).includes('Year'))) {
            year = parseInt(firstRow[1]);
        }

        if (!year || isNaN(year)) {
            const yearEl = document.getElementById('report-fee-year');
            year = yearEl ? parseInt(yearEl.value) : new Date().getFullYear();
            console.log("Excel Year not found, using UI value:", year);
        } else {
            console.log("Excel Year auto-detected:", year);
        }

        // 1. 헤더 행(업체명 리스트) 찾기
        // 연도 행과 빈 줄이 있을 수 있으므로 '지역명' 키워드가 있는 행을 헤더로 간주
        let headerIdx = 0;
        for (let idx = 0; idx < rows.length; idx++) {
            if (rows[idx] && String(rows[idx][0]).includes('지역명')) {
                headerIdx = idx;
                break;
            }
        }

        const header = rows[headerIdx];
        const data = [];

        // 업체명 리스트 추출
        const affiliations = [];
        for (let j = 1; j < header.length; j++) {
            const aff = String(header[j] || '').trim();
            if (aff && !aff.includes('비고') && !aff.includes('기타')) {
                affiliations.push({ name: aff, colIdx: j });
            }
        }

        if (affiliations.length === 0) {
            alert("엑셀에서 업체명 헤더를 찾을 수 없습니다. \n'지역명(필수)' 행의 2번째 칸부터 업체명을 적어주세요. 🧐");
            return;
        }

        // 2. 데이터 행 파싱 (헤더 이후부터 끝까지)
        for (let i = headerIdx + 1; i < rows.length; i++) {
            const row = rows[i];
            if (!row || !Array.isArray(row)) continue;

            const region = String(row[0] || '').trim();
            if (!region || region === 'undefined' || region === '-' || region.includes('연도')) continue;

            affiliations.forEach(aff => {
                try {
                    const rawVal = row[aff.colIdx];
                    if (rawVal === undefined || rawVal === null || rawVal === '') return;

                    const priceVal = parseFloat(rawVal);
                    if (!isNaN(priceVal) && priceVal > 0) {
                        data.push({
                            affiliation: aff.name,
                            tonnage: 'ALL',
                            year: year,
                            region: region,
                            price: Math.round(priceVal * 10000),
                            memo: '',
                            isNew: true
                        });
                    }
                } catch (innerErr) {
                    console.warn(`Row ${i}, Col ${aff.name} skip:`, innerErr);
                }
            });
        }

        if (data.length === 0) {
            alert("엑셀에서 읽어온 단가 정보가 없습니다. \n금액이 숫자로 적혀 있는지 확인해 주세요. 🧐");
            return;
        }

        bulkUploadData = data;
        renderMatrixPreview();

    } catch (err) {
        console.error("Matrix Parse Global Error:", err);
        alert("엑셀 처리 중 예상치 못한 오류가 발생했습니다: " + err.message);
    }
}

/**
 * 미리보기 렌더링 (업체별 그룹화)
 */
function renderMatrixPreview() {
    const previewArea = document.getElementById('fee-bulk-preview');
    const countEl = document.getElementById('preview-count');
    const tbody = document.getElementById('preview-body');

    if (!previewArea || !countEl || !tbody) return;

    // [수정] 삭제된 bulk-fee-year 대신 통합 ID 사용 및 안전 처리
    const yearEl = document.getElementById('report-fee-year');
    const displayYear = bulkUploadData.length > 0 ? bulkUploadData[0].year : (yearEl ? yearEl.value : new Date().getFullYear());

    const affNames = [...new Set(bulkUploadData.map(d => d.affiliation))];
    const affCount = affNames.size || affNames.length;

    countEl.innerHTML = `<span class="text-indigo-600 font-bold">${displayYear}년 [${affCount}개 업체]</span> 총 ${bulkUploadData.length}개 단가`;
    previewArea.classList.remove('hidden');

    tbody.innerHTML = bulkUploadData.map(g => `
        <tr class="hover:bg-emerald-50/50 transition-colors border-b last:border-0 border-emerald-50 text-[11px]">
            <td class="px-3 py-1.5 text-center text-slate-500">${g.year}년</td>
            <td class="px-3 py-1.5 font-bold text-indigo-700">${g.affiliation}</td>
            <td class="px-3 py-1.5 font-medium text-slate-700">${g.region}</td>
            <td class="px-3 py-1.5 text-right font-bold text-blue-600">${formatNumber(g.price)}</td>
            <td class="px-4 py-1.5 text-slate-400 italic truncate max-w-[200px]" title="${g.memo}">${g.memo || '-'}</td>
        </tr>
    `).join('');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelBulkUpload() {
    if (!confirm("업로드를 취소하시겠습니까?")) return;
    bulkUploadData = [];
    document.getElementById('fee-bulk-preview').classList.add('hidden');
}

async function submitBulkFees() {
    if (bulkUploadData.length === 0) return;

    if (!confirm(`${bulkUploadData.length}건의 단가를 일괄 등록하시겠습니까?\n이미 해당 업체/연도에 등록된 기존 단가는 모두 이력으로 보관됩니다.`)) return;

    try {
        const res = await fetch('/api/fees/bulk', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fees: bulkUploadData })
        });
        const result = await res.json();

        if (result.success) {
            alert(`성공적으로 처리되었습니다. (${bulkUploadData.length}건)`);
            bulkUploadData = [];
            document.getElementById('fee-bulk-preview').classList.add('hidden');
            fetchFeeMaster();
        } else {
            alert("저장 실패: " + result.message);
        }
    } catch (e) {
        console.error("Bulk Upload Error:", e);
        alert("서버 전송 중 오류가 발생했습니다.");
    }
}

// 폼 초기화 및 정산 화면 연동용 함수 (필요 시 보강)
// [핵심] 개별 단가 조회 (필터 적용)
async function fetchFeeEntry() {
    const tbody = document.getElementById('fee-entry-tableBody');
    if (!tbody) return; // 요소가 없으면 중단 (안전장치)

    const yearEl = document.getElementById('entry-filter-year');
    const affEl = document.getElementById('entry-filter-affiliation');
    const regEl = document.getElementById('entry-filter-region');

    const year = yearEl ? yearEl.value : '';
    const aff = affEl ? affEl.value.trim().toLowerCase() : '';
    const reg = regEl ? regEl.value.trim().toLowerCase() : '';

    try {
        const res = await fetch('/api/fees');
        const { data } = await res.json();

        entryDataList = (data || []).filter(row => {
            if (year && row.year != year) return false;
            if (aff && !row.affiliation.toLowerCase().includes(aff)) return false;
            if (reg && !row.region.toLowerCase().includes(reg)) return false;
            return true;
        });

        renderFeeEntryList();
    } catch (e) {
        console.error('Fetch Fee Entry Error:', e);
        if (tbody) tbody.innerHTML = '<tr><td colspan="7" class="p-8 text-center text-red-500">조회 중 오류가 발생했습니다.</td></tr>';
    }
}

function renderFeeEntryList() {
    const tbody = document.getElementById('fee-entry-tableBody');
    if (!tbody) return; // 요소가 없으면 중단 (안전장치)

    if (entryDataList.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="p-12 text-center text-slate-400 italic">조회된 단가가 없습니다. 🧐</td></tr>';
        return;
    }

    tbody.innerHTML = entryDataList.map((row, i) => {
        const isReadonly = row.readonly === true;
        return `
            <tr class="${isReadonly ? 'bg-slate-50 opacity-60' : 'hover:bg-slate-50'} transition-colors border-b flex items-center">
                <td class="w-[40px] shrink-0 py-2 text-center text-slate-400">${i + 1}</td>
                <td class="w-[60px] shrink-0 py-2 text-center">${row.year}</td>
                <td class="w-[120px] shrink-0 py-2 px-4 font-medium truncate">${row.affiliation}</td>
                <td class="w-[150px] shrink-0 py-2 px-4 font-bold text-slate-700 truncate">${row.region}</td>
                <td class="w-[120px] shrink-0 py-2 text-right pr-4 font-bold text-indigo-600">${formatNumber(row.price)}</td>
                <td class="flex-grow py-2 px-4 text-slate-400 italic truncate" title="${row.memo}">${row.memo || '-'}</td>
                <td class="w-[60px] shrink-0 py-2 text-center">
                    <div class="flex items-center justify-center gap-2">
                        ${!isReadonly ? `
                            <button onclick="editFee(${row.idx})" class="text-indigo-600 hover:text-indigo-900 font-bold">수정</button>
                            <button onclick="deleteFee(${row.idx})" class="text-red-400 hover:text-red-600">삭제</button>
                        ` : '<span class="text-[9px] bg-slate-200 px-1 rounded">이력</span>'}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// 수정 모드 진입
function editFee(idx) {
    const item = entryDataList.find(d => d.idx === idx);
    if (!item) return;

    feeEditIdx = idx;
    document.getElementById('fee-affiliation').value = item.affiliation;
    document.getElementById('fee-year').value = item.year;
    document.getElementById('fee-region').value = item.region;
    document.getElementById('fee-price').value = item.price;
    document.getElementById('fee-memo').value = item.memo || '';

    // UI 변경
    document.getElementById('fee-edit-indicator').classList.remove('hidden');
    document.getElementById('btn-fee-save').innerText = '단가 업데이트';
    document.getElementById('btn-fee-save').classList.replace('bg-indigo-600', 'bg-amber-600');
    document.getElementById('btn-fee-archive').classList.remove('hidden');
    document.getElementById('btn-fee-archive').onclick = () => archiveFee(idx);

    document.getElementById('fee-price').focus();
}

async function saveFeeMaster() {
    const aff = document.getElementById('fee-affiliation').value.trim();
    const year = document.getElementById('fee-year').value;
    const region = document.getElementById('fee-region').value.trim();
    const price = document.getElementById('fee-price').value;

    if (!aff || !region || !price) {
        alert("소속사, 지역, 단가를 모두 입력해 주세요. 🧐");
        return;
    }

    const payload = {
        idx: feeEditIdx,
        affiliation: aff,
        year: parseInt(year),
        region: region,
        price: parseInt(price),
        memo: document.getElementById('fee-memo').value.trim(),
        tonnage: 'ALL' // 신규 구조에 따라 ALL로 고정
    };

    try {
        const res = await fetch('/api/fees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await res.json();

        if (result.success) {
            alert(feeEditIdx ? "수정되었습니다." : "등록되었습니다.");
            resetFeeForm();
            fetchFeeEntry();
        } else {
            alert("저장 실패: " + result.message);
        }
    } catch (e) {
        console.error('Save Fee Error:', e);
        alert("서버 통신 중 오류가 발생했습니다.");
    }
}

async function archiveFee(idx) {
    if (!confirm("해당 단가를 이력으로 전환하시겠습니까?\n이후에는 수정할 수 없으며, 새로운 단가를 등록해야 합니다.")) return;

    try {
        const res = await fetch('/api/fees/archive', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idx })
        });
        const result = await res.json();
        if (result.success) {
            alert("이력으로 전환되었습니다.");
            resetFeeForm();
            fetchFeeEntry();
        }
    } catch (e) {
        console.error('Archive Fee Error:', e);
    }
}

async function deleteFee(idx) {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
        const res = await fetch(`/api/fees?idx=${idx}`, { method: 'DELETE' });
        const result = await res.json();
        if (result.success) {
            fetchFeeEntry();
        }
    } catch (e) {
        console.error('Delete Fee Error:', e);
    }
}

function resetFeeForm() {
    feeEditIdx = null;
    document.getElementById('fee-affiliation').value = '';
    document.getElementById('fee-region').value = '';
    document.getElementById('fee-price').value = '';
    document.getElementById('fee-memo').value = '';

    document.getElementById('fee-edit-indicator').classList.add('hidden');
    document.getElementById('btn-fee-save').innerText = '단가 저장';
    document.getElementById('btn-fee-save').classList.replace('bg-amber-600', 'bg-indigo-600');
    document.getElementById('btn-fee-archive').classList.add('hidden');

    if (currentView === 'fees') fetchFeeMaster();
}

function formatNumber(num) {
    return new Intl.NumberFormat('ko-KR').format(num || 0);
}
