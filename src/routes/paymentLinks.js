const express = require('express');
const router = express.Router();

// Create payment link
router.post('/', async (req, res, next) => {
  try {
    res.json({ message: 'Create payment link' });
  } catch (error) {
    next(error);
  }
});

// Get payment link
router.get('/:id', async (req, res, next) => {
  try {
    res.json({ message: 'Get payment link' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;