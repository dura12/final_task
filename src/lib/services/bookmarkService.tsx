// src/services/jobsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BookmarkApi = createApi({
  reducerPath: 'bookmark',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://akil-backend.onrender.com/' }), 
  endpoints: (builder) => ({
    getAllBookmark: builder.query({
      query: (accessToken: string) => ({
        url: "/bookmarks",
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    createBookmark: builder.mutation({
      query: (data: { token: string; id: string }) => ({
        url: `/bookmarks/${data.id}`, // Adjust the URL path if needed
        method: "POST",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    deleteBookmark: builder.mutation({
      query: (data: { token: string; id: string }) => ({
        url: `/bookmarks/${data.id}`, // Adjust the URL path if needed
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
  }),
});

export const { 
  useDeleteBookmarkMutation, 
  useGetAllBookmarkQuery, 
  useCreateBookmarkMutation 
} = BookmarkApi;
