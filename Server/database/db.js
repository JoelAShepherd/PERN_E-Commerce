const Pool = require('pg').Pool;
const pgPass = require('./dbPass')

const password = pgPass.password

const pool = new Pool({
    user: 'postgres',
    password: password,
    host: 'localhost',
    port: 5432,
    database: 'pern_ecomm'
})

module.exports = pool;