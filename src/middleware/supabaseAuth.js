const supabase = require('../utils/supabase');

const supabaseAuth = async (req, res, next) => {
  try {
    // Get session from request header
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        error: {
          message: 'Missing authentication token'
        }
      });
    }

    // Verify session with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({
        error: {
          message: 'Invalid authentication token'
        }
      });
    }

    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Supabase authentication error:', error);
    res.status(401).json({
      error: {
        message: 'Authentication failed',
        details: error.message
      }
    });
  }
};

module.exports = supabaseAuth;