const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@libsql/client');
const { PrismaLibSQL } = require('@prisma/adapter-libsql');

const libsql = createClient({ url: 'file:./dev.db' });
const adapter = new PrismaLibSQL(libsql);
const client = new PrismaClient({ adapter });

client.user.findMany().then(u => {
    console.log('OK, count:', u.length);
    client.$disconnect();
}).catch(e => {
    console.error('ERR:', e);
    client.$disconnect();
});
