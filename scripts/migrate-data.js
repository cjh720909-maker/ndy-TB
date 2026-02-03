const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('../prisma/generated/neon');

const neon = new PrismaClient();
const DATA_DIR = path.join(__dirname, '..', 'data');

async function migrate() {
    console.log('--- 데이터 마이그레이션 시작 ---');

    try {
        // 1. Affiliations 이전
        const affsContent = fs.readFileSync(path.join(DATA_DIR, 'affiliations.json'), 'utf8');
        const affs = JSON.parse(affsContent);
        console.log(`소속 데이터(${affs.length}건) 이전 중...`);
        for (const aff of affs) {
            await neon.affiliation.upsert({
                where: { name: aff.name },
                update: {},
                create: { name: aff.name }
            });
        }

        // 2. Drivers 이전
        const driversContent = fs.readFileSync(path.join(DATA_DIR, 'drivers.json'), 'utf8');
        const drivers = JSON.parse(driversContent);
        console.log(`기사 데이터(${drivers.length}건) 이전 중...`);
        for (const d of drivers) {
            await neon.driver.create({
                data: {
                    name: d.name,
                    affiliation: d.affiliation,
                    tonnage: d.tonnage,
                    regDate: d.regDate,
                    address: d.address,
                    memo: d.memo,
                    createdAt: d.created_at ? new Date(d.created_at) : new Date()
                }
            });
        }

        // 3. FeeMaster 이전
        const feesContent = fs.readFileSync(path.join(DATA_DIR, 'fee_master.json'), 'utf8');
        const fees = JSON.parse(feesContent);
        console.log(`단가 데이터(${fees.length}건) 이전 중...`);
        for (const f of fees) {
            await neon.feeMaster.create({
                data: {
                    affiliation: f.affiliation,
                    tonnage: f.tonnage,
                    year: parseInt(f.year),
                    region: f.region,
                    fee: parseInt(f.price),
                    memo: f.memo,
                    isActive: !f.readonly,
                    readonly: f.readonly || false,
                    createdAt: f.created_at ? new Date(f.created_at) : new Date()
                }
            });
        }

        // 4. SettlementHistory 이전
        const historyContent = fs.readFileSync(path.join(DATA_DIR, 'settlement_history.json'), 'utf8');
        const history = JSON.parse(historyContent);
        console.log(`정산 내역(${history.length}건) 이전 중...`);
        for (const h of history) {
            await neon.settlementHistory.create({
                data: {
                    date: h.date,
                    driverName: h.name,
                    affiliation: h.so,
                    tonnage: h.tonnage || '',
                    destCount: parseInt(h.destCount || 0),
                    totalWeight: parseInt(h.totalWeight || 0),
                    fee: parseInt(h.kum || 0),
                    memo: h.memo,
                    isPbox: h.isPbox || false,
                    isReturn: h.isReturn || false,
                    so: h.so,
                    nap: h.nap,
                    ton: h.ton ? parseInt(h.ton) : null,
                    createdAt: h.saved_at ? new Date(h.saved_at) : new Date()
                }
            });
        }

        console.log('--- 데이터 마이그레이션 완료 ---');
    } catch (error) {
        console.error('마이그레이션 중 오류 발생:', error);
    } finally {
        await neon.$disconnect();
    }
}

migrate();
