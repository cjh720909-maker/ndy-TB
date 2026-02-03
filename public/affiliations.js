/**
 * 소속 정보 마스터 (Affiliation Master) 관리 로직
 */

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/affiliations') {
        fetchAffiliationMaster();
    }
});

let affEditIdx = null;

async function fetchAffiliationMaster() {
    const tbody = document.getElementById('affiliations-tableBody');
    try {
        const res = await fetch('/api/affiliations');
        const { data } = await res.json();
        renderAffiliations(data);
    } catch (e) {
        console.error('Affiliations Load Error:', e);
        tbody.innerHTML = '<tr><td colspan="5" class="p-8 text-center text-red-500">데이터를 로드하는 중 오류가 발생했습니다.</td></tr>';
    }
}

function renderAffiliations(data) {
    const tbody = document.getElementById('affiliations-tableBody');
    if (!data || data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="p-8 text-center text-slate-400">등록된 소속 정보가 없습니다.</td></tr>';
        return;
    }

    tbody.innerHTML = data.map((row, i) => `
        <tr class="hover:bg-slate-50 border-b border-slate-50 last:border-0 flex px-6 items-center">
            <td class="py-3 text-center text-slate-400 w-[50px] shrink-0">${i + 1}</td>
            <td class="py-3 w-[200px] shrink-0 font-bold text-slate-800">${row.name || '-'}</td>
            <td class="py-3 w-[150px] shrink-0 text-indigo-600 font-medium">${row.phone || '-'}</td>
            <td class="py-3 flex-grow px-4 truncate text-slate-500">${row.memo || ''}</td>
            <td class="py-3 w-[100px] shrink-0 flex items-center justify-center gap-2">
                <button onclick='editAffiliation(${JSON.stringify(row)})' class="text-indigo-600 hover:text-indigo-900 font-bold text-xs">수정</button>
                <button onclick="deleteAffiliation(${row.idx})" class="text-red-600 hover:text-red-900 font-bold text-xs">삭제</button>
            </td>
        </tr>
    `).join('');
}

async function saveAffiliationMaster() {
    const name = document.getElementById('aff-name').value.trim();
    const phone = document.getElementById('aff-phone').value.trim();
    const memo = document.getElementById('aff-memo').value.trim();

    if (!name) {
        alert('소속명은 필수 입력 항목입니다. 🏢');
        return;
    }

    const payload = { idx: affEditIdx, name, phone, memo };
    const btn = document.getElementById('btn-aff-save');
    btn.disabled = true;

    try {
        const res = await fetch('/api/affiliations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await res.json();
        if (result.success) {
            resetAffForm();
            fetchAffiliationMaster();
        }
    } catch (e) {
        alert('저장 중 오류 발생');
    } finally {
        btn.disabled = false;
    }
}

function editAffiliation(row) {
    affEditIdx = row.idx;
    document.getElementById('aff-name').value = row.name;
    document.getElementById('aff-phone').value = row.phone;
    document.getElementById('aff-memo').value = row.memo;

    document.getElementById('btn-aff-save').innerText = '수정 완료';
    document.getElementById('aff-edit-indicator').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteAffiliation(idx) {
    if (!confirm('소속 정보를 삭제할까요?')) return;
    try {
        const res = await fetch(`/api/affiliations?idx=${idx}`, { method: 'DELETE' });
        const result = await res.json();
        if (result.success) fetchAffiliationMaster();
    } catch (e) {
        alert('삭제 중 오류 발생');
    }
}

function resetAffForm() {
    affEditIdx = null;
    document.getElementById('aff-name').value = '';
    document.getElementById('aff-phone').value = '';
    document.getElementById('aff-memo').value = '';
    document.getElementById('btn-aff-save').innerText = '저장하기';
    document.getElementById('aff-edit-indicator').classList.add('hidden');
}
