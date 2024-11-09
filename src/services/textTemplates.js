const api = require('../utils/api');

class TextTemplatesService {
  async getTextTemplates(params = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value);
      }
    });

    const response = await api.get(`/text_templates?${queryParams.toString()}`);
    return response.data;
  }

  async createTextTemplate(data) {
    const response = await api.post('/text_templates', data);
    return response.data;
  }

  async getTextTemplateById(templateId) {
    const response = await api.get(`/text_templates/${templateId}`);
    return response.data;
  }

  async deleteTextTemplate(templateId) {
    await api.delete(`/text_templates/${templateId}`);
  }

  async updateTextTemplate(templateId, data) {
    const response = await api.patch(`/text_templates/${templateId}`, data);
    return response.data;
  }

  async makeTextTemplateDefault(templateId) {
    const response = await api.post(`/text_templates/${templateId}/make_default`);
    return response.data;
  }
}

module.exports = new TextTemplatesService();