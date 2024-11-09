const express = require('express');
const { 
  getTextTemplates,
  createTextTemplate,
  getTextTemplateById,
  deleteTextTemplate,
  updateTextTemplate,
  makeTextTemplateDefault
} = require('../controllers/textTemplates');

const router = express.Router();

router.get('/', getTextTemplates);
router.post('/', createTextTemplate);
router.get('/:templateId', getTextTemplateById);
router.delete('/:templateId', deleteTextTemplate);
router.patch('/:templateId', updateTextTemplate);
router.post('/:templateId/make_default', makeTextTemplateDefault);

module.exports = router;