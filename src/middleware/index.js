const express = require('express');
const helmet = require('helmet');
const corsMiddleware = require('./cors');
const requestLogger = require('./requestLogger');
const errorHandler = require('./errorHandler');

const setupMiddleware = (app) => {
  // Request ID
  app.use((req, res, next) => {
    req.id = Math.random().toString(36).substring(7);
    res.setHeader('x-request-id', req.id);
    next();
  });

  // Basic middleware (should come before auth)
  app.use(corsMiddleware);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Security headers
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }));
  
  // Logging
  app.use(requestLogger);

  // Error handling - should be last
  app.use(errorHandler);
};

module.exports = { setupMiddleware };