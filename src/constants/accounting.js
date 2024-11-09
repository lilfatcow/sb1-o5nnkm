const ACCOUNTING_PLATFORMS = {
  XERO: 'xero',
  QUICKBOOKS: 'quickbooks',
  QUICKBOOKS_ONLINE: 'quickbooks_online',
  QUICKBOOKS_ONLINE_SANDBOX: 'quickbooks_online_sandbox'
};

const CONNECTION_STATUSES = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  DEAUTHORIZED: 'deauthorized',
  PENDING_AUTH: 'pending_auth'
};

module.exports = {
  ACCOUNTING_PLATFORMS,
  CONNECTION_STATUSES
};