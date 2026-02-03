/**
 * Batch Settlement Logic (Inteligent Auto Settle)
 */

let batchData = [];
let localFeeMaster = [];

/**
 * 뷰 전환 시 자동 데이터 로드 리스너
 */
async function loadBatchSettleData() {
    const sDate = document.getElementById('startDate').value;
    const eDate = document.getElementById('endDate').value;
    const driverVal = document.getElementById('driverInput').value;
    const custName = ''; // 고객사 필드 제거됨

    if (!sDate || !eDate) return;
    if (!validateDateRange(sDate, eDate)) return;

    const tbody = document.getElementById('batch-settle-tableBody');
    if (!tbody) return;

    tbody.innerHTML = '<tr><td colspan="13" class="p-12 text-center text-indigo-500 font-bold"><i class="fas fa-spinner fa-spin mr-2"></i>정산 대상 데이터 로드 중...</td></tr>';

    try {
        // 1. 단가 마스터 로드 (캐시 활용)
        if (!localFeeMaster || localFeeMaster.length === 0) {
            const feeRes = await fetch('/api/fees');
            const feeJson = await feeRes.json();
            localFeeMaster = feeJson.data || [];
        }

        // 2. 배차 실적 로드
        const url = `/api/summary?startDate=${sDate}&endDate=${eDate}&drivers=${encodeURIComponent(driverVal)}&custName=${encodeURIComponent(custName)}`;
        const res = await fetch(url);
        const json = await res.json();

        batchData = json.data || [];

        if (batchData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="13" class="p-16 text-center text-slate-400">조회된 정산 대상 데이터가 없습니다.<br><span class="text-[10px]">날짜와 필터를 확인해주세요.</span></td></tr>';
        } else {
            // 상단 전체선택 체크박스 초기화
            const selectAllCb = document.getElementById('batch-select-all');
            if (selectAllCb) selectAllCb.checked = true;
            renderBatchSettleTable();
        }
    } catch (e) {
        console.error('Batch Load Error:', e);
        tbody.innerHTML = '<tr><td colspan="13" class="p-8 text-center text-red-500 font-bold">데이터 로드 중 오류가 발생했습니다.</td></tr>';
    }
}

/**
 * 주소 기반 권역 분석 (최팀장님 룰 적용)
 */
function parseRegionFromAddress(address) {
    if (!address) return '';
    const parts = address.split(' ').map(p => p.trim()).filter(p => p);
    if (parts.length === 0) return '';

    const first = parts[0];
    const second = parts[1] || '';

    // [개선] 부산, 울산, 대구 등 광역시는 2글자로 축약
    if (first.includes('부산') || first.includes('울산') || first.includes('대구') || first.includes('광주')) {
        return first.substring(0, 2);
    }

    // [개선] 경남/경북 지역 처리
    if (first.includes('경남') || first.includes('경상남도') || first.includes('경북') || first.includes('경상북도')) {
        return second ? second.replace('시', '').replace('군', '') : first.substring(0, 2);
    }

    // [개선] 그 외 일반 시/군 (김해시 -> 김해)
    return first.replace('시', '').replace('군', '');
}

/**
 * 단가 기반 지능형 정산 로직 (권역 가산금 및 차량 단가 포함)
 */
