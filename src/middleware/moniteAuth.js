const moniteAuth = require('../services/moniteAuth');

const moniteAuthMiddleware = async (req, res, next) => {
  try {
    const token = await moniteAuth.getToken();
    req.moniteToken = token;
    next();
  } catch (error) {
    console.error('Monite authentication error:', error);
    res.status(401).json({
      error: {
        message: 'Failed to authenticate with Monite',
        details: error.message
      }
    });
  }
};

module.exports = moniteAuthMiddleware;