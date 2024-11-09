const supabase = require('../config/supabase');
const db = require('../db/supabase');

class UserService {
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  async createUser(userData) {
    return db.createUser(userData);
  }

  async getUserById(userId) {
    return db.getUserById(userId);
  }

  async getUserSettings(userId) {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  }

  async updateUserSettings(userId, key, value) {
    const { data, error } = await supabase
      .from('settings')
      .upsert({
        user_id: userId,
        key,
        value
      })
      .single();

    if (error) throw error;
    return data;
  }
}

module.exports = new UserService();