const { MoniteSDK } = require('@monite/sdk-api');
const config = require('../config');
const logger = require('../utils/logger');

// Initialize Monite SDK with configuration
const initializeSDK = async (token) => {
  return new MoniteSDK({
    apiUrl: config.monite.apiUrl,
    fetchToken: async () => token
  });
};

// Middleware to handle Monite API requests
const moniteGateway = async (req, res, next) => {
  try {
    // Get Monite token from request (set by moniteAuth middleware)
    const token = req.moniteToken;
    if (!token) {
      throw new Error('No Monite token available');
    }

    // Initialize SDK for this request
    const sdk = await initializeSDK(token);
    
    // Add SDK instance to request context
    req.moniteSDK = sdk;

    // Add entity ID from header
    const entityId = req.headers['x-monite-entity-id'];
    if (entityId) {
      req.entityId = entityId;
    }

    // Log request details
    logger.debug('Monite Gateway Request', {
      path: req.path,
      method: req.method,
      entityId: req.entityId
    });

    next();
  } catch (error) {
    logger.error('Monite Gateway Error', {
      error: error.message,
      path: req.path,
      method: req.method
    });

    res.status(500).json({
      error: {
        message: 'Failed to initialize Monite gateway',
        details: error.message
      }
    });
  }
};

module.exports = moniteGateway;