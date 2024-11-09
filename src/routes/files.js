const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer();

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: {
        message: 'No file provided'
      }
    });
  }
  res.json({ message: 'File uploaded successfully' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get file' });
});

module.exports = router;