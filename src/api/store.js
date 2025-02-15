import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from 'src/features/auth/auth-slice';
import { userApi } from './user';
import { studentApi } from './student';
import { teamApi } from './team';
import { preferenceApi } from './preference';
import { eventApi } from './event';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [userApi.reducerPath]: userApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [preferenceApi.reducerPath]: preferenceApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      studentApi.middleware,
      teamApi.middleware,
      preferenceApi.middleware,
      eventApi.middleware
    ),
});

setupListeners(store.dispatch);
