const moniteService = require('../services/monite');

const moniteContext = async (req, res, next) => {
  try {
    const entityId = req.headers['x-monite-entity-id'];
    
    if (!entityId) {
      return res.status(400).json({
        error: {
          message: 'Missing x-monite-entity-id header'
        }
      });
    }

    // Initialize SDK for this request
    const sdk = await moniteService.getSDK(entityId);
    
    // Add SDK instance to request context
    req.monite = sdk;
    req.entityId = entityId;
    
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = moniteContext;