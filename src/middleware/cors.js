const cors = require('cors');

const corsMiddleware = cors({
  origin: true, // Allow all origins in development
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-monite-version',
    'x-monite-entity-id',
    'x-request-id'
  ],
  exposedHeaders: ['x-request-id'],
  credentials: true,
  maxAge: 86400 // 24 hours
});

module.exports = corsMiddleware;