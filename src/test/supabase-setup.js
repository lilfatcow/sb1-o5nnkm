const supabase = require('../config/supabase');

async function setupSupabase() {
  try {
    // Test connection by checking if tables exist
    const { data: usersTable, error: usersError } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (usersError && usersError.code !== 'PGRST116') { // PGRST116 means empty result
      throw usersError;
    }

    const { data: profilesTable, error: profilesError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (profilesError && profilesError.code !== 'PGRST116') {
      throw profilesError;
    }

    console.log('Supabase connection and schema verification successful');
    return true;
  } catch (error) {
    if (error.code === '42P01') {
      console.error('Database tables not found. Please run the schema.sql script in your Supabase dashboard.');
    } else {
      console.error('Supabase setup failed:', error.message);
    }
    throw error;
  }
}

module.exports = setupSupabase;