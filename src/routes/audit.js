const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

router.get('/', async (req, res) => {
  try {
    const { data: logs, error } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(logs);
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Failed to fetch audit logs',
        details: error.message
      }
    });
  }
});

module.exports = router;