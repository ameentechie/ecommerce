import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});
