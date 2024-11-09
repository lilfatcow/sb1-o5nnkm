const api = require('../utils/api');

class MailboxesService {
  async getMailboxes() {
    const response = await api.get('/mailboxes');
    return response.data;
  }

  async createMailbox(data) {
    const response = await api.post('/mailboxes', data);
    return response.data;
  }

  async searchMailboxes(data) {
    const response = await api.post('/mailboxes/search', data);
    return response.data;
  }

  async deleteMailbox(mailboxId) {
    await api.delete(`/mailboxes/${mailboxId}`);
  }
}

module.exports = new MailboxesService();