// slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { storageService } from '../../services/storageService';

// Load initial state from localStorage
const loadInitialState = () => {
  const savedCart = storageService.loadCart();
  if (savedCart) {
    return savedCart;
  }
  return {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  };
};

const initialState = loadInitialState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      
      // Update totals
      state.totalQuantity += 1;
      state.totalAmount += product.price;
      
      // Persist to localStorage
      storageService.saveCart(state);
    },
    
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.id === productId);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter(item => item.id !== productId);
      }
      
      // Persist to localStorage
      storageService.saveCart(state);
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem && quantity > 0) {
        const quantityDiff = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalQuantity += quantityDiff;
        state.totalAmount += existingItem.price * quantityDiff;
      }
      
      // Persist to localStorage
      storageService.saveCart(state);
    },
    
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.id === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalAmount -= existingItem.price;
      }
      
      // Persist to localStorage
      storageService.saveCart(state);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      
      // Clear from localStorage
      storageService.clearCart();
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  decreaseQuantity, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
