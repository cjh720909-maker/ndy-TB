/**
 * Dispatch Summary Logic
 */

async function fetchDispatchData() {
    const sDate = document.getElementById('startDate').value;
    const eDate = document.getElementById('endDate').value;
    const driverVal = document.getElementById('driverInput').value;
    const custName = ''; // 고객사 필드 제거됨

    const tbody = document.getElementById('dispatch-tableBody');
    const cards = document.getElementById('dispatch-summaryCards');

    if (!sDate || !eDate) return alert("날짜를 선택해주세요.");
    if (!validateDateRange(sDate, eDate)) return;

    // Loading State
    tbody.innerHTML = '<tr><td colspan="12" class="p-12 text-center"><div class="animate-spin inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mb-2"></div><div class="text-indigo-600 font-bold">배차 데이터 분석 중...</div></td></tr>';

    try {
        const url = `/api/summary?startDate=${sDate}&endDate=${eDate}&drivers=${encodeURIComponent(driverVal)}&custName=${encodeURIComponent(custName)}`;
        const res = await fetch(url);
        const json = await res.json();

        if (json.error) {
            alert('배차 데이터 에러: ' + json.error);
            tbody.innerHTML = '<tr><td colspan="12" class="p-8 text-center text-red-500">조회 실패</td></tr>';
            return;
        }

        renderDispatchData(json, tbody, cards);
    } catch (e) {
        console.error(e);
        tbody.innerHTML = '<tr><td colspan="12" class="p-8 text-center text-red-500">서버 통신 오류</td></tr>';
    }
}

// ------------------------------------------------------------------
// 자동 정산 엔진 (Auto Settle Engine)
// ------------------------------------------------------------------
let feeMaster = [];

async function loadFeeMaster() {
    try {
        const res = await fetch('/api/fees');
        const json = await res.json();
        feeMaster = json.data || [];
        console.log(`[AutoSettle] 단가 마스터 ${feeMaster.length}건 로드 완료`);
    } catch (e) {
        console.error('단가 마스터 로드 실패:', e);
    }
}

// 목적지 및 상세 정보를 기반으로 예상 단가 산출
function calculateExpectedPrice(destList, tonnage) {
    if (!feeMaster.length) return { price: 0, reason: '' };

    let matchedFee = null;
    let matchReason = '';

    // 1. 톤수 + 지역 키워드 매칭 (가장 긴 키워드 우선)
    const sortedMaster = [...feeMaster].sort((a, b) => b.region.length - a.region.length);

    // 1순위: 톤수 일치 + 지역 포함
    for (const fee of sortedMaster) {
        if (fee.tonnage === tonnage && destList.includes(fee.region)) {
            matchedFee = fee;
            matchReason = `[${tonnage}] [${fee.region}] 매칭`;
            break;
        }
    }

    // 2순위: 톤수 무관 지역 포함 (톤수가 정확히 안 맞을 때 대비)
    if (!matchedFee) {
        for (const fee of sortedMaster) {
            if (destList.includes(fee.region)) {
                matchedFee = fee;
                matchReason = `[${fee.region}] 매칭 (톤수미일치)`;
                break;
            }
        }
    }

    if (!matchedFee) return { price: 0, reason: '매칭 지역 없음' };

    let finalPrice = matchedFee.basePrice;

    // 2. 특수 할증 규칙 (컬리 등)
    if (destList.includes('컬리')) {
        finalPrice += 10000;
        matchReason += ' + 컬리할증(1만)';
    }

    return { price: finalPrice, reason: matchReason };
}

