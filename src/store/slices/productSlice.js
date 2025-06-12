import { createSlice } from '@reduxjs/toolkit';
import { productApi } from '../api/productApi';

const initialState = {
  filters: {
    category: 'all',
    priceRange: [0, 1000],
    rating: 0,
    searchQuery: '',
  },
  sortBy: 'price',
  sortOrder: 'asc',
  viewMode: 'grid', // 'grid' or 'list'
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.filters.category = action.payload;
    },
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    setRating: (state, action) => {
      state.filters.rating = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.sortBy = initialState.sortBy;
      state.sortOrder = initialState.sortOrder;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productApi.endpoints.getProducts.matchFulfilled,
      (state, action) => {
        // Optional: Add any additional state updates when products are fetched
      }
    );
  },
});

export const {
  setCategory,
  setPriceRange,
  setRating,
  setSearchQuery,
  setSortBy,
  setSortOrder,
  setViewMode,
  resetFilters,
} = productSlice.actions;

export default productSlice.reducer;
