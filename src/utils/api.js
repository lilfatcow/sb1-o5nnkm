const axios = require('axios');
const { moniteConfig } = require('../config/monite');
const logger = require('./logger');

const api = axios.create({
  baseURL: moniteConfig.baseURL,
  headers: {
    'Content-Type': 'application/json',
    'x-monite-version': '2024-01-31'
  }
});

// Request interceptor
api.interceptors.request.use(async (config) => {
  // Add request ID to headers if available
  if (config.requestId) {
    config.headers['x-request-id'] = config.requestId;
  }

  // Add Monite token if available
  if (config.moniteToken) {
    config.headers['Authorization'] = `Bearer ${config.moniteToken}`;
  }

  // Log request
  logger.debug('API Request', {
    method: config.method?.toUpperCase(),
    url: config.url,
    params: config.params,
    requestId: config.requestId
  });

  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log successful response
    logger.debug('API Response', {
      status: response.status,
      url: response.config.url,
      requestId: response.config.requestId
    });

    return response;
  },
  (error) => {
    // Log error response
    logger.error('API Error', {
      status: error.response?.status,
      url: error.config?.url,
      error: error.response?.data?.error,
      requestId: error.config?.requestId
    });

    // Transform error for consistent format
    if (error.response) {
      const moniteError = error.response.data.error;
      error.status = error.response.status;
      error.error = {
        message: moniteError.message,
        code: moniteError.type,
        details: moniteError.details
      };
    }

    throw error;
  }
);

module.exports = api;