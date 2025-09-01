import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import projectSlice from './slices/projectSlice';
import organizationSlice from './slices/organizationSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    projects: projectSlice,
    organizations: organizationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;