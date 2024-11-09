const ERROR_MESSAGES = {
  required: field => `${field} is required`,
  minLength: (field, min) => `${field} must be at least ${min} characters long`,
  maxLength: (field, max) => `${field} must be at most ${max} characters long`,
  pattern: field => `${field} format is invalid`,
  email: () => 'Invalid email address',
  enum: (field, values) => `${field} must be one of: ${values.join(', ')}`,
};

class ValidationError extends Error {
  constructor(details) {
    super('Validation failed');
    this.name = 'ValidationError';
    this.details = details;
  }
}

const validate = (data, schema) => {
  const errors = [];

  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];

    // Required check
    if (rules.required && (value === undefined || value === null || value === '')) {
      errors.push({
        field,
        message: ERROR_MESSAGES.required(field)
      });
      continue;
    }

    // Skip other validations if value is not provided and not required
    if (value === undefined || value === null) continue;

    // String validations
    if (typeof value === 'string') {
      if (rules.minLength && value.length < rules.minLength) {
        errors.push({
          field,
          message: ERROR_MESSAGES.minLength(field, rules.minLength)
        });
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push({
          field,
          message: ERROR_MESSAGES.maxLength(field, rules.maxLength)
        });
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        errors.push({
          field,
          message: ERROR_MESSAGES.pattern(field)
        });
      }

      if (rules.email && !isValidEmail(value)) {
        errors.push({
          field,
          message: ERROR_MESSAGES.email()
        });
      }
    }

    // Enum validation
    if (rules.enum && !rules.enum.includes(value)) {
      errors.push({
        field,
        message: ERROR_MESSAGES.enum(field, rules.enum)
      });
    }
  }

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  return true;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

module.exports = {
  validate,
  ValidationError
};