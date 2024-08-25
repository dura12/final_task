// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { JobsApi } from './services/opportunitiesService'; // Ensure correct import path
import { BookmarkApi } from './services/bookmarkService';
export const store = configureStore({
  reducer: {
    [JobsApi.reducerPath]: JobsApi.reducer, 
    [BookmarkApi.reducerPath]: BookmarkApi.reducer, // Add the API slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(JobsApi.middleware),

   // Add RTK Query middleware
});

// Setup listeners for refetching and reconnecting
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
