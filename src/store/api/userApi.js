import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/users',
        method: 'GET',
        params: {
          username: credentials.username,
          password: credentials.password,
        },
      }),
      transformResponse: (response) => {
        // JSON Server doesn't have built-in auth, so we'll simulate it
        const user = response[0];
        if (!user) {
          throw new Error('Invalid username or password');
        }
        
        // Create a simple token (in a real app, this would come from a proper auth server)
        const token = btoa(`${user.username}:${user.password}`);
        
        return {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name,
          },
          token,
        };
      },
      transformErrorResponse: (response) => {
        if (response.status === 404) {
          return { message: 'Invalid username or password' };
        }
        return { message: 'An error occurred during login' };
      }
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          // Handle any errors that occur during the request
          console.error('User creation failed:', error);
        }
      },
      transformResponse: (response) => {
        if (!response) {
          throw new Error('No response from server');
        }

        // Create a simple token for the new user
        const token = btoa(`${response.username}:${response.password}`);
        
        return {
          user: {
            id: response.id,
            username: response.username,
            email: response.email,
            name: response.name,
          },
          token,
        };
      },
      transformErrorResponse: (response) => {
        if (response.status === 400) {
          return { message: 'Username or email already exists' };
        }
        return { message: 'Registration failed. Please try again.' };
      },
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: 'PUT',
        body: user,
      }),
      transformResponse: (response) => {
        if (!response) {
          throw new Error('No response from server');
        }
        return {
          id: response.id,
          username: response.username,
          email: response.email,
          name: response.name,
          phone: response.phone,
          address: response.address,
        };
      },
      transformErrorResponse: (response) => {
        if (response.status === 404) {
          return { message: 'User not found' };
        }
        return { message: 'Failed to update profile. Please try again.' };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }],
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
  useUpdateUserMutation,
  useGetCartsQuery,
  useGetCartByIdQuery,
  useGetUserCartQuery,
  useCreateCartMutation,
  useUpdateCartMutation,
} = userApi;
