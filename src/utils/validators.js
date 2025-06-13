// Form validation utilities for ShopSmart

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (supports various formats)
export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

// Credit card number validation (basic Luhn algorithm)
export const validateCreditCard = (cardNumber) => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  
  if (!/^\d{13,19}$/.test(cleanNumber)) {
    return false;
  }

  let sum = 0;
  let isEven = false;
  
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

// CVV validation
export const validateCVV = (cvv, cardType = 'visa') => {
  const cleanCVV = cvv.replace(/\s/g, '');
  
  if (cardType === 'amex') {
    return /^\d{4}$/.test(cleanCVV);
  }
  
  return /^\d{3}$/.test(cleanCVV);
};

// Expiry date validation (MM/YY format)
export const validateExpiryDate = (expiryDate) => {
  const cleanDate = expiryDate.replace(/\s/g, '');
  
  if (!/^\d{2}\/\d{2}$/.test(cleanDate)) {
    return false;
  }
  
  const [month, year] = cleanDate.split('/');
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);
  
  if (monthNum < 1 || monthNum > 12) {
    return false;
  }
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
    return false;
  }
  
  return true;
};

// Postal code validation (supports various formats)
export const validatePostalCode = (postalCode, country = 'US') => {
  const cleanCode = postalCode.replace(/\s/g, '');
  
  const patterns = {
    US: /^\d{5}(-\d{4})?$/,
    CA: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    UK: /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/,
    IN: /^\d{6}$/,
    AU: /^\d{4}$/,
    DE: /^\d{5}$/,
    FR: /^\d{5}$/,
    JP: /^\d{3}-\d{4}$/,
    BR: /^\d{5}-?\d{3}$/,
    MX: /^\d{5}$/,
    default: /^.{3,10}$/
  };
  
  const pattern = patterns[country] || patterns.default;
  return pattern.test(cleanCode);
};

// Name validation (allows letters, spaces, hyphens, apostrophes)
export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s\-']{2,50}$/;
  return nameRegex.test(name.trim());
};

// Address validation (basic check for minimum length and allowed characters)
export const validateAddress = (address) => {
  const addressRegex = /^[a-zA-Z0-9\s\-\.,#\/]{5,100}$/;
  return addressRegex.test(address.trim());
};

// City validation
export const validateCity = (city) => {
  const cityRegex = /^[a-zA-Z\s\-']{2,50}$/;
  return cityRegex.test(city.trim());
};

// Required field validation
export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

// Comprehensive checkout form validation
export const validateCheckoutForm = (formData) => {
  const errors = {};
  
  // Shipping address validation
  if (!validateRequired(formData.fullName)) {
    errors.fullName = 'Full name is required';
  } else if (!validateName(formData.fullName)) {
    errors.fullName = 'Please enter a valid name';
  }
  
  if (!validateRequired(formData.address)) {
    errors.address = 'Address is required';
  } else if (!validateAddress(formData.address)) {
    errors.address = 'Please enter a valid address';
  }
  
  if (!validateRequired(formData.city)) {
    errors.city = 'City is required';
  } else if (!validateCity(formData.city)) {
    errors.city = 'Please enter a valid city name';
  }
  
  if (!validateRequired(formData.pincode)) {
    errors.pincode = 'Postal code is required';
  } else if (!validatePostalCode(formData.pincode, formData.country || 'US')) {
    errors.pincode = 'Please enter a valid postal code';
  }
  
  if (!validateRequired(formData.phone)) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  // Payment details validation
  if (!validateRequired(formData.cardNumber)) {
    errors.cardNumber = 'Card number is required';
  } else if (!validateCreditCard(formData.cardNumber)) {
    errors.cardNumber = 'Please enter a valid card number';
  }
  
  if (!validateRequired(formData.nameOnCard)) {
    errors.nameOnCard = 'Name on card is required';
  } else if (!validateName(formData.nameOnCard)) {
    errors.nameOnCard = 'Please enter a valid name';
  }
  
  if (!validateRequired(formData.expiryDate)) {
    errors.expiryDate = 'Expiry date is required';
  } else if (!validateExpiryDate(formData.expiryDate)) {
    errors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
  }
  
  if (!validateRequired(formData.cvv)) {
    errors.cvv = 'CVV is required';
  } else if (!validateCVV(formData.cvv)) {
    errors.cvv = 'Please enter a valid CVV';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Format card number with spaces for display
export const formatCardNumber = (cardNumber) => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  const groups = cleanNumber.match(/.{1,4}/g);
  return groups ? groups.join(' ') : cleanNumber;
};

// Format expiry date for display
export const formatExpiryDate = (expiryDate) => {
  const cleanDate = expiryDate.replace(/\D/g, '');
  if (cleanDate.length >= 2) {
    return cleanDate.substring(0, 2) + (cleanDate.length > 2 ? '/' + cleanDate.substring(2, 4) : '');
  }
  return cleanDate;
}; 