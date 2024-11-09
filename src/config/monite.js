const axios = require('axios');

const moniteConfig = {
  clientId: process.env.MONITE_CLIENT_ID,
  clientSecret: process.env.MONITE_CLIENT_SECRET,
  baseURL: process.env.MONITE_API_URL || 'https://api.sandbox.monite.com/v1'
};

if (!moniteConfig.clientId || !moniteConfig.clientSecret) {
  throw new Error('Missing Monite credentials');
}

const moniteApi = axios.create({
  baseURL: moniteConfig.baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

module.exports = {
  moniteConfig,
  moniteApi
};