// Product-related constants
export const SORT_OPTIONS = {
  PRICE_ASC: 'price-asc',
  PRICE_DESC: 'price-desc',
  RATING_DESC: 'rating-desc',
  NEWEST: 'newest',
};

export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
};

export const PRICE_RANGE = {
  MIN: 0,
  MAX: 1000,
};

// User-related constants
export const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
};

export const AUTH_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
};

// Order-related constants
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal',
  APPLE_PAY: 'apple_pay',
  GOOGLE_PAY: 'google_pay',
};

// UI-related constants
export const BREAKPOINTS = {
  XS: 0,
  SM: 600,
  MD: 900,
  LG: 1200,
  XL: 1536,
};
