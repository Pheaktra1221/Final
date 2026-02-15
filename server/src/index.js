const path = require('path')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config({ path: path.resolve(__dirname, '../..', '.env') })

const app = express()


app.use(cors()) // This allows all origins

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
app.use('/api/db', require('./routes/db'))

const port = Number(process.env.PORT || 3001)
app.listen(port, () => {
  process.stdout.write(`Server listening on port ${port}\n`)
})