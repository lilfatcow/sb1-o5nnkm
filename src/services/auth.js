const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('../utils/logger');
const moniteAuth = require('./moniteAuth');

class AuthService {
  async login(email, password) {
    try {
      // In a real app, validate credentials against a database
      // For demo purposes, we'll accept any non-empty email/password
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Get Monite token
      const moniteToken = await moniteAuth.getToken();

      // Create JWT token
      const token = jwt.sign(
        { 
          email,
          id: Math.random().toString(36).substring(7), // Demo user ID
          type: 'user',
          moniteToken
        },
        config.jwtSecret,
        { expiresIn: '1h' }
      );

      return { token };
    } catch (error) {
      logger.error('Login failed:', error);
      throw error;
    }
  }

  async validateToken(token) {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      logger.error('Token validation failed:', error);
      throw error;
    }
  }
}

module.exports = new AuthService();