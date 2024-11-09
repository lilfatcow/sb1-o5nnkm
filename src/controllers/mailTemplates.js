const mailTemplatesService = require('../services/mailTemplates');

const getMailTemplates = async (req, res) => {
  try {
    const {
      order,
      limit,
      pagination_token,
      sort,
      type,
      type__in,
      type__not_in,
      is_default,
      name,
      name__iexact,
      name__contains,
      name__icontains
    } = req.query;

    const templates = await mailTemplatesService.getMailTemplates({
      order,
      limit,
      pagination_token,
      sort,
      type,
      type__in,
      type__not_in,
      is_default,
      name,
      name__iexact,
      name__contains,
      name__icontains
    });

    res.json(templates);
  } catch (error) {
    console.error('Error getting mail templates:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve mail templates',
        details: error.message
      }
    });
  }
};

const createMailTemplate = async (req, res) => {
  try {
    const { body_template, name, subject_template, type, is_default, language } = req.body;

    if (!body_template || !name || !subject_template || !type) {
      return res.status(400).json({
        error: {
          message: 'Missing required fields'
        }
      });
    }

    const template = await mailTemplatesService.createMailTemplate({
      body_template,
      name,
      subject_template,
      type,
      is_default,
      language
    });

    res.json(template);
  } catch (error) {
    console.error('Error creating mail template:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to create mail template',
        details: error.message
      }
    });
  }
};

const previewMailTemplate = async (req, res) => {
  try {
    const { body, document_type, language_code, subject } = req.body;

    if (!body || !document_type || !language_code || !subject) {
      return res.status(400).json({
        error: {
          message: 'Missing required fields'
        }
      });
    }

    const preview = await mailTemplatesService.previewMailTemplate({
      body,
      document_type,
      language_code,
      subject
    });

    res.json(preview);
  } catch (error) {
    console.error('Error previewing mail template:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to preview mail template',
        details: error.message
      }
    });
  }
};

const getSystemTemplates = async (req, res) => {
  try {
    const templates = await mailTemplatesService.getSystemTemplates();
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

const getMailTemplateById = async (req, res) => {
  try {
    const { templateId } = req.params;
    const template = await mailTemplatesService.getMailTemplateById(templateId);
    res.json(template);
  } catch (error) {
    console.error('Error getting mail template:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve mail template',
        details: error.message
      }
    });
  }
};

const deleteMailTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;
    await mailTemplatesService.deleteMailTemplate(templateId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting mail template:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to delete mail template',
        details: error.message
      }
    });
  }
};

const updateMailTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;
    const { body_template, language, name, subject_template } = req.body;

    const template = await mailTemplatesService.updateMailTemplate(templateId, {
      body_template,
      language,
      name,
      subject_template
    });

    res.json(template);
  } catch (error) {
    console.error('Error updating mail template:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to update mail template',
        details: error.message
      }
    });
  }
};

const makeMailTemplateDefault = async (req, res) => {
  try {
    const { templateId } = req.params;
    const template = await mailTemplatesService.makeMailTemplateDefault(templateId);
    res.json(template);
  } catch (error) {
    console.error('Error making mail template default:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to make mail template default',
        details: error.message
      }
    });
  }
};

module.exports = {
  getMailTemplates,
  createMailTemplate,
  previewMailTemplate,
  getSystemTemplates,
  getMailTemplateById,
  deleteMailTemplate,
  updateMailTemplate,
  makeMailTemplateDefault
};