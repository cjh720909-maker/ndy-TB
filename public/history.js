/**
 * 정산 이력 전문 관리 로직 (History Management)
 */

/**
 * 날짜 객체를 YYYY-MM-DD 형식의 로컬 문자열로 변환
 */
function formatDateToLocal(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * 당월(이번 달 1일 ~ 오늘) 자동 세팅
 */
function setCurrentMonth() {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

    document.getElementById('startDate').value = formatDateToLocal(firstDay);
    document.getElementById('endDate').value = formatDateToLocal(today);

    if (typeof fetchData === 'function') fetchData();
}

/**
 * 전월(지난 달 1일 ~ 말일) 자동 세팅
 */
function setLastMonth() {
    const today = new Date();
    const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    document.getElementById('startDate').value = formatDateToLocal(firstDayLastMonth);
    document.getElementById('endDate').value = formatDateToLocal(lastDayLastMonth);

    if (typeof fetchData === 'function') fetchData();
}

/**
 * 정산 이력 데이터 로드 및 집계
 */
async function fetchPickingData() {
    const sDate = document.getElementById('startDate').value;
    const eDate = document.getElementById('endDate').value;
    if (!validateDateRange(sDate, eDate)) return;
    const driverVal = document.getElementById('driverInput').value;

    const tbody = document.getElementById('picking-tableBody');
    if (!sDate || !eDate) return alert("날짜를 선택해주세요.");

    tbody.innerHTML = '<tr><td colspan="11" class="p-12 text-center"><div class="animate-spin inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mb-2"></div><div class="text-indigo-600 font-bold tracking-widest">정산 장부 열람 중...</div></td></tr>';

    try {
        // [중요] 필터 속도 향상을 위해 쿼리 파라미터 전달 (필요시 백엔드 보강 예정)
        const url = `/api/settlement-history?startDate=${sDate}&endDate=${eDate}&name=${encodeURIComponent(driverVal)}`;
        const res = await fetch(url);
        const json = await res.json();

        if (json.error) throw new Error(json.error);

        // 프론트엔드 추가 필터링 (안전장치)
        const filtered = json.data.filter(row => {
            if (sDate && row.date < sDate) return false;
            if (eDate && row.date > eDate) return false;
            if (driverVal && !(row.name || '').includes(driverVal)) return false;
            return true;
        });

        renderHistoryList(filtered);
        calculateHistorySummary(filtered);

    } catch (e) {
        console.error(e);
        tbody.innerHTML = `<tr><td colspan="11" class="p-8 text-center text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</td></tr>`;
    }
}

/**
 * 이력 리스트 렌더링
 */
function renderHistoryList(data) {
    const tbody = document.getElementById('picking-tableBody');

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11" class="p-12 text-center text-slate-400 font-medium">조회된 정산 내역이 없습니다.</td></tr>';
        return;
    }

    tbody.innerHTML = data.map((row, i) => `
        <tr class="hover:bg-slate-50 border-b border-slate-100 last:border-0 flex px-6 items-center text-[10px] py-1 transition-colors">
            <td class="w-[40px] shrink-0 text-center text-slate-400 font-mono">${i + 1}</td>
            <td class="w-[90px] shrink-0 text-slate-700 font-bold text-center">${row.date || '-'}</td>
            <td class="w-[100px] shrink-0 font-black text-slate-900 border-l border-slate-100 pl-3">${row.name || '-'}</td>
            <td class="w-[100px] shrink-0 text-slate-600 truncate px-2">${row.so || '-'}</td>
            <td class="w-[130px] shrink-0 text-slate-600 truncate px-2">${row.nap || '-'}</td>
            <td class="w-[70px] shrink-0 text-center bg-slate-50 rounded py-0.5 mx-1 font-bold text-slate-500">${row.ton || '-'}</td>
            <td class="w-[90px] shrink-0 text-right font-black text-blue-600 px-3 bg-blue-50/30 h-full flex items-center justify-end">${formatNumber(row.kum)}</td>
            <td class="w-[90px] shrink-0 text-right font-black text-indigo-600 px-3 bg-indigo-50/30 h-full flex items-center justify-end">${formatNumber(row.un)}</td>
            <td class="flex-grow px-4 truncate text-slate-400 italic">${row.memo || ''}</td>
            <td class="w-[100px] shrink-0 flex items-center justify-center gap-3">
                <button onclick='openHistoryEditModal(${JSON.stringify(row).replace(/'/g, "&#39;")})' class="text-indigo-600 hover:text-indigo-800 transition-colors font-bold">
                    <i class="fas fa-edit mr-1"></i>수정
                </button>
                <button onclick="deleteHistoryItem(${row.idx})" class="text-rose-400 hover:text-rose-600 transition-colors">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

/**
 * 하단 합계 실시간 계산
 */
function calculateHistorySummary(data) {
    const totalCount = data.length;
    const totalKum = data.reduce((sum, row) => sum + (parseInt(row.kum) || 0), 0);
    const totalUn = data.reduce((sum, row) => sum + (parseInt(row.un) || 0), 0);

    const countEl = document.getElementById('hist-total-count');
    const kumEl = document.getElementById('hist-total-kum');
    const unEl = document.getElementById('hist-total-un');

    if (countEl) countEl.innerText = totalCount.toLocaleString() + '건';
    if (kumEl) kumEl.innerText = totalKum.toLocaleString() + '원';
    if (unEl) unEl.innerText = totalUn.toLocaleString() + '원';
}

/**
 * 이력 수정 모달 열기
 */
function openHistoryEditModal(row) {
    document.getElementById('edit-hist-idx').value = row.idx;
    document.getElementById('edit-hist-date').value = row.date;
    document.getElementById('edit-hist-name').value = row.name;
    document.getElementById('edit-hist-so').value = row.so || '';
    document.getElementById('edit-hist-nap').value = row.nap || '';
    document.getElementById('edit-hist-ton').value = row.ton || 0;
    document.getElementById('edit-hist-kum').value = row.kum || 0;
    document.getElementById('edit-hist-un').value = row.un || 0;
    document.getElementById('edit-hist-memo').value = row.memo || '';

    document.getElementById('history-edit-modal').classList.remove('hidden');
    document.getElementById('history-edit-modal').classList.add('flex');
}

/**
 * 모달 닫기
 */
function closeHistoryEditModal() {
    document.getElementById('history-edit-modal').classList.add('hidden');
    document.getElementById('history-edit-modal').classList.remove('flex');
}

/**
 * 수정사항 저장
 */
async function saveHistoryEdit() {
    const data = {
        idx: parseInt(document.getElementById('edit-hist-idx').value),
        date: document.getElementById('edit-hist-date').value,
        name: document.getElementById('edit-hist-name').value,
        so: document.getElementById('edit-hist-so').value,
        nap: document.getElementById('edit-hist-nap').value,
        ton: parseFloat(document.getElementById('edit-hist-ton').value) || 0,
        kum: parseInt(document.getElementById('edit-hist-kum').value) || 0,
        un: parseInt(document.getElementById('edit-hist-un').value) || 0,
        memo: document.getElementById('edit-hist-memo').value
    };

    try {
        const res = await fetch('/api/save-settlement', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) {
            alert("정정되었습니다.");
            closeHistoryEditModal();
            fetchPickingData();
        } else {
            alert("저장 실패: " + result.message);
        }
    } catch (e) {
        console.error(e);
        alert("통신 오류 발생");
    }
}

/**
 * 이력 개별 삭제
 */
async function deleteHistoryItem(idx) {
    if (!confirm("정말 이 정산 내역을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.")) return;

    try {
        const res = await fetch(`/api/settlement-history?idx=${idx}`, { method: 'DELETE' });
        const result = await res.json();
        if (result.success) {
            fetchPickingData();
        } else {
            alert("삭제 실패: " + result.error);
        }
    } catch (e) {
        console.error(e);
        alert("통신 오류가 발생했습니다.");
    }
}
