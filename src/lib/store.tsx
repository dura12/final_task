// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { JobsApi } from './services/opportunitiesService'; 
import { BookmarkApi } from './services/bookmarkService';
export const store = configureStore({
  reducer: {
    [JobsApi.reducerPath]: JobsApi.reducer, 
    [BookmarkApi.reducerPath]: BookmarkApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(JobsApi.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
