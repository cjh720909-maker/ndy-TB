/**
 * Yongcha Cost Management Logic (formerly Picking)
 */

let editingIdx = null;

async function fetchPickingData() {
    const sDate = document.getElementById('startDate').value;
    const eDate = document.getElementById('endDate').value;
    const driverVal = document.getElementById('driverInput').value;

    const tbody = document.getElementById('picking-tableBody');
    if (!sDate || !eDate) return alert("날짜를 선택해주세요.");

    tbody.innerHTML = '<tr><td colspan="10" class="p-8 text-center text-indigo-600 font-bold animate-pulse">데이터 로드 중...</td></tr>';

    try {
        const url = `/api/settlement-history?startDate=${sDate}&endDate=${eDate}&driverName=${encodeURIComponent(driverVal)}`;
        const res = await fetch(url);
        const json = await res.json();

        if (json.error) throw new Error(json.error);

        // 날짜 필터링 (JSON 저장소는 모든 기록을 가지고 있으므로 프론트에서 필터링하거나 API에서 처리 가능)
        // 여기서는 API가 필터링을 지원하지 않는다고 가정하고 프론트에서 보강 (API 수정도 고려 가능)
        const filtered = json.data.filter(row => {
            if (sDate && row.date < sDate) return false;
            if (eDate && row.date > eDate) return false;
            if (driverVal && !row.name.includes(driverVal)) return false;
            return true;
        });

        renderYongchaCosts(filtered);
    } catch (e) {
        console.error(e);
        tbody.innerHTML = `<tr><td colspan="10" class="p-8 text-center text-red-500">오류: ${e.message}</td></tr>`;
    }
}

function renderYongchaCosts(data) {
    const tbody = document.getElementById('picking-tableBody');
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" class="p-8 text-center text-slate-400">등록된 비용 데이터가 없습니다.</td></tr>';
        return;
    }

    tbody.innerHTML = data.map((row, i) => `
        <tr class="hover:bg-slate-50 border-b border-slate-50 last:border-0 flex px-6 items-center text-[10px]">
            <td class="py-0.5 text-center text-slate-400 w-[40px] shrink-0">${i + 1}</td>
            <td class="py-0.5 w-[90px] shrink-0 text-slate-600 text-center">${row.date || '-'}</td>
            <td class="py-0.5 font-bold text-slate-800 w-[100px] shrink-0 truncate">${row.name || '-'}</td>
            <td class="py-0.5 text-slate-600 w-[100px] shrink-0 truncate">${row.so || '-'}</td>
            <td class="py-0.5 text-slate-600 w-[130px] shrink-0 truncate">${row.nap || '-'}</td>
            <td class="py-0.5 text-slate-600 w-[70px] shrink-0 text-center">${row.ton || '-'}</td>
            <td class="py-0.5 text-slate-600 w-[100px] shrink-0 truncate">${row.yo || '-'}</td>
            <td class="py-0.5 text-right w-[90px] shrink-0 font-bold text-blue-600 px-2">${formatNumber(row.kum)}</td>
            <td class="py-0.5 text-right w-[90px] shrink-0 text-indigo-600 px-2">${formatNumber(row.un)}</td>
            <td class="py-0.5 flex-grow px-4 truncate text-slate-500">${row.memo || ''}</td>
            <td class="py-0.5 w-[70px] shrink-0 flex items-center justify-center gap-2">
                <button onclick="editCost(${JSON.stringify(row).replace(/"/g, '&quot;')})" class="text-indigo-600 hover:text-indigo-900 font-bold text-[10px]">수정</button>
                <button onclick="deleteCost(${row.idx})" class="text-red-600 hover:text-red-900 font-bold text-[10px]">삭제</button>
            </td>
        </tr>
    `).join('');
}

async function saveYongchaCost() {
    const data = {
        idx: editingIdx,
        date: document.getElementById('cost-date').value,
        name: document.getElementById('cost-name').value,
        so: document.getElementById('cost-so').value,
        nap: document.getElementById('cost-nap').value,
        ton: document.getElementById('cost-ton').value,
        kum: parseInt(document.getElementById('cost-kum').value) || 0,
        un: parseInt(document.getElementById('cost-un').value) || 0,
        yo: document.getElementById('cost-yo').value,
        chung: document.getElementById('cost-chung').value,
        memo: document.getElementById('cost-memo').value,
    };

    if (!data.date || !data.name) {
        return alert("날짜와 기사명은 필수입니다.");
    }

    try {
        const res = await fetch('/api/yongcha-costs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) {
            alert(result.message);
            resetCostForm();
            fetchPickingData();
        } else {
            alert("저장 실패: " + result.error);
        }
    } catch (e) {
        console.error(e);
        alert("통신 오류가 발생했습니다.");
    }
}

function editCost(row) {
    editingIdx = row.idx;
    document.getElementById('cost-date').value = row.date;
    document.getElementById('cost-name').value = row.name;
    document.getElementById('cost-so').value = row.so;
    document.getElementById('cost-nap').value = row.nap;
    document.getElementById('cost-ton').value = row.ton;
    document.getElementById('cost-kum').value = row.kum;
    document.getElementById('cost-un').value = row.un;
    document.getElementById('cost-yo').value = row.yo;
    document.getElementById('cost-chung').value = row.chung;
    document.getElementById('cost-memo').value = row.memo;

    // 스크롤 상단으로 (입력폼 이동)
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteCost(idx) {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
        const res = await fetch(`/api/settlement-history?idx=${idx}`, { method: 'DELETE' });
        const result = await res.json();
        if (result.success) {
            alert("삭제되었습니다.");
            fetchPickingData();
        }
    } catch (e) {
        console.error(e);
        alert("삭제 중 오류가 발생했습니다.");
    }
}

function resetCostForm() {
    editingIdx = null;
    document.getElementById('cost-date').value = '';
    document.getElementById('cost-name').value = '';
    document.getElementById('cost-so').value = '';
    document.getElementById('cost-nap').value = '';
    document.getElementById('cost-ton').value = '';
    document.getElementById('cost-kum').value = '';
    document.getElementById('cost-un').value = '';
    document.getElementById('cost-yo').value = '';
    document.getElementById('cost-chung').value = '';
    document.getElementById('cost-memo').value = '';
}
