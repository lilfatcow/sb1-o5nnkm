const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  // Generate unique request ID
  req.id = Math.random().toString(36).substring(7);

  // Log request details
  logger.info('Incoming request', {
    requestId: req.id,
    method: req.method,
    path: req.path,
    query: req.query,
    headers: {
      'user-agent': req.get('user-agent'),
      'content-type': req.get('content-type'),
      'accept': req.get('accept')
    }
  });

  // Log response
  const originalSend = res.send;
  res.send = function(body) {
    logger.info('Outgoing response', {
      requestId: req.id,
      statusCode: res.statusCode,
      contentLength: Buffer.byteLength(body),
      responseTime: Date.now() - req._startTime
    });
    originalSend.apply(res, arguments);
  };

  // Start timer
  req._startTime = Date.now();
  next();
};

module.exports = requestLogger;