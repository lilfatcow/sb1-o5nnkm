const express = require('express');
const router = express.Router();

// Get accounting records
router.get('/', async (req, res, next) => {
  try {
    res.json({ message: 'Get accounting records' });
  } catch (error) {
    next(error);
  }
});

// Create accounting record
router.post('/', async (req, res, next) => {
  try {
    res.json({ message: 'Create accounting record' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;