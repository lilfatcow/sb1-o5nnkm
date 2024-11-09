const cors = require('cors');
const helmet = require('helmet');

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-monite-version'],
  exposedHeaders: ['x-request-id'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

// Security middleware setup
const securityMiddleware = [
  // CORS
  cors(corsOptions),
  
  // Basic security headers
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", process.env.MONITE_API_URL],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }),
];

module.exports = securityMiddleware;