const logger = require('../utils/logger');

// Error codes mapping
const ERROR_CODES = {
  AUTHENTICATION_FAILED: 'auth_failed',
  INVALID_REQUEST: 'invalid_request',
  NOT_FOUND: 'not_found',
  PERMISSION_DENIED: 'permission_denied',
  VALIDATION_ERROR: 'validation_error',
  RATE_LIMIT_EXCEEDED: 'rate_limit_exceeded',
  INTERNAL_ERROR: 'internal_error'
};

// Map Monite error codes to our API error codes
const mapMoniteError = (error) => {
  const moniteError = error.response?.data?.error;
  
  if (!moniteError) return {
    code: ERROR_CODES.INTERNAL_ERROR,
    message: error.message
  };

  switch (moniteError.type) {
    case 'authentication_error':
      return {
        code: ERROR_CODES.AUTHENTICATION_FAILED,
        message: 'Authentication failed',
        details: moniteError.message
      };
    case 'invalid_request_error':
      return {
        code: ERROR_CODES.INVALID_REQUEST,
        message: 'Invalid request',
        details: moniteError.message
      };
    case 'validation_error':
      return {
        code: ERROR_CODES.VALIDATION_ERROR,
        message: 'Validation failed',
        details: moniteError.details
      };
    default:
      return {
        code: ERROR_CODES.INTERNAL_ERROR,
        message: moniteError.message || 'An unexpected error occurred'
      };
  }
};

const errorTransformer = (err, req, res, next) => {
  // Log error with request context
  logger.error('Error occurred', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    requestId: req.id
  });

  // Transform Monite API errors
  if (err.response?.data?.error) {
    const transformedError = mapMoniteError(err);
    return res.status(err.response.status).json({
      error: transformedError
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: {
        code: ERROR_CODES.VALIDATION_ERROR,
        message: 'Validation failed',
        details: err.details
      }
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: {
        code: ERROR_CODES.AUTHENTICATION_FAILED,
        message: 'Invalid token',
        details: err.message
      }
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    error: {
      code: ERROR_CODES.INTERNAL_ERROR,
      message: err.message || 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }
  });
};

module.exports = {
  errorTransformer,
  ERROR_CODES
};