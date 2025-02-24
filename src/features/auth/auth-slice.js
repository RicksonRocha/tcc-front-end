import { createSlice } from '@reduxjs/toolkit';

import { saveTokens, clearTokens } from 'src/utils/token-services';
import { userLogin, registerUser } from './auth-actions';

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

const refreshToken = localStorage.getItem('refreshToken')
  ? localStorage.getItem('refreshToken')
  : null;

// Tenta recuperar os dados do usuário do localStorage
const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const initialState = {
  loading: false,
  auth: userFromStorage, 
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
      clearTokens();
      state.loading = false;
      state.token = null;
      state.refreshToken = null;
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
        state.success = true;
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
        state.success = true;
        state.auth = payload; // Atualiza user com os dados do payload { token, refreshToken }
        state.token = payload.token;
        state.refreshToken = payload.refreshToken;
        saveTokens(payload.token, payload.refreshToken);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
