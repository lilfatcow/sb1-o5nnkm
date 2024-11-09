const { MoniteSDK } = require('@monite/sdk-api');
const moniteAuth = require('./moniteAuth');
const config = require('../config');

class MoniteService {
  constructor() {
    this.sdk = null;
  }

  async initializeSDK(entityId) {
    if (!this.sdk) {
      const token = await moniteAuth.getToken();
      
      this.sdk = new MoniteSDK({
        apiUrl: config.monite.apiUrl,
        entityId: entityId,
        fetchToken: async () => token
      });
    }
    return this.sdk;
  }

  async getSDK(entityId) {
    return this.initializeSDK(entityId);
  }

  // Entity operations
  async getEntity(entityId) {
    const sdk = await this.getSDK(entityId);
    return sdk.entities.getById(entityId);
  }

  async updateEntity(entityId, data) {
    const sdk = await this.getSDK(entityId);
    return sdk.entities.update(entityId, data);
  }

  // Payable operations
  async getPayables(entityId, params) {
    const sdk = await this.getSDK(entityId);
    return sdk.payables.getList(params);
  }

  async createPayable(entityId, data) {
    const sdk = await this.getSDK(entityId);
    return sdk.payables.create(data);
  }

  async getPayableById(entityId, id) {
    const sdk = await this.getSDK(entityId);
    return sdk.payables.getById(id);
  }

  // Receivable operations
  async getReceivables(entityId, params) {
    const sdk = await this.getSDK(entityId);
    return sdk.receivables.getList(params);
  }

  async createReceivable(entityId, data) {
    const sdk = await this.getSDK(entityId);
    return sdk.receivables.create(data);
  }

  async getReceivableById(entityId, id) {
    const sdk = await this.getSDK(entityId);
    return sdk.receivables.getById(id);
  }

  // Counterpart operations
  async getCounterparts(entityId, params) {
    const sdk = await this.getSDK(entityId);
    return sdk.counterparts.getList(params);
  }

  async createCounterpart(entityId, data) {
    const sdk = await this.getSDK(entityId);
    return sdk.counterparts.create(data);
  }

  async getCounterpartById(entityId, id) {
    const sdk = await this.getSDK(entityId);
    return sdk.counterparts.getById(id);
  }

  // Product operations
  async getProducts(entityId, params) {
    const sdk = await this.getSDK(entityId);
    return sdk.products.getList(params);
  }

  async createProduct(entityId, data) {
    const sdk = await this.getSDK(entityId);
    return sdk.products.create(data);
  }

  async getProductById(entityId, id) {
    const sdk = await this.getSDK(entityId);
    return sdk.products.getById(id);
  }
}

module.exports = new MoniteService();