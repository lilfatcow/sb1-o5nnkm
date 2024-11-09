const supabase = require('../config/supabase');

class AuditService {
  async createLog(userId, action, entityType, entityId, details = {}) {
    const { data, error } = await supabase
      .from('audit_logs')
      .insert([{
        user_id: userId,
        action,
        entity_type: entityType,
        entity_id: entityId,
        details
      }])
      .returning('*')
      .single();

    if (error) throw error;
    return data;
  }

  async getLogs(filters = {}) {
    let query = supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters.userId) {
      query = query.eq('user_id', filters.userId);
    }
    if (filters.entityType) {
      query = query.eq('entity_type', filters.entityType);
    }
    if (filters.entityId) {
      query = query.eq('entity_id', filters.entityId);
    }
    if (filters.action) {
      query = query.eq('action', filters.action);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
}

module.exports = new AuditService();