import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['Users'],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
    getCarts: builder.query({
      query: () => '/carts',
      providesTags: ['Carts'],
    }),
    getCartById: builder.query({
      query: (id) => `/carts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Carts', id }],
    }),
    getUserCart: builder.query({
      query: (userId) => `/carts/user/${userId}`,
      providesTags: (result, error, userId) => [{ type: 'Carts', userId }],
    }),
    createCart: builder.mutation({
      query: (cart) => ({
        url: '/carts',
        method: 'POST',
        body: cart,
      }),
      invalidatesTags: ['Carts'],
    }),
    updateCart: builder.mutation({
      query: ({ id, ...cart }) => ({
        url: `/carts/${id}`,
        method: 'PUT',
        body: cart,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Carts', id }],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useGetCartsQuery,
  useGetCartByIdQuery,
  useGetUserCartQuery,
  useCreateCartMutation,
  useUpdateCartMutation,
} = userApi;
