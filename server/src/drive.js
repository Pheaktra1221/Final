const fs = require('fs')
const path = require('path')
const { google } = require('googleapis')

function getKey() {
  const p = process.env.GOOGLE_DRIVE_KEY_FILE
  if (!p) return null
  const abs = path.resolve(process.cwd(), p)
  if (!fs.existsSync(abs)) return null
  const txt = fs.readFileSync(abs, 'utf-8')
  try {
    return JSON.parse(txt)
  } catch {
    return null
  }
}

function getAuth() {
  const key = getKey()
  if (!key) return null
  const auth = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/drive']
  )
  return auth
}

function getDrive() {
  const auth = getAuth()
  if (!auth) return null
  return google.drive({ version: 'v3', auth })
}

module.exports = { getDrive }
