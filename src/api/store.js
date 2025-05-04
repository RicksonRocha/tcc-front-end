import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from 'src/features/auth/auth-slice';
import { userApi } from './user';
import { studentApi } from './student';
import { teamApi } from './team';
import { preferenceApi } from './preference';
import { eventApi } from './event';
import { professorPreferenceApi } from './preference-prof';
import { notificationApi } from './notifications';
import { requestEntryTccApi } from './requestEntryTcc';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [userApi.reducerPath]: userApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [preferenceApi.reducerPath]: preferenceApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [professorPreferenceApi.reducerPath]: professorPreferenceApi.reducer, // Adicionado
    [notificationApi.reducerPath]: notificationApi.reducer,
    [requestEntryTccApi.reducerPath]: requestEntryTccApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      studentApi.middleware,
      teamApi.middleware,
      preferenceApi.middleware,
      eventApi.middleware,
      professorPreferenceApi.middleware, // Adicionado
      notificationApi.middleware,
      requestEntryTccApi.middleware
    ),
});

setupListeners(store.dispatch);
