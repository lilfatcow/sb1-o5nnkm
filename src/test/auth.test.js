const authService = require('../services/auth');

async function testAuth() {
  try {
    console.log('Testing authentication...');

    // Test signin with existing user
    console.log('\nTesting signin with test user...');
    const testEmail = 'test@example.com';
    const password = 'testtesttest';
    
    try {
      const signinData = await authService.signIn(testEmail, password);
      console.log('Signin successful:', signinData.user.email);

      // Test session
      const session = await authService.getSession();
      console.log('Session test successful');

      // Test user data
      const user = await authService.getUser();
      console.log('User data retrieved successfully:', user.email);

    } catch (error) {
      console.error('Auth test failed:', error);
      throw error;
    }

    console.log('\nAll authentication tests completed successfully');
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

testAuth();