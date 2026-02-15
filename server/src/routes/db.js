const express = require('express')
const { pool } = require('../db')

const router = express.Router()

router.get('/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok')
    const ok = rows && rows[0] && rows[0].ok === 1
    return res.json({ ok })
  } catch (e) {
    process.stderr.write(String(e?.message || e) + '\n')
    return res.status(500).json({ error: 'db error' })
  }
})

module.exports = router
