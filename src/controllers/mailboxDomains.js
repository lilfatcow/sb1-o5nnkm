const mailboxDomainsService = require('../services/mailboxDomains');

const getMailboxDomains = async (req, res) => {
  try {
    const domains = await mailboxDomainsService.getMailboxDomains();
    res.json(domains);
  } catch (error) {
    console.error('Error getting mailbox domains:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve mailbox domains',
        details: error.message
      }
    });
  }
};

const createMailboxDomain = async (req, res) => {
  try {
    const { domain } = req.body;

    if (!domain) {
      return res.status(400).json({
        error: {
          message: 'Domain is required'
        }
      });
    }

    const result = await mailboxDomainsService.createMailboxDomain({ domain });
    res.json(result);
  } catch (error) {
    console.error('Error creating mailbox domain:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to create mailbox domain',
        details: error.message
      }
    });
  }
};

const deleteMailboxDomain = async (req, res) => {
  try {
    const { domainId } = req.params;
    await mailboxDomainsService.deleteMailboxDomain(domainId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting mailbox domain:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to delete mailbox domain',
        details: error.message
      }
    });
  }
};

const verifyMailboxDomain = async (req, res) => {
  try {
    const { domainId } = req.params;
    const result = await mailboxDomainsService.verifyMailboxDomain(domainId);
    res.json(result);
  } catch (error) {
    console.error('Error verifying mailbox domain:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to verify mailbox domain',
        details: error.message
      }
    });
  }
};

module.exports = {
  getMailboxDomains,
  createMailboxDomain,
  deleteMailboxDomain,
  verifyMailboxDomain
};