const dotenv = require('dotenv');

dotenv.config();

const config = {
  port: parseInt(process.env.PORT, 10) || 3000,
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET,
  api: {
    prefix: '/api',
    version: 'v1'
  },
  cors: {
    origin: '*', // Allow all origins in development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-monite-version',
      'x-monite-entity-id',
      'x-requested-with'
    ],
    exposedHeaders: ['x-request-id']
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    enabled: process.env.ENABLE_LOGGING !== 'false'
  },
  monite: {
    apiUrl: process.env.MONITE_API_URL || 'https://api.sandbox.monite.com/v1',
    clientId: process.env.MONITE_CLIENT_ID,
    clientSecret: process.env.MONITE_CLIENT_SECRET,
    version: '2024-01-31'
  }
};

// Validate required config
const requiredEnvVars = [
  'JWT_SECRET',
  'MONITE_CLIENT_ID',
  'MONITE_CLIENT_SECRET'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

module.exports = config;