// services/storageService.js

const CART_STORAGE_KEY = 'shopsmart_cart';
const ORDERS_STORAGE_KEY = 'shopsmart_orders';

export const storageService = {
  // Cart persistence
  saveCart: (cartState) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  },

  loadCart: () => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : null;
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return null;
    }
  },

  clearCart: () => {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing cart from localStorage:', error);
    }
  },

  // Orders persistence
  saveOrders: (ordersState) => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(ordersState));
    } catch (error) {
      console.error('Error saving orders to localStorage:', error);
    }
  },

  loadOrders: () => {
    try {
      const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      return savedOrders ? JSON.parse(savedOrders) : null;
    } catch (error) {
      console.error('Error loading orders from localStorage:', error);
      return null;
    }
  },

  clearOrders: () => {
    try {
      localStorage.removeItem(ORDERS_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing orders from localStorage:', error);
    }
  },

  // Clear all app data
  clearAllData: () => {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(ORDERS_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing all data from localStorage:', error);
    }
  }
}; 