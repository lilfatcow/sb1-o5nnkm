const axios = require('axios');
const authService = require('../services/auth');

async function testAPI() {
  try {
    console.log('Testing API endpoints...');

    // First sign in to get a valid token
    const auth = await authService.signIn('test@example.com', 'testtesttest');
    const token = auth.session.access_token;

    console.log('\nTesting endpoints with valid token...');

    // Setup axios with base URL and auth header
    const api = axios.create({
      baseURL: 'http://localhost:3000',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Test profile endpoints
    console.log('\nTesting profile endpoints...');
    
    // Get profile
    const profileResponse = await api.get('/profile');
    console.log('Get profile:', profileResponse.data);

    // Update profile
    const updateResponse = await api.patch('/profile', {
      first_name: 'John',
      last_name: 'Doe'
    });
    console.log('Update profile:', updateResponse.data);

    // Test audit logs
    console.log('\nTesting audit logs...');
    const auditResponse = await api.get('/audit');
    console.log('Get audit logs:', auditResponse.data);

    console.log('\nAll API tests completed successfully');
  } catch (error) {
    console.error('API test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

testAPI();