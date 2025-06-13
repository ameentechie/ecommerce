// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import { productApi } from './api/productApi';
import { userApi } from './api/userApi';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, userApi.middleware),
});

export default store;
