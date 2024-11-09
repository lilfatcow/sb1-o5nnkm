const auditService = require('../services/audit');

const auditMiddleware = async (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(body) {
    if (req.user) {
      const logData = {
        userId: req.user.id,
        action: req.method,
        entityType: req.baseUrl.split('/')[1] || 'unknown',
        entityId: req.params.id || 'none',
        details: {
          path: req.path,
          query: req.query,
          statusCode: res.statusCode
        }
      };

      auditService.createLog(
        logData.userId,
        logData.action,
        logData.entityType,
        logData.entityId,
        logData.details
      ).catch(error => {
        console.error('Error creating audit log:', error);
      });
    }

    originalSend.apply(res, arguments);
  };

  next();
};

module.exports = auditMiddleware;