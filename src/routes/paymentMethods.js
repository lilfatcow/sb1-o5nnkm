const express = require('express');
const { getEnabledPaymentMethods, enablePaymentMethods } = require('../controllers/paymentMethods');

const router = express.Router();

router.get('/:entityId/payment-methods', getEnabledPaymentMethods);
router.put('/:entityId/payment-methods', enablePaymentMethods);

module.exports = router;