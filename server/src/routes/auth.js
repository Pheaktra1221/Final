const express = require('express')
const bcrypt = require('bcrypt')
const { pool } = require('../db')

const router = express.Router()

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password required' })
    }
    const [rows] = await pool.query(
      'SELECT id, email, password_hash, password FROM users WHERE email = ? LIMIT 1',
      [email]
    )
    if (!rows || rows.length === 0) {
      return res.status(401).json({ error: 'invalid credentials' })
    }
    const user = rows[0]
    let ok = false
    if (user.password_hash) {
      ok = await bcrypt.compare(password, user.password_hash).catch(() => false)
    } else if (user.password) {
      ok = password === user.password
    }
    if (!ok) {
      return res.status(401).json({ error: 'invalid credentials' })
    }
    return res.json({ user: { id: user.id, email: user.email } })
  } catch (e) {
    return res.status(500).json({ error: 'server error' })
  }
})

module.exports = router

