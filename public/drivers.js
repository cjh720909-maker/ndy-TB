/**
 * 용차 기사 마스터 (Driver Master) 관리 로직
 */

document.addEventListener('DOMContentLoaded', () => {
    // URL 기반 자동 로드
    if (window.location.pathname === '/drivers') {
        fetchDriverMaster();
    }
});

let driverEditIdx = null;

async function fetchDriverMaster() {
    const tbody = document.getElementById('drivers-tableBody');
    if (tbody) {
        tbody.innerHTML = '<tr><td colspan="8" class="p-8 text-center text-slate-400 animate-pulse">기사 정보를 불러오고 있습니다...</td></tr>';
    }
    try {
        const res = await fetch('/api/drivers');
        const { data } = await res.json();
        renderDrivers(data);
    } catch (e) {
        console.error('Drivers Load Error:', e);
        if (tbody) {
            tbody.innerHTML = '<tr><td colspan="8" class="p-8 text-center text-red-500">데이터를 로드하는 중 오류가 발생했습니다.</td></tr>';
        }
    }
}

function renderDrivers(data) {
    const tbody = document.getElementById('drivers-tableBody');
    const summary = document.getElementById('drivers-summaryCards');
    const headerTotal = document.getElementById('driver-total-header');

    // 1. 헤더 옆에 기사 수 표시 (최팀장님 요청 사항)
    if (headerTotal) {
        headerTotal.innerText = `총 ${data ? data.length : 0}명`;
    }

    // 2. 기존 상단 요약 카드는 비움 (이동 처리)
    if (summary) {
        summary.innerHTML = '';
    }

    if (!data || data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="p-8 text-center text-slate-400">등록된 기사 정보가 없습니다. 🧐</td></tr>';
        return;
    }

    tbody.innerHTML = data.map((row, i) => `
        <tr class="hover:bg-slate-50 border-b border-slate-50 last:border-0 flex px-6 items-center text-[10px]">
            <td class="py-0.5 text-center text-slate-400 w-[40px] shrink-0">${i + 1}</td>
            <td class="py-0.5 w-[100px] shrink-0 font-bold text-slate-800">${row.name || '-'}</td>
            <td class="py-0.5 w-[100px] shrink-0 text-indigo-600 font-medium">${row.affiliation || '-'}</td>
            <td class="py-0.5 w-[80px] shrink-0 text-slate-500 text-center">${row.tonnage || '-'}</td>
            <td class="py-0.5 w-[100px] shrink-0 text-slate-500 text-center">${row.regDate || '-'}</td>
            <td class="py-0.5 w-[180px] shrink-0 text-slate-600 truncate">${row.address || '-'}</td>
            <td class="py-0.5 flex-grow px-4 truncate text-slate-500 italic">${row.memo || ''}</td>
            <td class="py-0.5 w-[80px] shrink-0 flex items-center justify-center gap-2">
                <button onclick='editDriver(${JSON.stringify(row)})' class="bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white px-1.5 py-0.5 rounded font-bold text-[9px] transition-colors">수정</button>
                <button onclick="deleteDriver(${row.idx})" class="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-1.5 py-0.5 rounded font-bold text-[9px] transition-colors">삭제</button>
            </td>
        </tr>
    `).join('');
}

// 엔터 키 지원
document.addEventListener('keydown', (e) => {
    const view = document.getElementById('view-drivers');
    if (view && view.classList.contains('active')) {
        if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
            saveDriverMaster();
        }
    }
});

async function saveDriverMaster() {
    const name = document.getElementById('driver-name').value.trim();
    const affiliation = document.getElementById('driver-affiliation').value.trim();
    const tonnage = document.getElementById('driver-tonnage').value;
    const regDate = document.getElementById('driver-regDate').value;
    const address = document.getElementById('driver-address').value.trim();
    const memo = document.getElementById('driver-memo').value.trim();

    if (!name || !affiliation) {
        alert('기사명과 소속은 필수 입력 항목입니다. 📝');
        return;
    }

    const payload = {
        idx: driverEditIdx,
        name,
        affiliation,
        tonnage,
        regDate,
        address,
        memo
    };

    const btn = document.getElementById('btn-driver-save');
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerText = '처리 중...';

    try {
        const res = await fetch('/api/drivers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await res.json();
        if (result.success) {
            alert(driverEditIdx ? '기사 정보가 수정되었습니다. ✅' : '새로운 기사가 등록되었습니다. ✅');
            resetDriverForm();
            fetchDriverMaster();
        } else {
            alert('저장 실패: ' + result.message);
        }
    } catch (e) {
        alert('서버와 통신 중 오류가 발생했습니다.');
    } finally {
        btn.disabled = false;
        btn.innerText = originalText;
    }
}

function editDriver(row) {
    driverEditIdx = row.idx;
    document.getElementById('driver-name').value = row.name;
    document.getElementById('driver-affiliation').value = row.affiliation;
    document.getElementById('driver-tonnage').value = row.tonnage;
    document.getElementById('driver-regDate').value = row.regDate;
    document.getElementById('driver-address').value = row.address;
    document.getElementById('driver-memo').value = row.memo;

    // UI 모드 전환
    document.getElementById('btn-driver-save').innerText = '수정 완료';
    document.getElementById('btn-driver-save').classList.replace('bg-indigo-600', 'bg-amber-500');
    document.getElementById('btn-driver-save').classList.replace('hover:bg-indigo-700', 'hover:bg-amber-600');
    document.getElementById('driver-edit-indicator').classList.remove('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteDriver(idx) {
    if (!confirm('해당 기사 정보를 삭제하시겠습니까?')) return;

    try {
        const res = await fetch(`/api/drivers?idx=${idx}`, { method: 'DELETE' });
        const result = await res.json();
        if (result.success) {
            fetchDriverMaster();
        }
    } catch (e) {
        alert('삭제 중 오류가 발생했습니다.');
    }
}

function resetDriverForm() {
    driverEditIdx = null;
    document.getElementById('driver-name').value = '';
    document.getElementById('driver-affiliation').value = '';
    document.getElementById('driver-tonnage').value = '3.5T';
    document.getElementById('driver-regDate').value = '';
    document.getElementById('driver-address').value = '';
    document.getElementById('driver-memo').value = '';

    // UI 모드 복원
    document.getElementById('btn-driver-save').innerText = '저장';
    document.getElementById('btn-driver-save').classList.replace('bg-amber-500', 'bg-indigo-600');
    document.getElementById('btn-driver-save').classList.replace('hover:bg-amber-600', 'hover:bg-indigo-700');
    document.getElementById('driver-edit-indicator').classList.add('hidden');
}
