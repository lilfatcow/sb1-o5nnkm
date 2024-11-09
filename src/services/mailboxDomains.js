const api = require('../utils/api');

class MailboxDomainsService {
  async getMailboxDomains() {
    const response = await api.get('/mailbox_domains');
    return response.data;
  }

  async createMailboxDomain(data) {
    const response = await api.post('/mailbox_domains', data);
    return response.data;
  }

  async deleteMailboxDomain(domainId) {
    await api.delete(`/mailbox_domains/${domainId}`);
  }

  async verifyMailboxDomain(domainId) {
    const response = await api.post(`/mailbox_domains/${domainId}/verify`);
    return response.data;
  }
}

module.exports = new MailboxDomainsService();