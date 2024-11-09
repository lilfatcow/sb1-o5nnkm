const express = require('express');
const { 
  getDataExports,
  createDataExport,
  getSupportedFormats,
  getDataExportById,
  getExtraData,
  createExtraData,
  getExtraDataById,
  updateExtraData,
  deleteExtraData
} = require('../controllers/dataExports');

const router = express.Router();

// Data exports routes
router.get('/', getDataExports);
router.post('/', createDataExport);
router.get('/supported_formats', getSupportedFormats);
router.get('/:documentExportId', getDataExportById);

// Extra data routes
router.get('/extra_data', getExtraData);
router.post('/extra_data', createExtraData);
router.get('/extra_data/:extraDataId', getExtraDataById);
router.patch('/extra_data/:extraDataId', updateExtraData);
router.delete('/extra_data/:extraDataId', deleteExtraData);

module.exports = router;