const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: 'postgres',
    password: process.env.PGPASS,
    host: 'localhost',
    port: process.env.POSTGRES_PORT,
    database: 'pern_ecomm'
})

module.exports = pool;