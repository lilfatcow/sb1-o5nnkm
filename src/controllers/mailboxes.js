const mailboxesService = require('../services/mailboxes');

const getMailboxes = async (req, res) => {
  try {
    const mailboxes = await mailboxesService.getMailboxes();
    res.json(mailboxes);
  } catch (error) {
    console.error('Error getting mailboxes:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to retrieve mailboxes',
        details: error.message
      }
    });
  }
};

const createMailbox = async (req, res) => {
  try {
    const { mailbox_domain_id, mailbox_name, related_object_type } = req.body;

    if (!mailbox_domain_id || !mailbox_name) {
      return res.status(400).json({
        error: {
          message: 'mailbox_domain_id and mailbox_name are required'
        }
      });
    }

    const mailbox = await mailboxesService.createMailbox({
      mailbox_domain_id,
      mailbox_name,
      related_object_type: related_object_type || 'payable'
    });

    res.json(mailbox);
  } catch (error) {
    console.error('Error creating mailbox:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to create mailbox',
        details: error.message
      }
    });
  }
};

const searchMailboxes = async (req, res) => {
  try {
    const { entity_ids } = req.body;

    if (!entity_ids || !Array.isArray(entity_ids) || entity_ids.length === 0) {
      return res.status(400).json({
        error: {
          message: 'entity_ids must be a non-empty array'
        }
      });
    }

    const mailboxes = await mailboxesService.searchMailboxes({ entity_ids });
    res.json(mailboxes);
  } catch (error) {
    console.error('Error searching mailboxes:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to search mailboxes',
        details: error.message
      }
    });
  }
};

const deleteMailbox = async (req, res) => {
  try {
    const { mailboxId } = req.params;
    await mailboxesService.deleteMailbox(mailboxId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting mailbox:', error);
    res.status(error.response?.status || 500).json({
      error: {
        message: 'Failed to delete mailbox',
        details: error.message
      }
    });
  }
};

module.exports = {
  getMailboxes,
  createMailbox,
  searchMailboxes,
  deleteMailbox
};