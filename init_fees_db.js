const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function initDb() {
    try {
        console.log('Checking/Creating t_yongcha_rate table...');

        // 정산 단가 마스터 테이블 생성 (차량번호 + 지역키워드 조합)
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS t_yongcha_rate (
                idx INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                car_no VARCHAR(20) NOT NULL COMMENT '차량번호',
                region VARCHAR(50) NOT NULL COMMENT '지역 키워드',
                base_price INT DEFAULT 0 COMMENT '정산 단가',
                memo VARCHAR(200) DEFAULT '' COMMENT '비고',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_car_region (car_no, region)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;

        await prisma.$executeRawUnsafe(createTableQuery);
        console.log('t_yongcha_rate table is ready.');

    } catch (e) {
        console.error('Error initializing table:', e);
    } finally {
        await prisma.$disconnect();
    }
}

initDb();
