const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: 'postgres',
    password: process.env.pgPass,
    host: 'localhost',
    port: 5432,
    database: 'pern_ecomm'
})

module.exports = pool;