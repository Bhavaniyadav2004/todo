import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define API slice for User APIs
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5005/api/User',  // Make sure this matches your backend URL
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        // Fetch all users
        getUsers: builder.query({
            query: () => '',
        }),

        // Fetch user by ID
        getUserById: builder.query({
            query: (id) => `${id}`,  // Removed leading slash
        }),

        // Create new user (Signup)
        createUser: builder.mutation({
            query: (userData) => ({
                url: '',
                method: 'POST',
                body: userData,
            }),
        }),
        

        // Login user
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: 'login',  // Adjust if your backend has a different endpoint
                method: 'POST',
                body: credentials,
            }),
        }),

        // Delete user
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${id}`,  // Removed leading slash
                method: 'DELETE',
            }),
        }),
    }),
});

// Export hooks for using the queries & mutations in components
export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useLoginUserMutation,
    useDeleteUserMutation,
} = userApi;
