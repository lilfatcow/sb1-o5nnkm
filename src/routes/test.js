const express = require('express');
const router = express.Router();

// Health check endpoint (no auth required)
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Test Supabase auth
router.get('/auth', async (req, res) => {
  try {
    // Get user info from Supabase auth
    const user = req.user;
    
    res.json({
      status: 'success',
      message: 'Supabase authentication successful',
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Auth test error:', error);
    res.status(500).json({
      error: {
        message: 'Auth test failed',
        details: error.message
      }
    });
  }
});

// Test Monite auth
router.get('/monite', async (req, res) => {
  try {
    res.json({
      status: 'success',
      message: 'Monite authentication successful',
      monite: {
        entityId: process.env.MONITE_ENTITY_ID,
        token: req.headers.authorization
      }
    });
  } catch (error) {
    console.error('Monite test error:', error);
    res.status(500).json({
      error: {
        message: 'Monite test failed',
        details: error.message
      }
    });
  }
});

// Test both auth systems
router.get('/', async (req, res) => {
  try {
    const user = req.user;
    
    res.json({
      status: 'success',
      message: 'All authentication successful',
      user: {
        id: user.id,
        email: user.email
      },
      monite: {
        entityId: process.env.MONITE_ENTITY_ID
      }
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    res.status(500).json({
      error: {
        message: 'Test endpoint failed',
        details: error.message
      }
    });
  }
});

module.exports = router;