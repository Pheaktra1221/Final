const path = require('path')
const fs = require('fs')
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

const corsOriginEnv = process.env.CORS_ORIGIN
if (corsOriginEnv === '*') {
  app.use(cors())
} else {
  const origins = parseOrigins(corsOriginEnv)
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
}
app.use(bodyParser.json())

;(function () {
  const p = process.env.GOOGLE_DRIVE_KEY_FILE
  if (p) {
    const abs = path.resolve(process.cwd(), p)
    if (!fs.existsSync(abs)) {
      process.stderr.write(`Missing Google Drive key file at ${abs}\n`)
    }
  }
})()

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/user', require('./routes/user'))
app.use('/api/drive', require('./routes/drive'))

const port = Number(process.env.PORT || 3001)
app.listen(port, () => {
  process.stdout.write(`Server listening on port ${port}\n`)
})
