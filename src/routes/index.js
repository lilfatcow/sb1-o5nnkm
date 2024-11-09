const express = require('express');
const router = express.Router();

// Import route handlers
const authRoutes = require('./auth');
const entitiesRoutes = require('./entities');
const payablesRoutes = require('./payables');
const receivablesRoutes = require('./receivables');
const productsRoutes = require('./products');
const counterpartsRoutes = require('./counterparts');
const filesRoutes = require('./files');

// Import middleware
const authMiddleware = require('../middleware/authMiddleware');
const moniteAuth = require('../middleware/moniteAuth');
const moniteGateway = require('../middleware/moniteGateway');

// Public auth routes (no auth required)
router.use('/auth', authRoutes);

// Health check endpoint (no auth required)
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Protected routes - apply auth middleware
router.use(authMiddleware);
router.use(moniteAuth);
router.use(moniteGateway);

// API routes
router.use('/entities', entitiesRoutes);
router.use('/payables', payablesRoutes);
router.use('/receivables', receivablesRoutes);
router.use('/products', productsRoutes);
router.use('/counterparts', counterpartsRoutes);
router.use('/files', filesRoutes);

module.exports = router;