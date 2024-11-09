const express = require('express');
const authService = require('../services/auth');
const moniteAuth = require('../services/moniteAuth');
const logger = require('../utils/logger');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: {
          message: 'Email and password are required',
          code: 'validation_error'
        }
      });
    }

    const { token } = await authService.login(email, password);
    res.json({ token });
  } catch (error) {
    logger.error('Login failed:', error);
    res.status(401).json({
      error: {
        message: 'Authentication failed',
        code: 'auth_failed',
        details: error.message
      }
    });
  }
});

router.post('/token', async (req, res) => {
  try {
    // Get Monite token
    const moniteToken = await moniteAuth.getToken();

    // Create JWT with Monite token
    const token = jwt.sign(
      { moniteToken },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    logger.error('Token generation failed:', error);
    res.status(401).json({
      error: {
        message: 'Failed to generate token',
        code: 'auth_failed',
        details: error.message
      }
    });
  }
});

module.exports = router;