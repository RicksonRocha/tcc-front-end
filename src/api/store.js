import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from 'src/features/auth/auth-slice';
import { userApi } from './user';
import { studentApi } from './student'; 

 
export const store = configureStore({
  reducer: {
    auth: authSlice,
    [userApi.reducerPath]: userApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, studentApi.middleware),
});
 
setupListeners(store.dispatch);