const { moniteApi, moniteConfig } = require('../config/monite');

class MoniteAuth {
  constructor() {
    this.token = null;
    this.tokenExpiry = null;
  }

  async getToken() {
    if (this.token && this.tokenExpiry && new Date() < this.tokenExpiry) {
      return this.token;
    }

    try {
      const response = await moniteApi.post('/auth/token', {
        grant_type: 'client_credentials',
        client_id: moniteConfig.clientId,
        client_secret: moniteConfig.clientSecret
      });

      this.token = response.data.access_token;
      this.tokenExpiry = new Date(Date.now() + response.data.expires_in * 1000);

      return this.token;
    } catch (error) {
      console.error('Error getting Monite token:', error);
      throw new Error('Failed to get authentication token');
    }
  }

  async refreshToken() {
    this.token = null;
    this.tokenExpiry = null;
    return this.getToken();
  }
}

module.exports = new MoniteAuth();