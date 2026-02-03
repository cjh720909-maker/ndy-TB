const { PrismaClient } = require('../prisma/generated/neon');
const neon = new PrismaClient();

async function check() {
    try {
        const driverCount = await neon.driver.count();
        const feeCount = await neon.feeMaster.count();
        const historyCount = await neon.settlementHistory.count();
        const affCount = await neon.affiliation.count();

        console.log('--- Neon DB 데이터 현황 ---');
        console.log(`용차 기사 (Driver): ${driverCount}건`);
        count_drivers = await neon.driver.findMany({ take: 5 });
        console.log('샘플 데이터:', JSON.stringify(count_drivers, null, 2));

        console.log(`단가 마스터 (FeeMaster): ${feeCount}건`);
        count_fees = await neon.feeMaster.findMany({ take: 5 });
        console.log('샘플 데이터:', JSON.stringify(count_fees, null, 2));

        console.log(`정산 내역 (SettlementHistory): ${historyCount}건`);
        console.log(`소속 마스터 (Affiliation): ${affCount}건`);
        console.log('---------------------------');
    } catch (e) {
        console.error('DB 점검 중 오류 발생:', e);
    } finally {
        await neon.$disconnect();
    }
}

check();
