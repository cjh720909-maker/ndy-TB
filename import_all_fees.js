const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const FEE_FILE = path.join(__dirname, 'data', 'fee_master.json');

try {
    const workbook = XLSX.readFile('2026년엔디와이 지역별(거리기준) 단가표.xlsx');
    const allFees = [];

    workbook.SheetNames.forEach(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: "A" }); // "A", "B", "C" ...

        // 시트명에서 톤수 추출 (예: "김태호3.5톤" -> "3.5T")
        let tonnage = "기타";
        if (sheetName.includes("3.5")) tonnage = "3.5T";
        else if (sheetName.includes("2.5")) tonnage = "2.5T";
        else if (sheetName.includes("1")) tonnage = "1T";

        data.forEach((row, i) => {
            // 지역명이 포함된 컬럼 찾기 (A컬럼 위주)
            const regionStr = row["A"];
            if (!regionStr || typeof regionStr !== 'string' || regionStr.includes("단가표") || regionStr.includes("차량") || regionStr.includes("컬리")) return;

            // 단가는 B(2024) 또는 C(2025) 컬럼에 있음. 2025년 기준인 C컬럼(또는 __EMPTY_1) 우선
            // header: "A" 옵션 사용 시: A=지역, B=2024, C=2025, D=1톤적용
            const basePriceRaw = row["C"]; // 2025년 기준
            if (!basePriceRaw || isNaN(basePriceRaw)) return;

            const basePrice = Math.round(parseFloat(basePriceRaw) * 10000); // 14.5 -> 145000

            // 콤마로 구분된 지역 처리 (예: "창원, 밀양")
            const regions = regionStr.split(',').map(r => r.trim()).filter(r => r);

            regions.forEach(region => {
                allFees.push({
                    idx: Date.now() + Math.floor(Math.random() * 1000000),
                    carNo: `공통(${tonnage})`,
                    region: region,
                    basePrice: basePrice,
                    tonnage: tonnage,
                    memo: `${sheetName} 단가표 기준`,
                    created_at: new Date()
                });
            });
        });
    });

    if (!fs.existsSync(path.join(__dirname, 'data'))) {
        fs.mkdirSync(path.join(__dirname, 'data'));
    }

    fs.writeFileSync(FEE_FILE, JSON.stringify(allFees, null, 2), 'utf8');
    console.log(`Successfully imported ${allFees.length} fee records from ${workbook.SheetNames.length} sheets.`);

} catch (e) {
    console.error('Error importing excel data:', e);
}
