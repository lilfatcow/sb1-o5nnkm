const axios = require('axios');
const supabase = require('../config/supabase');

const BASE_URL = 'http://localhost:3000';

async function testEndpoints() {
  try {
    // Test health endpoint
    const healthResponse = await axios.get(`${BASE_URL}/test/health`);
    console.log('Health check:', healthResponse.data);

    // Test Supabase auth
    const { data: { user }, error } = await supabase.auth.getUser();
    console.log('Supabase auth:', user || error);

    // Test Monite auth
    const moniteResponse = await axios.get(`${BASE_URL}/test/monite`);
    console.log('Monite auth:', moniteResponse.data);

    // Test combined auth
    const combinedResponse = await axios.get(`${BASE_URL}/test`);
    console.log('Combined auth:', combinedResponse.data);

  } catch (error) {
    console.error('Test failed:', error.message);
    process.exit(1);
  }
}

testEndpoints();