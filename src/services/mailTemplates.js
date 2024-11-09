const api = require('../utils/api');

class MailTemplatesService {
  async getMailTemplates(params = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value);
      }
    });

    const response = await api.get(`/mail_templates?${queryParams.toString()}`);
    return response.data;
  }

  async createMailTemplate(data) {
    const response = await api.post('/mail_templates', data);
    return response.data;
  }

  async previewMailTemplate(data) {
    const response = await api.post('/mail_templates/preview', data);
    return response.data;
  }

  async getSystemTemplates() {
    const response = await api.get('/mail_templates/system');
    return response.data;
  }

  async getMailTemplateById(templateId) {
    const response = await api.get(`/mail_templates/${templateId}`);
    return response.data;
  }

  async deleteMailTemplate(templateId) {
    await api.delete(`/mail_templates/${templateId}`);
  }

  async updateMailTemplate(templateId, data) {
    const response = await api.patch(`/mail_templates/${templateId}`, data);
    return response.data;
  }

  async makeMailTemplateDefault(templateId) {
    const response = await api.post(`/mail_templates/${templateId}/make_default`);
    return response.data;
  }
}

module.exports = new MailTemplatesService();