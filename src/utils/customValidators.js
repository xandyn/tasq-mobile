import { createValidator } from 'revalidate';


export const isValidEmail = createValidator(
  message => (value) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message;
    }
    return null;
  },
  'Invalid email address'
);

export const isGreaterThan = n => createValidator(
  message => (value) => {
    if (value && Number(value) <= n) {
      return message;
    }
    return null;
  },
  field => `${field} must be greater than ${n}`
);

export const hasLengthGreaterOrEqual = n => createValidator(
  message => (value) => {
    if (value && value.length < n) {
      return message;
    }
    return null;
  },
  field => `${field} must be longer ${n} characters`
);
