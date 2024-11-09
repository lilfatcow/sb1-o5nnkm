const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('../utils/logger');

const PUBLIC_PATHS = [
  '/auth/login',
  '/auth/token'
];

const authMiddleware = async (req, res, next) => {
  try {
    // Skip auth for public routes
    if (PUBLIC_PATHS.some(path => req.path.endsWith(path))) {
      return next();
    }

    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        error: {
          message: 'Missing authentication token',
          code: 'auth_failed'
        }
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;

    logger.debug('Auth successful', {
      userId: decoded.id,
      path: req.path
    });

    next();
  } catch (error) {
    logger.error('Authentication error:', {
      error: error.message,
      path: req.path
    });

    res.status(401).json({
      error: {
        message: 'Authentication failed',
        code: 'auth_failed',
        details: error.message
      }
    });
  }
};

module.exports = authMiddleware;