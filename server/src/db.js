const mysql = require('mysql2/promise')

function getEnv(name, def) {
  const v = process.env[name]
  return v !== undefined ? v : def
}

const pool = mysql.createPool({
  host: getEnv('DB_HOST', 'localhost'),
  port: Number(getEnv('DB_PORT', '3306')),
  user: getEnv('DB_USER', ''),
  password: getEnv('DB_PASSWORD', ''),
  database: getEnv('DB_NAME', ''),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

module.exports = { pool }

