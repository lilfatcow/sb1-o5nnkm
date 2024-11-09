const express = require('express');
const { 
  getMailboxDomains,
  createMailboxDomain,
  deleteMailboxDomain,
  verifyMailboxDomain
} = require('../controllers/mailboxDomains');

const router = express.Router();

router.get('/', getMailboxDomains);
router.post('/', createMailboxDomain);
router.delete('/:domainId', deleteMailboxDomain);
router.post('/:domainId/verify', verifyMailboxDomain);

module.exports = router;