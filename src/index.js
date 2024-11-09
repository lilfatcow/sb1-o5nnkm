const express = require('express');
const dotenv = require('dotenv');
const config = require('./config');
const routes = require('./routes');
const { setupMiddleware } = require('./middleware');
const logger = require('./utils/logger');

// Load environment variables
dotenv.config();

const app = express();

// Setup basic middleware
setupMiddleware(app);

// Public routes
app.get('/', (req, res) => {
  res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API routes with versioning
app.use(`${config.api.prefix}/v1`, routes);

// Catch-all for unhandled routes
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'not_found',
      message: 'Not Found',
      details: `No route found for ${req.method} ${req.path}`
    }
  });
});

// Start server
const PORT = config.port;
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server running on port ${PORT}`, {
    env: config.env,
    apiVersion: config.api.version
  });
}).on('error', (error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});