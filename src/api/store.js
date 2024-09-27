import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from 'src/features/auth/auth-slice';
import { userApi } from './user';

 
export const store = configureStore({
  reducer: {
    auth: authSlice,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});
 
setupListeners(store.dispatch);