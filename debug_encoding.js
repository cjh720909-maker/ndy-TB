const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function debug() {
    const query = `
        SELECT 
            b.B_C_NAME, 
            b.CB_DRIVER,
            c.CA_NAME,
            c.CA_GUN
        FROM t_balju b
        LEFT JOIN t_car c ON b.CB_DRIVER = c.CB_DRIVER
        WHERE b.B_DATE = '2026-02-01'
        AND b.CB_DRIVER IS NOT NULL AND b.CB_DRIVER <> ''
        LIMIT 5
    `;
    const result = await prisma.$queryRawUnsafe(query);
    console.log('Raw DB Result (first 5):');
    result.forEach((row, i) => {
        console.log(`Row ${i}:`, {
            B_C_NAME: row.B_C_NAME.toString('hex'),
            CB_DRIVER: row.CB_DRIVER ? row.CB_DRIVER.toString('hex') : null,
            CA_NAME: row.CA_NAME ? row.CA_NAME.toString('hex') : null,
            CA_GUN: row.CA_GUN ? row.CA_GUN.toString('hex') : null
        });
    });
    await prisma.$disconnect();
}
debug();
