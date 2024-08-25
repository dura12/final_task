// src/services/jobsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const JobsApi = createApi({
  reducerPath: 'JobsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://akil-backend.onrender.com/opportunities' }), 
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: (data: { accessToken: string}) => ({
        url: "/search",
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      }),
    }),
    getDescription: builder.query({
      query: (data: { token: string; id: string }) => ({
        url: `/search/${data.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
  }),
});

export const { useGetAllJobsQuery, useGetDescriptionQuery } = JobsApi;
