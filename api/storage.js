const { PrismaClient: MySQLClient } = require('@prisma/client');
const { PrismaClient: NeonClient } = require('../prisma/generated/neon');

const mysql = new MySQLClient();
const neon = new NeonClient();

// --- Fee Master Functions ---

async function getFees() {
    try {
        const fees = await neon.feeMaster.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' }
        });
        // Frontend expects 'idx' and other legacy fields
        return fees.map(f => ({
            ...f,
            idx: f.id,
            price: f.fee
        }));
    } catch (e) {
        console.error("Neon getFees error:", e);
        return [];
    }
}

async function saveFee(fee) {
    try {
        if (fee.idx) {
            return await neon.feeMaster.update({
                where: { id: parseInt(fee.idx) },
                data: {
                    affiliation: fee.affiliation,
                    tonnage: fee.tonnage,
                    fee: parseInt(fee.price),
                    isActive: fee.isActive !== undefined ? fee.isActive : true
                }
            });
        } else {
            return await neon.feeMaster.create({
                data: {
                    affiliation: fee.affiliation,
                    tonnage: fee.tonnage,
                    fee: parseInt(fee.price)
                }
            });
        }
    } catch (e) {
        console.error("Neon saveFee error:", e);
        return false;
    }
}

async function deleteFee(idx) {
    try {
        await neon.feeMaster.delete({ where: { id: parseInt(idx) } });
        return true;
    } catch (e) {
        console.error("Neon deleteFee error:", e);
        return false;
    }
}

// --- Settlement History Functions ---

async function getHistory() {
    try {
        const history = await neon.settlementHistory.findMany({
            orderBy: { date: 'desc' }
        });
        return history.map(h => ({
            ...h,
            idx: h.id,
            name: h.driverName
        }));
    } catch (e) {
        console.error("Neon getHistory error:", e);
        return [];
    }
}

async function saveHistory(record) {
    try {
        const data = {
            date: record.date,
            driverName: record.name || record.driverName,
            affiliation: record.affiliation || record.driverDiv,
            tonnage: record.tonnage,
            destCount: parseInt(record.destCount || 0),
            totalWeight: parseInt(record.totalWeight || 0),
            fee: parseInt(record.fee || 0),
            memo: record.memo
        };

        if (record.idx) {
            return await neon.settlementHistory.update({
                where: { id: parseInt(record.idx) },
                data
            });
        } else {
            return await neon.settlementHistory.create({ data });
        }
    } catch (e) {
        console.error("Neon saveHistory error:", e);
        return false;
    }
}

async function deleteHistory(idx) {
    try {
        await neon.settlementHistory.delete({ where: { id: parseInt(idx) } });
        return true;
    } catch (e) {
        console.error("Neon deleteHistory error:", e);
        return false;
    }
}

// --- Driver Master Functions ---

async function getDrivers() {
    try {
        const drivers = await neon.driver.findMany({
            orderBy: { name: 'asc' }
        });
        return drivers.map(d => ({
            ...d,
            idx: d.id
        }));
    } catch (e) {
        console.error("Neon getDrivers error:", e);
        return [];
    }
}

async function saveDriver(driver) {
    try {
        const data = {
            name: driver.name,
            affiliation: driver.affiliation,
            carNo: driver.carNo,
            tonnage: driver.tonnage
        };

        if (driver.idx) {
            return await neon.driver.update({
                where: { id: parseInt(driver.idx) },
                data
            });
        } else {
            return await neon.driver.create({ data });
        }
    } catch (e) {
        console.error("Neon saveDriver error:", e);
        return false;
    }
}

async function deleteDriver(idx) {
    try {
        await neon.driver.delete({ where: { id: parseInt(idx) } });
        return true;
    } catch (e) {
        console.error("Neon deleteDriver error:", e);
        return false;
    }
}

// --- Affiliation Master Functions ---

async function getAffiliations() {
    try {
        const list = await neon.affiliation.findMany({
            orderBy: { name: 'asc' }
        });
        return list.map(a => ({
            ...a,
            idx: a.id
        }));
    } catch (e) {
        console.error("Neon getAffiliations error:", e);
        return [];
    }
}

async function saveAffiliation(aff) {
    try {
        if (aff.idx) {
            return await neon.affiliation.update({
                where: { id: parseInt(aff.idx) },
                data: { name: aff.name }
            });
        } else {
            return await neon.affiliation.create({
                data: { name: aff.name }
            });
        }
    } catch (e) {
        console.error("Neon saveAffiliation error:", e);
        return false;
    }
}

async function deleteAffiliation(idx) {
    try {
        await neon.affiliation.delete({ where: { id: parseInt(idx) } });
        return true;
    } catch (e) {
        console.error("Neon deleteAffiliation error:", e);
        return false;
    }
}

module.exports = {
    getFees,
    saveFee,
    deleteFee,
    getHistory,
    saveHistory,
    deleteHistory,
    getDrivers,
    saveDriver,
    deleteDriver,
    getAffiliations,
    saveAffiliation,
    deleteAffiliation,
    mysql,
    neon
};
