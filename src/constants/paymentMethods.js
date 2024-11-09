// Valid payment method types
const PAYMENT_METHOD_TYPES = [
  'sepa_credit',
  'us_ach',
  'blik',
  'card',
  'bacs_direct_debit',
  'bancontact',
  'eps',
  'giropay',
  'ideal',
  'p24',
  'sepa_debit',
  'sofort',
  'applepay',
  'googlepay'
];

// Payment method names mapping
const PAYMENT_METHOD_NAMES = {
  sepa_credit: 'SEPA Payments',
  us_ach: 'US ACH Payments',
  blik: 'BLIK',
  card: 'Card payments',
  bacs_direct_debit: 'Bacs Direct Debit',
  bancontact: 'Bancontact',
  eps: 'Electronic Payment Standard',
  giropay: 'Giropay',
  ideal: 'iDEAL',
  p24: 'Przelewy24',
  sepa_debit: 'SEPA Direct Debit',
  sofort: 'SOFORT',
  applepay: 'Apple Pay',
  googlepay: 'Google Pay'
};

// Payment method directions
const DIRECTIONS = {
  RECEIVE: 'receive',
  SEND: 'send'
};

// Payment method statuses
const STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
};

module.exports = {
  PAYMENT_METHOD_TYPES,
  PAYMENT_METHOD_NAMES,
  DIRECTIONS,
  STATUSES
};