import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  tagTypes: ['Products', 'Categories'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params = {}) => {
        const { category, limit } = params;
        return {
          url: category ? `/products/category/${category}` : '/products',
          params: limit ? { limit } : {},
        };
      },
      providesTags: ['Products'],
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    getCategories: builder.query({
      query: () => '/products/categories',
      providesTags: ['Categories'],
    }),
    getProductsByCategory: builder.query({
      query: (category) => `/products/category/${category}`,
      providesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} = productApi;
