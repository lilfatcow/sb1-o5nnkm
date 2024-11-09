const api = require('../utils/api');

class DataExportsService {
  async getDataExports(params = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value);
      }
    });

    const response = await api.get(`/data_exports?${queryParams.toString()}`);
    return response.data;
  }

  async createDataExport(data) {
    const response = await api.post('/data_exports', data);
    return response.data;
  }

  async getSupportedFormats() {
    const response = await api.get('/data_exports/supported_formats');
    return response.data;
  }

  async getDataExportById(documentExportId) {
    const response = await api.get(`/data_exports/${documentExportId}`);
    return response.data;
  }

  async getExtraData(params = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value);
      }
    });

    const response = await api.get(`/data_exports/extra_data?${queryParams.toString()}`);
    return response.data;
  }

  async createExtraData(data) {
    const response = await api.post('/data_exports/extra_data', data);
    return response.data;
  }

  async getExtraDataById(extraDataId) {
    const response = await api.get(`/data_exports/extra_data/${extraDataId}`);
    return response.data;
  }

  async updateExtraData(extraDataId, data) {
    const response = await api.patch(`/data_exports/extra_data/${extraDataId}`, data);
    return response.data;
  }

  async deleteExtraData(extraDataId) {
    const response = await api.delete(`/data_exports/extra_data/${extraDataId}`);
    return response.data;
  }
}

module.exports = new DataExportsService();