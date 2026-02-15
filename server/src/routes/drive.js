const express = require('express')
const { getDrive } = require('../drive')

const router = express.Router()

router.get('/health', async (req, res) => {
  try {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID
    const drive = getDrive()
    if (!drive) return res.status(500).json({ error: 'drive auth not configured' })
    if (!folderId) return res.status(400).json({ error: 'folder id missing' })
    await drive.files.get({ fileId: folderId, fields: 'id' })
    return res.json({ ok: true })
  } catch (e) {
    return res.status(500).json({ error: 'drive error' })
  }
})

module.exports = router
