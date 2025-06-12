import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../api/userApi';

// Load initial state from localStorage
const loadUserFromStorage = () => {
  try {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return userData && token ? { user: JSON.parse(userData), token } : { user: null, token: null };
  } catch (error) {
    console.error('Error loading user data from localStorage:', error);
    return { user: null, token: null };
  }
};

const initialState = {
  ...loadUserFromStorage(),
  status: 'idle',
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.status = 'succeeded';
      state.error = null;
      
      // Save to localStorage
      try {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
      } catch (error) {
        console.error('Error saving user data to localStorage:', error);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      // Update localStorage
      try {
        localStorage.setItem('user', JSON.stringify(state.user));
      } catch (error) {
        console.error('Error updating user data in localStorage:', error);
      }
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
          state.error = null;
        }
      )
      .addMatcher(
        userApi.endpoints.login.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Authentication failed';
        }
      )
      .addMatcher(
        userApi.endpoints.createUser.matchPending,
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )
      .addMatcher(
        userApi.endpoints.createUser.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.error = null;
        }
      )
      .addMatcher(
        userApi.endpoints.createUser.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Registration failed';
        }
      );
  },
});

export const { setCredentials, logout, updateUserProfile } = userSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.user.user;
export const selectCurrentToken = (state) => state.user.token;
export const selectAuthStatus = (state) => state.user.status;
export const selectAuthError = (state) => state.user.error;

export default userSlice.reducer;
