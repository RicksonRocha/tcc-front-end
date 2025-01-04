import { createSlice } from '@reduxjs/toolkit';

import { userLogin, registerUser } from './auth-actions';

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

const refreshToken = localStorage.getItem('refreshToken')
  ? localStorage.getItem('refreshToken')
  : null;

const initialState = {
  loading: false,
  auth: {}, // for user object
  token, // for storing the JWT
  refreshToken, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token'); // deletes token from storage
      localStorage.removeItem('refreshToken'); // deletes token from storage
      state.loading = false;
      state.token = null;
      state.auth = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // registro bem-sucedido
        state.auth = payload; // Atualiza user com os dados do payload
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // registro bem-sucedido
        state.auth = payload; // Atualiza user com os dados do payload
        console.log('payload auth', payload);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
