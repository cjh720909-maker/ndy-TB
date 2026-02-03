const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('2026년엔디와이 지역별(거리기준) 단가표.xlsx');

const feesToAdd = [];

workbook.SheetNames.forEach(sheetName => {
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Tonnage detection from sheet name
    let tonnage = '기타';
    if (sheetName.includes('1톤')) tonnage = '1T';
    else if (sheetName.includes('2.5톤')) tonnage = '2.5T';
    else if (sheetName.includes('3.5톤')) tonnage = '3.5T';
    else if (sheetName.includes('5톤')) tonnage = '5T';

    data.forEach((row, i) => {
        // Data usually starts from Row 8 (index 7) or similar.
        // We look for rows that have a region in Col A and a number in Col C.
        if (i < 7) return;

        const region = row[0];
        const priceNum = row[2]; // Latest rate is in Col C

        if (region && typeof priceNum === 'number') {
            feesToAdd.push({
                affiliation: '이룸', // Defaulting to E-Room as requested previously
                tonnage: tonnage,
                year: 2026,
                region: region.toString().trim().replace(/\r\n/g, ' '),
                price: priceNum * 10000, // Assuming unit is 10,000 KRW
                regDate: '2026-01-01',
                reason: '2026 기초 데이터 자동 등록',
                memo: `Excel Sheet: ${sheetName}`
            });
        }
    });
});

console.log(`Total fees to add: ${feesToAdd.length}`);

// Call the API to save each fee
// We can use fetch or just import storage.js directly if we want to run it via Node.
// But since this is a one-time import, I'll use a script that uses the storage module if available.
// Or just use fetch if the server is running.
// Server is running on port 3011 according to metadata.

async function runImport() {
    for (const fee of feesToAdd) {
        try {
            const res = await fetch('http://localhost:3011/api/fees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fee)
            });
            const result = await res.json();
            console.log(`Added ${fee.region} ${fee.tonnage}: ${result.success}`);
        } catch (e) {
            console.error(`Failed ${fee.region}: ${e.message}`);
        }
    }
}

runImport();
