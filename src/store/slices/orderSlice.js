import { createSlice } from '@reduxjs/toolkit';
import { storageService } from '../../services/storageService';

// Load initial state from localStorage
const loadInitialState = () => {
  const savedOrders = storageService.loadOrders();
  if (savedOrders) {
    return savedOrders;
  }
  return {
    orders: [],
    isLoading: false,
    error: null,
  };
};

const initialState = loadInitialState();

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Place a new order
    placeOrder: (state, action) => {
      const orderData = action.payload;
      const newOrder = {
        id: Date.now().toString(), // Simple ID generation
        userId: orderData.userId,
        products: orderData.products,
        date: new Date().toISOString(),
        shippingAddress: orderData.shippingAddress,
        paymentDetails: orderData.paymentDetails,
        status: 'confirmed',
        total: orderData.total,
        orderNumber: `ORD-${Date.now()}`,
      };
      
      state.orders.unshift(newOrder); // Add to beginning of array
      state.error = null;
      
      // Persist to localStorage
      storageService.saveOrders(state);
    },

    // Update order status
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(order => order.id === orderId);
      if (order) {
        order.status = status;
        // Persist to localStorage
        storageService.saveOrders(state);
      }
    },

    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Clear orders (for logout)
    clearOrders: (state) => {
      state.orders = [];
      state.error = null;
      
      // Clear from localStorage
      storageService.clearOrders();
    },

    // Get orders for specific user
    setUserOrders: (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
      state.error = null;
      
      // Persist to localStorage
      storageService.saveOrders(state);
    },
  },
});

export const {
  placeOrder,
  updateOrderStatus,
  setLoading,
  setError,
  clearOrders,
  setUserOrders,
} = orderSlice.actions;

// Selectors
export const selectAllOrders = (state) => state.orders.orders;
export const selectOrderById = (state, orderId) => 
  state.orders.orders.find(order => order.id === orderId);
export const selectOrdersLoading = (state) => state.orders.isLoading;
export const selectOrdersError = (state) => state.orders.error;
export const selectUserOrders = (state, userId) => 
  state.orders.orders.filter(order => order.userId === userId);

export default orderSlice.reducer; 