function calculateSmartPrice(row, isPbox = false, isReturn = false, gwon = 0, selectedTonnage = '') {
    const rawAddr = row.addrDetail || '';
    const affiliation = (row.driverDiv || '').trim();
    const cleanAff = affiliation.replace(/\d+$/, '').trim(); // 소속 숫자 제거 및 트림

    // [개선] 배차 날짜에서 연도 추출 (정확한 연도별 단가 매칭을 위해)
    const yearMatch = row.date ? parseInt(row.date.split('-')[0]) : new Date().getFullYear();

    const stopCount = parseInt(row.destCount) || 1;

    // 1. 주소에서 모든 가능한 권역 추출
    const addrs = rawAddr.split('||').map(s => s.trim()).filter(s => s);
    const regionsInAddr = [...new Set(addrs.map(addr => parseRegionFromAddress(addr)).filter(r => r))];

    // 2. 단가표에서 매칭되는 모든 권역 단가 조회 (연도 + 소속사 + 지역 매칭)
    function findFees(aff) {
        return localFeeMaster.filter(f => {
            if (f.readonly) return false; // 최신 단가만 사용
            if (parseInt(f.year) !== yearMatch) return false; // 연도 불일치 제외

            const fAff = (f.affiliation || '').trim().replace(/\d+$/, '');
            const fReg = (f.region || '').trim();

            return (fAff === aff || fAff === cleanAff) && regionsInAddr.includes(fReg);
        });
    }

    let matchedFees = findFees(cleanAff);

    // 3. 가장 높은 단가를 기본가(시작금액)로 설정
    let baseFee = null;
    if (matchedFees.length > 0) {
        baseFee = matchedFees.sort((a, b) => parseInt(b.price) - parseInt(a.price))[0];
    }

    // 4. 추가 비용 (납품처추가, 피박스, 회송) - 해당 연도 단가 사용
    function findExtraFee(aff, reg) {
        // [수정] 1순위: 해당 업체 전용 단가
        let fee = localFeeMaster.find(f => {
            if (f.readonly || parseInt(f.year) !== yearMatch) return false;
            const fAff = (f.affiliation || '').trim().replace(/\d+$/, '');
            const fReg = (f.region || '').trim();
            return fAff === aff && fReg === reg;
        });

        // [추가] 2순위: 공통 단가가 있나 확인 (소속사가 'ALL' 또는 빈값인 경우 대비)
        if (!fee) {
            fee = localFeeMaster.find(f => {
                if (f.readonly || parseInt(f.year) !== yearMatch) return false;
                const fAff = (f.affiliation || '').trim().toUpperCase();
                const fReg = (f.region || '').trim();
                return (fAff === 'ALL' || fAff === '공통') && fReg === reg;
            });
        }
        return fee;
    }

    const extraStopFeeObj = findExtraFee(cleanAff, '납품처추가');
    const pboxFeeObj = findExtraFee(cleanAff, '피박스'); // [수정] P박스 -> 피박스 (데이터와 일치)
    const returnFeeObj = findExtraFee(cleanAff, '회송');

    const basePrice = baseFee ? parseInt(baseFee.price) : 0;
    const stopPriceValue = extraStopFeeObj ? parseInt(extraStopFeeObj.price) : 0;
    const pboxPriceValue = pboxFeeObj ? parseInt(pboxFeeObj.price) : 0;
    const returnPriceValue = returnFeeObj ? parseInt(returnFeeObj.price) : 0;

    // 5. 추가 요금 산정
    const extraStops = Math.max(0, stopCount - 1);
    let extraAmount = (extraStops * stopPriceValue);
    if (isPbox) extraAmount += pboxPriceValue;
    if (isReturn) extraAmount += returnPriceValue;
    const gwonAmount = (parseInt(gwon) || 0) * 10000;
    extraAmount += gwonAmount;

    // 4-1. 차량 단가 추가 (사용자 선택)
    let tonnageAmount = 0;
    let tonnageFeeObj = null;
    if (selectedTonnage) {
        tonnageFeeObj = findExtraFee(cleanAff, selectedTonnage);
        if (tonnageFeeObj) {
            tonnageAmount = parseInt(tonnageFeeObj.price);
            extraAmount += tonnageAmount;
        }
    }

    let finalPrice = basePrice + extraAmount;

    // 정산 근거(Memo) 작성
    const summary = summarizeRegions(rawAddr);
    let reason = '';
    if (basePrice > 0) {
        reason = `(${summary}) [${baseFee.region}기준] ${formatNumber(basePrice)}원`;
        if (extraStops > 0) reason += ` + 추가${extraStops}곳`;
        if (isPbox) reason += ` + P박스`;
        if (isReturn) reason += ` + 회송`;
        if (gwon > 0) reason += ` + 권역${gwon}`;
        if (tonnageAmount > 0) reason += ` + ${selectedTonnage}(${formatNumber(tonnageAmount)})`;
    } else {
        reason = `(${summary}) [!] 단가표 매칭 실패`;
    }

    return {
        basePrice,
        extraAmount,
        finalPrice,
        reason,
        regions: regionsInAddr,
        isSuccess: basePrice > 0
    };
}

/**
 * 주소 목록 요약 (예: 부산 2, 김해 1)
 */
function summarizeRegions(addrDetail) {
    if (!addrDetail || addrDetail === '-') return '-';

    const addrs = addrDetail.split('||').map(a => a.trim()).filter(a => a);
    if (addrs.length === 0) return '-';

    const countMap = {};
    addrs.forEach(addr => {
        const region = parseRegionFromAddress(addr);
        // 물음표나 하이픈 등 의미 없는 기호 제외
        if (region && region !== '?' && region !== '-') {
            countMap[region] = (countMap[region] || 0) + 1;
        }
    });

    const summary = Object.entries(countMap)
        .map(([region, count]) => `${region} ${count}`) // 스크린샷과 동일하게 띄어쓰기 복원
        .join(', ');

    return summary || '-';
}

/**
 * 결과 렌더링
 */
