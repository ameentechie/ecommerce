import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../api/userApi';
import { storageService } from '../../services/storageService';

// Load initial state from localStorage
const loadUserFromStorage = () => {
  try {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userData && token) {
      const parsedUser = JSON.parse(userData);
      return { 
        user: {
          id: parsedUser.id,
          username: parsedUser.username,
          email: parsedUser.email,
          name: parsedUser.name,
          phone: parsedUser.phone,
          address: parsedUser.address,
          password: parsedUser.password,
        }, 
        token 
      };
    }
    return { user: null, token: null };
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
      // Ensure we store the complete user object
      state.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        password: user.password,
      };
      state.token = token;
      state.status = 'succeeded';
      state.error = null;
      
      // Save complete user data to localStorage
      try {
        localStorage.setItem('user', JSON.stringify(state.user));
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
      
      // Clear cart and orders data on logout
      storageService.clearAllData();
    },
    updateUserProfile: (state, action) => {
      // Store the complete user data
      state.user = {
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        name: action.payload.name,
        phone: action.payload.phone,
        address: action.payload.address,
        password: action.payload.password,
      };
      
      // Update localStorage with the complete user object
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
