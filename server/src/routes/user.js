const express = require('express')
const { pool } = require('../db')

const router = express.Router()

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {}
    if (!username || !password) {
      return res.status(400).json({ error: 'username and password required' })
    }
    const [rows] = await pool.query(
      'SELECT ID, Username, Password, Role FROM user WHERE Username = ? LIMIT 1',
      [username]
    )
    if (!rows || rows.length === 0) {
      return res.status(401).json({ error: 'invalid credentials' })
    }
    const user = rows[0]
    const ok = String(password) === String(user.Password)
    if (!ok) {
      return res.status(401).json({ error: 'invalid credentials' })
    }
    await pool.query('UPDATE user SET login_date = NOW() WHERE ID = ?', [user.ID])
    return res.json({
      user: { id: user.ID, username: user.Username, role: user.Role },
    })
  } catch (e) {
    return res.status(500).json({ error: 'server error' })
  }
})

module.exports = router

