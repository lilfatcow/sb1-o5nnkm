const logger = require('../utils/logger');

// Transform Monite API errors to consistent format
const transformMoniteError = (error) => {
  if (error.response?.data?.error) {
    return {
      message: error.response.data.error.message,
      code: error.response.data.error.type,
      details: error.response.data.error.details
    };
  }
  return {
    message: error.message,
    code: 'internal_error'
  };
};

// Global error handler
const errorHandler = (err, req, res, next) => {
  // Log error with request context
  logger.error('Error occurred', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    requestId: req.id
  });

  // Handle Monite API errors
  if (err.response?.data?.error) {
    const transformedError = transformMoniteError(err);
    return res.status(err.response.status).json({
      error: transformedError
    });
  }

  // Handle JWT auth errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: {
        message: 'Authentication failed',
        code: 'auth_failed',
        details: err.message
      }
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: {
        message: 'Validation failed',
        code: 'validation_error',
        details: err.details
      }
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal server error',
      code: 'internal_error'
    }
  });
};

module.exports = errorHandler;