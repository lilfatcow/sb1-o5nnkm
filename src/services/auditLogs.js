const api = require('../utils/api');

class AuditLogsService {
  async getAuditLogs(params = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value);
      }
    });

    const response = await api.get(`/audit_logs?${queryParams.toString()}`);
    return response.data;
  }

  async getAuditLogById(logId) {
    const response = await api.get(`/audit_logs/${logId}`);
    return response.data;
  }
}

module.exports = new AuditLogsService();