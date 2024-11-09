const express = require('express');
const { 
  getMailboxes,
  createMailbox,
  searchMailboxes,
  deleteMailbox
} = require('../controllers/mailboxes');

const router = express.Router();

router.get('/', getMailboxes);
router.post('/', createMailbox);
router.post('/search', searchMailboxes);
router.delete('/:mailboxId', deleteMailbox);

module.exports = router;