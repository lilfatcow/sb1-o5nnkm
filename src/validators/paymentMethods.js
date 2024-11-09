const { PAYMENT_METHOD_TYPES } = require('../constants/paymentMethods');

const validatePaymentMethods = (methods) => {
  if (!Array.isArray(methods)) {
    return false;
  }

  return methods.every(method => PAYMENT_METHOD_TYPES.includes(method));
};

const validatePaymentMethodsRequest = (body) => {
  const { payment_methods_receive, payment_methods_send } = body;
  const errors = [];

  // Check if at least one payment method array is provided
  if (!payment_methods_receive && !payment_methods_send) {
    errors.push('At least one of payment_methods_receive or payment_methods_send is required');
  }

  // Validate receive methods if provided
  if (payment_methods_receive !== undefined) {
    if (!validatePaymentMethods(payment_methods_receive)) {
      errors.push('Invalid payment_methods_receive: must be an array of valid payment method types');
    }
  }

  // Validate send methods if provided
  if (payment_methods_send !== undefined) {
    if (!validatePaymentMethods(payment_methods_send)) {
      errors.push('Invalid payment_methods_send: must be an array of valid payment method types');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validatePaymentMethodsRequest
};