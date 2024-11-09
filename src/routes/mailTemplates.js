const express = require('express');
const { 
  getMailTemplates,
  createMailTemplate,
  previewMailTemplate,
  getSystemTemplates,
  getMailTemplateById,
  deleteMailTemplate,
  updateMailTemplate,
  makeMailTemplateDefault
} = require('../controllers/mailTemplates');

const router = express.Router();

router.get('/', getMailTemplates);
router.post('/', createMailTemplate);
router.post('/preview', previewMailTemplate);
router.get('/system', getSystemTemplates);
router.get('/:templateId', getMailTemplateById);
router.delete('/:templateId', deleteMailTemplate);
router.patch('/:templateId', updateMailTemplate);
router.post('/:templateId/make_default', makeMailTemplateDefault);

module.exports = router;