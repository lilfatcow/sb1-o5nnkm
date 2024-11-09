const api = require('../utils/api');

class AccountingService {
  async getPayables({ limit, offset } = {}) {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit);
    if (offset) params.append('offset', offset);

    const response = await api.get(`/accounting/payables?${params.toString()}`);
    return response.data.data;
  }

  async getPayableById(payableId) {
    const response = await api.get(`/accounting/payables/${payableId}`);
    return response.data;
  }

  async getReceivables({ limit, offset } = {}) {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit);
    if (offset) params.append('offset', offset);

    const response = await api.get(`/accounting/receivables?${params.toString()}`);
    return response.data.data;
  }

  async getReceivableById(invoiceId) {
    const response = await api.get(`/accounting/receivables/${invoiceId}`);
    return response.data;
  }

  async getSyncedRecords(params = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value);
      }
    });

    const response = await api.get(`/accounting_synced_records?${queryParams.toString()}`);
    return response.data;
  }

  async getSyncedRecordById(syncedRecordId) {
    const response = await api.get(`/accounting_synced_records/${syncedRecordId}`);
    return response.data;
  }

  async pushSyncedRecord(syncedRecordId) {
    const response = await api.post(`/accounting_synced_records/${syncedRecordId}/push`);
    return response.data;
  }

  async getTaxRates(params = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value);
      }
    });

    const response = await api.get(`/accounting_tax_rates?${queryParams.toString()}`);
    return response.data;
  }

  async getTaxRateById(taxRateId) {
    const response = await api.get(`/accounting_tax_rates/${taxRateId}`);
    return response.data;
  }

  async getLedgerAccounts(params = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value);
      }
    });

    const response = await api.get(`/ledger_accounts?${queryParams.toString()}`);
    return response.data;
  }

  async getLedgerAccountById(ledgerAccountId) {
    const response = await api.get(`/ledger_accounts/${ledgerAccountId}`);
    return response.data;
  }

  async createConnection(entityId) {
    const response = await api.post('/accounting_connections', {}, {
      headers: {
        'x-monite-entity-id': entityId
      }
    });
    return response.data;
  }

  async getConnection(connectionId) {
    const response = await api.get(`/accounting_connections/${connectionId}`);
    return response.data;
  }

  async disconnectConnection(connectionId) {
    const response = await api.post(`/accounting_connections/${connectionId}/disconnect`);
    return response.data;
  }

  async syncConnection(connectionId) {
    const response = await api.post(`/accounting_connections/${connectionId}/sync`);
    return response.data;
  }

  async updatePartnerSettings(settings) {
    const response = await api.patch('/settings', {
      accounting: settings
    });
    return response.data;
  }
}

module.exports = new AccountingService();