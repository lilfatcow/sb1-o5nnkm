const filesService = require('../services/files');

const getFiles = async (req, res) => {
  try {
    const { id__in } = req.query;
    const files = await filesService.getFiles({ id__in });
    res.json({ data: files });
  } catch (error) {
    console.error('Error getting files:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve files',
        details: error.message
      }
    });
  }
};

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: {
          message: 'No file provided'
        }
      });
    }

    const { file_type } = req.body;
    if (!file_type) {
      return res.status(400).json({
        error: {
          message: 'file_type is required'
        }
      });
    }

    const fileData = await filesService.uploadFile(req.file, file_type);
    res.json(fileData);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to upload file',
        details: error.message
      }
    });
  }
};

const getFileById = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await filesService.getFileById(fileId);
    res.json(file);
  } catch (error) {
    console.error('Error getting file:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve file',
        details: error.message
      }
    });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    await filesService.deleteFile(fileId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to delete file',
        details: error.message
      }
    });
  }
};

module.exports = {
  getFiles,
  uploadFile,
  getFileById,
  deleteFile
};