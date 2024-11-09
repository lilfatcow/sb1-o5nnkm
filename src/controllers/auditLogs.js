const auditLogsService = require('../services/auditLogs');

const getAuditLogs = async (req, res) => {
  try {
    const {
      pagination_token,
      entity_user_id,
      path__contains,
      type,
      method,
      status_code,
      timestamp__gt,
      timestamp__lt,
      timestamp__gte,
      timestamp__lte,
      page_size,
      page_num
    } = req.query;

    const logs = await auditLogsService.getAuditLogs({
      pagination_token,
      entity_user_id,
      path__contains,
      type,
      method,
      status_code,
      timestamp__gt,
      timestamp__lt,
      timestamp__gte,
      timestamp__lte,
      page_size,
      page_num
    });

    res.json(logs);
  } catch (error) {
    console.error('Error getting audit logs:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve audit logs',
        details: error.message
      }
    });
  }
};

const getAuditLogById = async (req, res) => {
  try {
    const { logId } = req.params;
    const log = await auditLogsService.getAuditLogById(logId);
    res.json(log);
  } catch (error) {
    console.error('Error getting audit log:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve audit log',
        details: error.message
      }
    });
  }
};

module.exports = {
  getAuditLogs,
  getAuditLogById
};