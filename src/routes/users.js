const express = require('express');
const router = express.Router();

router.get('/me', (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email
  });
});

router.patch('/me', (req, res) => {
  res.json({
    message: 'Profile updated successfully'
  });
});

module.exports = router;