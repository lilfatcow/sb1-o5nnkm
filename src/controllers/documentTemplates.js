const documentTemplatesService = require('../services/documentTemplates');

const getDocumentTemplates = async (req, res) => {
  try {
    const templates = await documentTemplatesService.getDocumentTemplates();
    res.json(templates);
  } catch (error) {
    console.error('Error getting document templates:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve document templates',
        details: error.message
      }
    });
  }
};

const getSystemTemplates = async (req, res) => {
  try {
    const templates = await documentTemplatesService.getSystemTemplates();
    res.json(templates);
  } catch (error) {
    console.error('Error getting system templates:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve system templates',
        details: error.message
      }
    });
  }
};

const getTemplateById = async (req, res) => {
  try {
    const { templateId } = req.params;
    const template = await documentTemplatesService.getTemplateById(templateId);
    res.json(template);
  } catch (error) {
    console.error('Error getting template:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve template',
        details: error.message
      }
    });
  }
};

const makeTemplateDefault = async (req, res) => {
  try {
    const { templateId } = req.params;
    const template = await documentTemplatesService.makeTemplateDefault(templateId);
    res.json(template);
  } catch (error) {
    console.error('Error making template default:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to make template default',
        details: error.message
      }
    });
  }
};

const previewTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;
    const preview = await documentTemplatesService.previewTemplate(templateId);
    res.json(preview);
  } catch (error) {
    console.error('Error previewing template:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to preview template',
        details: error.message
      }
    });
  }
};

module.exports = {
  getDocumentTemplates,
  getSystemTemplates,
  getTemplateById,
  makeTemplateDefault,
  previewTemplate
};