const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config({ path: path.resolve(__dirname, '../..', '.env') })

const app = express()

function parseOrigins(str) {
  if (!str) return []
  return String(str)
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
}

const origins = parseOrigins(process.env.CORS_ORIGIN)
app.use(
  cors({
    origin: function (origin, cb) {
      if (!origin) return cb(null, true)
      if (origins.length === 0) return cb(null, true)
      const ok = origins.includes(origin)
      cb(ok ? null : new Error('Not allowed by CORS'), ok)
    },
    credentials: false,
  })
)
app.use(bodyParser.json())

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/user', require('./routes/user'))

const port = Number(process.env.PORT || 3001)
app.listen(port, () => {
  process.stdout.write(`Server listening on port ${port}\n`)
})