function renderBatchSettleTable() {
    const tbody = document.getElementById('batch-settle-tableBody');
    if (!tbody) return;

    if (batchData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="13" class="p-12 text-center text-slate-400">정산할 데이터가 없습니다.</td></tr>';
        return;
    }

    tbody.innerHTML = batchData.map((row, i) => {
        row.isPbox = row.isPbox || false;
        row.isReturn = row.isReturn || false;
        row.gwon = row.gwon || 0;
        row.selectedTonnage = row.selectedTonnage || ''; // Initialize tonnage

        const calc = calculateSmartPrice(row, row.isPbox, row.isReturn, row.gwon, row.selectedTonnage);
        row.calc = calc;

        // 주소 요약 생성
        const addrSummary = summarizeRegions(row.addrDetail);

        return `
            <tr id="batch-row-${i}" class="hover:bg-slate-50 flex px-6 items-center border-b border-slate-50 last:border-0 transition-colors">
                <td class="py-2 text-center text-slate-400 w-[30px] shrink-0 text-[10px]">${i + 1}</td>
                <td class="py-2 text-slate-600 w-[70px] shrink-0 text-[10px]">${row.date || '-'}</td>
                <td class="py-2 font-bold text-slate-800 w-[70px] shrink-0 truncate text-[11px]">${row.driverName || '-'}</td>
                <td class="py-2 text-slate-500 w-[80px] shrink-0 truncate text-[10px]">${row.driverDiv || '-'}</td>
                <td class="py-2 w-[60px] shrink-0 px-1">
                    <input type="number" value="${row.totalWeight}" 
                        class="w-full text-right px-1 py-0.5 border border-transparent hover:border-slate-300 focus:border-indigo-500 rounded font-bold text-indigo-700 bg-transparent text-[11px]"
                        onchange="batchData[${i}].totalWeight = parseInt(this.value) || 0">
                </td>
                <td class="py-2 w-[315px] shrink-0 px-4">
                    <div class="text-[11px] text-indigo-700 font-bold truncate" title="${(row.addrDetail || '').replace(/\|\|/g, '\n')}">${addrSummary}</div>
                    <div class="text-[9px] text-slate-400 truncate">${row.destDetail || '-'}</div>
                </td>
                <td class="py-2 w-[60px] shrink-0 text-center text-[10px] font-bold text-indigo-600">${row.destCount}</td>
                <td class="py-2 w-[40px] shrink-0 text-center">
                    <input type="checkbox" onchange="toggleBatchDetail(${i}, 'isPbox', this.checked)" ${row.isPbox ? 'checked' : ''} class="w-3.5 h-3.5 rounded border-slate-300">
                </td>
                <td class="py-2 w-[40px] shrink-0 text-center">
                    <input type="checkbox" onchange="toggleBatchDetail(${i}, 'isReturn', this.checked)" ${row.isReturn ? 'checked' : ''} class="w-3.5 h-3.5 rounded border-slate-300">
                </td>
                <td class="py-2 w-[40px] shrink-0 text-center px-1">
                    <input type="number" min="0" max="9" value="${row.gwon || 0}" 
                        class="w-full text-center px-1 py-0.5 border border-slate-200 focus:border-indigo-500 rounded font-bold text-amber-600 bg-white text-[11px]"
                        onchange="toggleBatchDetail(${i}, 'gwon', this.value)">
                </td>
                <td class="py-2 w-[70px] shrink-0 text-center px-1">
                    <select onchange="toggleBatchDetail(${i}, 'selectedTonnage', this.value)" 
                        class="w-full px-1 py-0.5 border border-slate-200 focus:border-indigo-500 rounded font-bold text-slate-700 bg-white text-[10px]">
                        <option value="">-</option>
                        <option value="2.5T" ${row.selectedTonnage === '2.5T' ? 'selected' : ''}>2.5T</option>
                        <option value="3.5T" ${row.selectedTonnage === '3.5T' ? 'selected' : ''}>3.5T</option>
                        <option value="5T" ${row.selectedTonnage === '5T' ? 'selected' : ''}>5T</option>
                    </select>
                </td>
                <td id="batch-base-${i}" class="py-2 w-[70px] shrink-0 text-right px-2 font-bold text-slate-400 text-[10px]">${formatNumber(calc.basePrice)}</td>
                <td id="batch-extra-${i}" class="py-2 w-[70px] shrink-0 text-right px-2 font-bold text-amber-500 text-[10px]">${formatNumber(calc.extraAmount)}</td>
                <td class="py-2 w-[70px] shrink-0 px-1">
                    <input type="number" id="batch-price-${i}" value="${calc.finalPrice}" 
                        class="w-full text-right px-1 py-0.5 border border-transparent hover:border-indigo-300 focus:border-indigo-500 rounded font-bold text-indigo-600 bg-indigo-50/30 transition-all text-[11px]"
                        onchange="batchData[${i}].calc.finalPrice = parseInt(this.value) || 0">
                </td>
                <td class="py-2 flex-grow px-2">
                    <input type="text" id="batch-reason-${i}" value="${calc.reason}" 
                        class="w-full px-2 py-0.5 border border-transparent hover:border-slate-300 focus:border-indigo-500 rounded text-[10px] text-slate-500 italic bg-transparent focus:bg-white transition-all"
                        onchange="batchData[${i}].calc.reason = this.value">
                </td>
                <td class="py-2 w-[40px] shrink-0 text-center">
                    <input type="checkbox" checked class="batch-row-checkbox w-3.5 h-3.5 rounded border-slate-300" data-idx="${i}">
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * 개별 옵션 변경 핸들러
 */
function toggleBatchDetail(i, field, value) {
    const row = batchData[i];
    if (!row) return;

    if (field === 'gwon') row.gwon = parseInt(value) || 0;
    else if (field === 'selectedTonnage') row.selectedTonnage = value;
    else row[field] = value;

    // 재계산
    const newCalc = calculateSmartPrice(row, row.isPbox, row.isReturn, row.gwon || 0, row.selectedTonnage || '');
    row.calc = newCalc;

    // UI 실시간 업데이트
    const baseEl = document.getElementById(`batch-base-${i}`);
    const extraEl = document.getElementById(`batch-extra-${i}`);
    const priceEl = document.getElementById(`batch-price-${i}`);
    const reasonEl = document.getElementById(`batch-reason-${i}`);

    if (baseEl) baseEl.innerText = formatNumber(newCalc.basePrice);
    if (extraEl) extraEl.innerText = formatNumber(newCalc.extraAmount);
    if (priceEl) priceEl.value = newCalc.finalPrice;
    if (reasonEl) reasonEl.value = newCalc.reason;

    // 행 배경색 강조
    const tr = document.getElementById(`batch-row-${i}`);
    if (tr) {
        if (row.isPbox || row.isReturn) tr.classList.add('bg-amber-50/20');
        else tr.classList.remove('bg-amber-50/20');
    }
}

/**
 * 일괄 전송 (History 저장)
 */
async function sendBatchToHistory() {
    const checkboxes = document.querySelectorAll('.batch-row-checkbox:checked');
    if (checkboxes.length === 0) return alert('전송할 항목을 선택해 주세요.');

    if (!confirm(`${checkboxes.length}건의 정산 내역을 용차 비용 정산(이력)으로 전송하시겠습니까?`)) return;

    let successCount = 0;
    let failCount = 0;

    for (const cb of checkboxes) {
        const i = parseInt(cb.getAttribute('data-idx'));
        const row = batchData[i];

        const payload = {
            date: row.date,
            name: row.driverName,
            so: row.driverDiv || '-',
            // [개선] 1순위: '부산1, 김해2' 형태의 요약 / 2순위: 원래 count
            nap: summarizeRegions(row.addrDetail) || (row.destCount + '곳'),
            ton: row.totalWeight, // [개선] 수정된 중량 반영
            yo: row.calc.reason,
            kum: row.calc.finalPrice,
            un: 0, // 청구 금액은 별도 입력 루틴이 필요하다면 보강
            memo: document.getElementById(`batch-reason-${i}`).value,
            isPbox: row.isPbox,
            isReturn: row.isReturn
        };

        try {
            const res = await fetch('/api/save-settlement', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await res.json();
            if (result.success) successCount++;
            else failCount++;
        } catch (e) {
            failCount++;
        }
    }

    alert(`전송 완료! (성공: ${successCount}건, 실패: ${failCount}건)`);
    loadBatchSettleData();
}

/**
 * 전체 선택 / 취소 토글
 */
function toggleAllBatchRows(checked) {
    const checkboxes = document.querySelectorAll('.batch-row-checkbox');
    checkboxes.forEach(cb => {
        cb.checked = checked;
    });
}

/**
 * 버튼 연동용 함수들: 정산값 일괄 계산 (기능 유지하되 UI에서 숨김 처리됨)
 */
async function applyAutoSettlement() {
    // 1. 단가표 최신화
    const feeRes = await fetch('/api/fees');
    const feeJson = await feeRes.json();
    localFeeMaster = feeJson.data || [];

    // 2. 현재 로드된 데이터(batchData)에 대해 재계산 수행
    if (batchData.length === 0) {
        loadBatchSettleData(); // 데이터가 없으면 새로 로드
        return;
    }

    renderBatchSettleTable();
    alert('현재 데이터 기준 지능형 재계산이 완료되었습니다.');
}
