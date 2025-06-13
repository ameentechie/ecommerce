import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  selectedCategory: "all",
  sortOption: "price_asc",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.status = "succeeded";
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
  },
});

export const {
  setProducts,
  setLoading,
  setError,
  setSelectedCategory,
  setSortOption,
} = productSlice.actions;

export default productSlice.reducer;
