const accountingService = require('../services/accounting');

const getPayables = async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const payables = await accountingService.getPayables({ limit, offset });
    res.json({ data: payables });
  } catch (error) {
    console.error('Error getting payables:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve payables',
        details: error.message
      }
    });
  }
};

const getPayableById = async (req, res) => {
  try {
    const { payableId } = req.params;
    const payable = await accountingService.getPayableById(payableId);
    res.json(payable);
  } catch (error) {
    console.error('Error getting payable:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve payable',
        details: error.message
      }
    });
  }
};

const getReceivables = async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const receivables = await accountingService.getReceivables({ limit, offset });
    res.json({ data: receivables });
  } catch (error) {
    console.error('Error getting receivables:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve receivables',
        details: error.message
      }
    });
  }
};

const getReceivableById = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const receivable = await accountingService.getReceivableById(invoiceId);
    res.json(receivable);
  } catch (error) {
    console.error('Error getting receivable:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve receivable',
        details: error.message
      }
    });
  }
};

const getSyncedRecords = async (req, res) => {
  try {
    const { 
      object_type,
      order,
      limit,
      pagination_token,
      sort,
      object_id,
      object_id__in,
      created_at__gt,
      created_at__lt,
      created_at__gte,
      created_at__lte,
      updated_at__gt,
      updated_at__lt,
      updated_at__gte,
      updated_at__lte
    } = req.query;

    if (!object_type) {
      return res.status(422).json({
        error: {
          message: 'object_type is required'
        }
      });
    }

    const records = await accountingService.getSyncedRecords({
      object_type,
      order,
      limit,
      pagination_token,
      sort,
      object_id,
      object_id__in,
      created_at__gt,
      created_at__lt,
      created_at__gte,
      created_at__lte,
      updated_at__gt,
      updated_at__lt,
      updated_at__gte,
      updated_at__lte
    });

    res.json(records);
  } catch (error) {
    console.error('Error getting synced records:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve synced records',
        details: error.message
      }
    });
  }
};

const getSyncedRecordById = async (req, res) => {
  try {
    const { syncedRecordId } = req.params;
    const record = await accountingService.getSyncedRecordById(syncedRecordId);
    res.json(record);
  } catch (error) {
    console.error('Error getting synced record:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve synced record',
        details: error.message
      }
    });
  }
};

const pushSyncedRecord = async (req, res) => {
  try {
    const { syncedRecordId } = req.params;
    const record = await accountingService.pushSyncedRecord(syncedRecordId);
    res.json(record);
  } catch (error) {
    console.error('Error pushing synced record:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to push synced record',
        details: error.message
      }
    });
  }
};

const getTaxRates = async (req, res) => {
  try {
    const { order, limit, pagination_token, sort } = req.query;
    const taxRates = await accountingService.getTaxRates({
      order,
      limit,
      pagination_token,
      sort
    });
    res.json(taxRates);
  } catch (error) {
    console.error('Error getting tax rates:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve tax rates',
        details: error.message
      }
    });
  }
};

const getTaxRateById = async (req, res) => {
  try {
    const { taxRateId } = req.params;
    const taxRate = await accountingService.getTaxRateById(taxRateId);
    res.json(taxRate);
  } catch (error) {
    console.error('Error getting tax rate:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve tax rate',
        details: error.message
      }
    });
  }
};

const getLedgerAccounts = async (req, res) => {
  try {
    const { order, limit, pagination_token, sort } = req.query;
    const accounts = await accountingService.getLedgerAccounts({
      order,
      limit,
      pagination_token,
      sort
    });
    res.json(accounts);
  } catch (error) {
    console.error('Error getting ledger accounts:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve ledger accounts',
        details: error.message
      }
    });
  }
};

const getLedgerAccountById = async (req, res) => {
  try {
    const { ledgerAccountId } = req.params;
    const account = await accountingService.getLedgerAccountById(ledgerAccountId);
    res.json(account);
  } catch (error) {
    console.error('Error getting ledger account:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve ledger account',
        details: error.message
      }
    });
  }
};

module.exports = {
  getPayables,
  getPayableById,
  getReceivables,
  getReceivableById,
  getSyncedRecords,
  getSyncedRecordById,
  pushSyncedRecord,
  getTaxRates,
  getTaxRateById,
  getLedgerAccounts,
  getLedgerAccountById
};