function renderDispatchData(json, tbody, cards) {
    const { data, summary } = json;

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="12" class="p-8 text-center text-slate-400">해당 기간에 배차 데이터가 없습니다.</td></tr>';
        cards.innerHTML = '';
        return;
    }

    // 1. Cards (Ultra Slim Chips)
    cards.innerHTML = `
        <div class="bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200 flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <span class="text-[11px] font-bold text-slate-400 uppercase">기사</span>
            <span class="text-sm font-bold text-slate-800">${formatNumber(summary.totalDrivers)}</span>
        </div>
        <div class="bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200 flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
            <span class="text-[11px] font-bold text-slate-400 uppercase">배차</span>
            <span class="text-sm font-bold text-slate-800">${formatNumber(summary.totalDispatchNames)}</span>
        </div>
        <div class="bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200 flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <span class="text-[11px] font-bold text-slate-400 uppercase">거래처</span>
            <span class="text-sm font-bold text-slate-800">${formatNumber(summary.totalDestinations)}</span>
        </div>
        <div class="bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200 flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
            <span class="text-[11px] font-bold text-slate-400 uppercase">피킹</span>
            <span class="text-sm font-bold text-slate-800">${formatNumber(summary.totalShipments)}</span>
        </div>
        <div class="bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200 flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
            <span class="text-[11px] font-bold text-slate-400 uppercase">총중량</span>
            <span class="text-sm font-bold text-slate-800">${formatNumber(summary.totalWeight)}<span class="text-[10px] ml-0.5 font-normal">kg</span></span>
        </div>
    `;

    // 2. Table Body (Must match header widths)
    tbody.innerHTML = data.map((row, i) => {
        const autoPrice = calculateExpectedPrice(row.destDetail, row.tonnage);

        return `
        <tr class="hover:bg-slate-50 border-b border-slate-50 last:border-0 flex px-6 items-center">
            <td class="py-0.5 text-center text-slate-400 w-[40px] shrink-0 text-[10px]">${i + 1}</td>
            <td class="py-0.5 text-slate-600 w-[90px] shrink-0 text-[10px] font-medium">${row.date || '-'}</td>
            <td class="py-0.5 font-bold text-slate-800 w-[100px] shrink-0 truncate text-[11px]">${row.driverName || '-'}</td>
            <td class="py-0.5 w-[90px] shrink-0 px-1">
                <input type="text" class="w-full px-1.5 py-0.5 border border-slate-200 rounded text-[10px] focus:outline-none focus:border-indigo-500" value="${row.driverDiv || ''}" placeholder="소속">
            </td>
            <td class="py-0.5 text-right w-[60px] shrink-0 text-[10px]">${formatNumber(row.destCount)}</td>
            <td class="py-0.5 text-right w-[80px] shrink-0 text-indigo-700 font-bold text-[11px]">${formatNumber(row.totalWeight)}</td>
            <td class="py-0.5 w-[180px] shrink-0 px-4">
                <textarea class="w-full px-1.5 py-0.5 border border-slate-200 rounded text-[10px] focus:outline-none focus:border-indigo-500 leading-tight" rows="1" placeholder="상세">${row.destDetail || ''}</textarea>
            </td>
            <td class="py-0.5 w-[50px] shrink-0 text-center">
                <input type="checkbox" class="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500">
            </td>
            <td class="py-0.5 w-[70px] shrink-0 text-center">
                <input type="checkbox" class="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500">
            </td>
            <td class="py-0.5 w-[90px] shrink-0 px-1">
                <input type="number" class="w-full px-1.5 py-0.5 text-right border ${autoPrice.price > 0 ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200'} rounded text-[11px] font-bold text-indigo-700 focus:outline-none focus:border-indigo-500" value="${autoPrice.price || ''}">
            </td>
            <td class="py-0.5 w-[90px] shrink-0 px-1">
                <input type="number" class="w-full px-1.5 py-0.5 text-right border border-slate-200 rounded text-[11px] focus:outline-none focus:border-indigo-500">
            </td>
            <td class="py-0.5 flex-grow px-2">
                <input type="text" class="w-full px-1.5 py-0.5 border border-slate-200 rounded text-[10px] focus:outline-none focus:border-indigo-500" id="memo-${i}" placeholder="비고">
            </td>
            <td class="py-0.5 w-[50px] shrink-0 flex items-center justify-center">
                <button onclick="sendToSettlement(${i}, ${JSON.stringify(row).replace(/"/g, '&quot;')})" class="bg-indigo-600 text-white px-2 py-0.5 rounded text-[9px] font-bold hover:bg-indigo-700 transition-colors">전송</button>
            </td>
        </tr>
        `;
    }).join('');
}

async function sendToSettlement(i, row) {
    const data = {
        date: row.date,
        name: row.driverName,
        so: document.querySelector(`#dispatch-tableBody tr:nth-child(${i + 1}) td:nth-child(4) input`).value,
        nap: row.destCount + '곳', // 납품처 수
        ton: row.totalWeight,
        yo: document.querySelector(`#dispatch-tableBody tr:nth-child(${i + 1}) td:nth-child(7) textarea`).value,
        kum: parseInt(document.querySelector(`#dispatch-tableBody tr:nth-child(${i + 1}) td:nth-child(10) input`).value) || 0,
        un: parseInt(document.querySelector(`#dispatch-tableBody tr:nth-child(${i + 1}) td:nth-child(11) input`).value) || 0,
        memo: document.querySelector(`#memo-${i}`).value,
        isPbox: document.querySelector(`#dispatch-tableBody tr:nth-child(${i + 1}) td:nth-child(8) input`).checked,
        isReturn: document.querySelector(`#dispatch-tableBody tr:nth-child(${i + 1}) td:nth-child(9) input`).checked
    };

    try {
        const res = await fetch('/api/save-settlement', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) {
            alert("정산 화면으로 전송되었습니다.");
            // 선택된 행 표시 (성공 강조)
            document.querySelector(`#dispatch-tableBody tr:nth-child(${i + 1})`).classList.add('bg-green-50');
        } else {
            alert("전송 실패: " + result.message);
        }
    } catch (e) {
        console.error(e);
        alert("전송 중 오류 발생");
    }
}

// 초기 로드 시 단가 마스터 로드
document.addEventListener('DOMContentLoaded', loadFeeMaster);
