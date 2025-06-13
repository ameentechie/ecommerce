import { format } from 'date-fns';

/**
 * Formats a price with currency symbol
 * @param {number} price - The price to format
 * @param {string} currency - The currency code (default: USD)
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  return `$${Number(price).toFixed(2)}`;
};

/**
 * Formats a date string
 * @param {string} dateString - ISO date string
 * @param {string} formatString - Format pattern (default: 'MMM dd, yyyy')
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, formatString = 'MMM dd, yyyy') => {
  if (!dateString) return '';
  try {
    return format(new Date(dateString), formatString);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Truncates text to a specified length and adds ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text with ellipsis if needed
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength).trim()}...`;
};

/**
 * Formats a rating value to a specified precision
 * @param {number} rating - Rating value
 * @param {number} precision - Decimal precision (default: 1)
 * @returns {string} Formatted rating string
 */
export const formatRating = (rating, precision = 1) => {
  if (rating === undefined || rating === null) return 'No ratings';
  return rating.toFixed(precision);
};

/**
 * Formats an address object into a readable string
 * @param {Object} address - Address object
 * @returns {string} Formatted address string
 */
export const formatAddress = (address) => {
  if (!address) return '';
  
  const {
    street = '',
    number = '',
    city = '',
    state = '',
    zipcode = '',
    country = '',
  } = address;
  
  return [
    street && number ? `${number} ${street}` : street || '',
    city,
    state && zipcode ? `${state} ${zipcode}` : state || zipcode || '',
    country,
  ]
    .filter(Boolean)
    .join(', ');
};
