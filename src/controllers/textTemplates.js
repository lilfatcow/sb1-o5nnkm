const textTemplatesService = require('../services/textTemplates');

const getTextTemplates = async (req, res) => {
  try {
    const { type, document_type, is_default } = req.query;
    const templates = await textTemplatesService.getTextTemplates({
      type,
      document_type,
      is_default
    });
    res.json(templates);
  } catch (error) {
    console.error('Error getting text templates:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve text templates',
        details: error.message
      }
    });
  }
};

const createTextTemplate = async (req, res) => {
  try {
    const { document_type, name, template, type } = req.body;

    if (!document_type || !name || !template || !type) {
      return res.status(400).json({
        error: {
          message: 'Missing required fields'
        }
      });
    }

    const newTemplate = await textTemplatesService.createTextTemplate({
      document_type,
      name,
      template,
      type
    });

    res.json(newTemplate);
  } catch (error) {
    console.error('Error creating text template:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to create text template',
        details: error.message
      }
    });
  }
};

const getTextTemplateById = async (req, res) => {
  try {
    const { templateId } = req.params;
    const template = await textTemplatesService.getTextTemplateById(templateId);
    res.json(template);
  } catch (error) {
    console.error('Error getting text template:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve text template',
        details: error.message
      }
    });
  }
};

const deleteTextTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;
    await textTemplatesService.deleteTextTemplate(templateId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting text template:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to delete text template',
        details: error.message
      }
    });
  }
};

const updateTextTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;
    const { name, template } = req.body;

    const updatedTemplate = await textTemplatesService.updateTextTemplate(templateId, {
      name,
      template
    });

    res.json(updatedTemplate);
  } catch (error) {
    console.error('Error updating text template:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to update text template',
        details: error.message
      }
    });
  }
};

const makeTextTemplateDefault = async (req, res) => {
  try {
    const { templateId } = req.params;
    const template = await textTemplatesService.makeTextTemplateDefault(templateId);
    res.json(template);
  } catch (error) {
    console.error('Error making text template default:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to make text template default',
        details: error.message
      }
    });
  }
};

module.exports = {
  getTextTemplates,
  createTextTemplate,
  getTextTemplateById,
  deleteTextTemplate,
  updateTextTemplate,
  makeTextTemplateDefault
};