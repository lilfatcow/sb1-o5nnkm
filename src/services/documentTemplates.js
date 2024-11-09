const api = require('../utils/api');

class DocumentTemplatesService {
  async getDocumentTemplates() {
    const response = await api.get('/document_templates');
    return response.data;
  }

  async getSystemTemplates() {
    const response = await api.get('/document_templates/system');
    return response.data;
  }

  async getTemplateById(templateId) {
    const response = await api.get(`/document_templates/${templateId}`);
    return response.data;
  }

  async makeTemplateDefault(templateId) {
    const response = await api.post(`/document_templates/${templateId}/make_default`);
    return response.data;
  }

  async previewTemplate(templateId) {
    const response = await api.get(`/document_templates/${templateId}/preview`);
    return response.data;
  }
}

module.exports = new DocumentTemplatesService();