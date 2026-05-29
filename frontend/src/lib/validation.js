export const validateMobileNumber = (number) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(number);
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

export const validateOTP = (otp) => {
  return /^\d{6}$/.test(otp);
};

export const validateName = (name) => {
  return name.trim().length >= 3;
};

export const validateForm = (data, schema) => {
  const errors = {};
  
  Object.keys(schema).forEach((key) => {
    const validator = schema[key];
    if (!validator(data[key])) {
      errors[key] = true;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
