import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../api/userApi';

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity,
        });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    saveForLater: (state, action) => {
      // In a real app, this would save items to a "saved for later" list
      // For now, we'll just implement the action without functionality
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.getUserCart.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        userApi.endpoints.getUserCart.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          // Transform the API response to match our cart structure
          if (action.payload && action.payload.products) {
            state.items = action.payload.products.map(item => ({
              id: item.productId,
              quantity: item.quantity,
              // Note: The API doesn't return full product details in cart
              // In a real app, you would need to fetch these separately
              // or have them included in the response
            }));
          }
        }
      )
      .addMatcher(
        userApi.endpoints.getUserCart.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  saveForLater,
} = cartSlice.actions;

// Selectors
export const selectCartItems = state => state.cart.items;
export const selectCartTotal = state => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectCartItemCount = state => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;
