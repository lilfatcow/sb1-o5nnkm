const api = require('../utils/api');
const FormData = require('form-data');

class FilesService {
  async getFiles({ id__in } = {}) {
    const params = new URLSearchParams();
    if (id__in) params.append('id__in', id__in);

    const response = await api.get(`/files?${params.toString()}`);
    return response.data.data;
  }

  async uploadFile(file, fileType) {
    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype
    });
    formData.append('file_type', fileType);

    const response = await api.post('/files', formData, {
      headers: {
        ...formData.getHeaders()
      }
    });
    return response.data;
  }

  async getFileById(fileId) {
    const response = await api.get(`/files/${fileId}`);
    return response.data;
  }

  async deleteFile(fileId) {
    await api.delete(`/files/${fileId}`);
  }
}

module.exports = new FilesService();