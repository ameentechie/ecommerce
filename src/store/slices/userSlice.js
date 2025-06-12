import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../api/userApi';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  authToken: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.currentUser = user;
      state.authToken = token;
      state.isAuthenticated = true;
      state.status = 'succeeded';
      state.error = null;
    },
    logout: (state) => {
      state.currentUser = null;
      state.authToken = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
    updateUserProfile: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.login.matchPending,
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )
      .addMatcher(
        userApi.endpoints.login.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.isAuthenticated = true;
          state.authToken = action.payload.token;
          // Note: In a real app, you would likely need to fetch user details in a separate call
          // after authentication, as the token response might not include full user details
        }
      )
      .addMatcher(
        userApi.endpoints.login.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Authentication failed';
        }
      );
  },
});

export const { setCredentials, logout, updateUserProfile } = userSlice.actions;

export default userSlice.reducer;
