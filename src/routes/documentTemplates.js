const express = require('express');
const { 
  getDocumentTemplates,
  getSystemTemplates,
  getTemplateById,
  makeTemplateDefault,
  previewTemplate
} = require('../controllers/documentTemplates');

const router = express.Router();

router.get('/', getDocumentTemplates);
router.get('/system', getSystemTemplates);
router.get('/:templateId', getTemplateById);
router.post('/:templateId/make_default', makeTemplateDefault);
router.get('/:templateId/preview', previewTemplate);

module.exports = router;