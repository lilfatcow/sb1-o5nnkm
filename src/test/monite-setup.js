const { moniteApi, moniteConfig } = require('../config/monite');

async function setupMonite() {
  try {
    // Get access token
    const response = await moniteApi.post('/auth/token', {
      grant_type: 'client_credentials',
      client_id: moniteConfig.clientId,
      client_secret: moniteConfig.clientSecret
    });

    if (response.data && response.data.access_token) {
      console.log('Monite authentication successful');
      return true;
    }

    throw new Error('Failed to get access token');
  } catch (error) {
    console.error('Monite setup failed:', error.message);
    throw error;
  }
}

module.exports = setupMonite;