const XLSX = require('xlsx');
const fs = require('fs');
const workbook = XLSX.readFile('2026년엔디와이 지역별(거리기준) 단가표.xlsx');

const allData = {};
workbook.SheetNames.forEach(name => {
    const worksheet = workbook.Sheets[name];
    allData[name] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
});

fs.writeFileSync('excel_data.json', JSON.stringify(allData, null, 2));
console.log('Saved all data to excel_data.json');
