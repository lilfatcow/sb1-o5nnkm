const dataExportsService = require('../services/dataExports');

const getDataExports = async (req, res) => {
  try {
    const {
      order,
      limit,
      pagination_token,
      sort,
      created_at__gt,
      created_at__lt,
      created_at__gte,
      created_at__lte,
      created_by_entity_user_id
    } = req.query;

    const exports = await dataExportsService.getDataExports({
      order,
      limit,
      pagination_token,
      sort,
      created_at__gt,
      created_at__lt,
      created_at__gte,
      created_at__lte,
      created_by_entity_user_id
    });

    res.json(exports);
  } catch (error) {
    console.error('Error getting data exports:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve data exports',
        details: error.message
      }
    });
  }
};

const createDataExport = async (req, res) => {
  try {
    const { date_from, date_to, format, objects } = req.body;

    if (!date_from || !date_to || !format || !objects) {
      return res.status(400).json({
        error: {
          message: 'Missing required fields'
        }
      });
    }

    const exportData = await dataExportsService.createDataExport({
      date_from,
      date_to,
      format,
      objects
    });

    res.json(exportData);
  } catch (error) {
    console.error('Error creating data export:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to create data export',
        details: error.message
      }
    });
  }
};

const getSupportedFormats = async (req, res) => {
  try {
    const formats = await dataExportsService.getSupportedFormats();
    res.json(formats);
  } catch (error) {
    console.error('Error getting supported formats:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve supported formats',
        details: error.message
      }
    });
  }
};

const getDataExportById = async (req, res) => {
  try {
    const { documentExportId } = req.params;
    const exportData = await dataExportsService.getDataExportById(documentExportId);
    res.json(exportData);
  } catch (error) {
    console.error('Error getting data export:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve data export',
        details: error.message
      }
    });
  }
};

const getExtraData = async (req, res) => {
  try {
    const {
      order,
      limit,
      pagination_token,
      sort,
      created_at__gt,
      created_at__lt,
      created_at__gte,
      created_at__lte,
      updated_at__gt,
      updated_at__lt,
      updated_at__gte,
      updated_at__lte,
      object_id,
      field_name,
      field_value
    } = req.query;

    const extraData = await dataExportsService.getExtraData({
      order,
      limit,
      pagination_token,
      sort,
      created_at__gt,
      created_at__lt,
      created_at__gte,
      created_at__lte,
      updated_at__gt,
      updated_at__lt,
      updated_at__gte,
      updated_at__lte,
      object_id,
      field_name,
      field_value
    });

    res.json(extraData);
  } catch (error) {
    console.error('Error getting extra data:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve extra data',
        details: error.message
      }
    });
  }
};

const createExtraData = async (req, res) => {
  try {
    const { field_name, field_value, object_id, object_type } = req.body;

    if (!field_name || !field_value || !object_id) {
      return res.status(400).json({
        error: {
          message: 'Missing required fields'
        }
      });
    }

    const extraData = await dataExportsService.createExtraData({
      field_name,
      field_value,
      object_id,
      object_type
    });

    res.json(extraData);
  } catch (error) {
    console.error('Error creating extra data:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to create extra data',
        details: error.message
      }
    });
  }
};

const getExtraDataById = async (req, res) => {
  try {
    const { extraDataId } = req.params;
    const extraData = await dataExportsService.getExtraDataById(extraDataId);
    res.json(extraData);
  } catch (error) {
    console.error('Error getting extra data:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve extra data',
        details: error.message
      }
    });
  }
};

const updateExtraData = async (req, res) => {
  try {
    const { extraDataId } = req.params;
    const { field_name, field_value, object_id, object_type } = req.body;

    const extraData = await dataExportsService.updateExtraData(extraDataId, {
      field_name,
      field_value,
      object_id,
      object_type
    });

    res.json(extraData);
  } catch (error) {
    console.error('Error updating extra data:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to update extra data',
        details: error.message
      }
    });
  }
};

const deleteExtraData = async (req, res) => {
  try {
    const { extraDataId } = req.params;
    const extraData = await dataExportsService.deleteExtraData(extraDataId);
    res.json(extraData);
  } catch (error) {
    console.error('Error deleting extra data:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to delete extra data',
        details: error.message
      }
    });
  }
};

module.exports = {
  getDataExports,
  createDataExport,
  getSupportedFormats,
  getDataExportById,
  getExtraData,
  createExtraData,
  getExtraDataById,
  updateExtraData,
  deleteExtraData
};