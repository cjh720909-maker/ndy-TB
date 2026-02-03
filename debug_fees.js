const fs = require('fs');
const path = require('path');

const FEE_FILE = path.join(__dirname, 'data', 'fee_master.json');

try {
    const fees = JSON.parse(fs.readFileSync(FEE_FILE, 'utf8'));
    console.log('--- 단가표 요약 (최근 10건) ---');
    fees.slice(-10).forEach(f => {
        console.log(`소속: ${f.affiliation}, 지역: ${f.region}, 톤수: ${f.tonnage}, 단가: ${f.price}`);
    });

    console.log('\n--- 소속 목록 ---');
    const affs = [...new Set(fees.map(f => f.affiliation))];
    console.log(affs.join(', '));

    console.log('\n--- 톤수 목록 ---');
    const tons = [...new Set(fees.map(f => f.tonnage))];
    console.log(tons.join(', '));

    console.log('\n--- 지역 목록 (일부) ---');
    const regs = [...new Set(fees.map(f => f.region))];
    console.log(regs.slice(0, 20).join(', '));

} catch (e) {
    console.error('Error:', e);
}
