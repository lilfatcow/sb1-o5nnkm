const supabase = require('../config/supabase');

class EntityService {
  async createEntity(data) {
    const { data: entity, error } = await supabase
      .from('entities')
      .insert([{
        name: data.name,
        type: data.type,
        email: data.email,
        phone: data.phone,
        address: data.address,
        status: 'active',
        created_by: data.userId
      }])
      .select('*')
      .single();

    if (error) {
      console.error('Create entity error:', error);
      throw error;
    }
    return entity;
  }

  async getEntity(id) {
    const { data: entity, error } = await supabase
      .from('entities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Get entity error:', error);
      throw error;
    }
    return entity;
  }

  async updateEntity(id, updates) {
    const { data: entity, error } = await supabase
      .from('entities')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('Update entity error:', error);
      throw error;
    }
    return entity;
  }

  async listEntities() {
    const { data: entities, error } = await supabase
      .from('entities')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('List entities error:', error);
      throw error;
    }
    return entities;
  }
}

module.exports = new EntityService();