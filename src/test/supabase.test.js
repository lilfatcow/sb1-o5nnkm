const supabase = require('../config/supabase');

async function testSupabase() {
  try {
    console.log('Testing Supabase connection...');

    // Test database connection
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);

    if (error && error.code !== 'PGRST116') { // PGRST116 means empty result
      throw error;
    }

    console.log('Database connection successful');

    // Test authentication with test user
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'testtesttest'
    });

    if (authError) {
      throw authError;
    }

    console.log('Authentication successful');
    console.log('User:', authData.user.email);
    console.log('Session established');

    // Test profile access
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', authData.user.id)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      throw profileError;
    }

    console.log('Profile access successful');
    console.log('All Supabase tests completed successfully');

  } catch (error) {
    console.error('Supabase test failed:', error);
    process.exit(1);
  }
}

testSupabase();