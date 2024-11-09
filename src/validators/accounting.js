const VALID_PROVIDERS = ['railz'];

const validateSettings = (settings) => {
  const errors = [];

  if (!settings.provider) {
    errors.push('Provider is required');
  } else if (!VALID_PROVIDERS.includes(settings.provider)) {
    errors.push('Invalid provider specified');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateSettings
};