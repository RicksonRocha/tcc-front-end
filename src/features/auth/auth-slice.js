import { createSlice } from '@reduxjs/toolkit'
 
import { userLogin, registerUser } from './auth-actions';
 
const access_token = localStorage.getItem('access_token')
  ? localStorage.getItem('access_token')
  : null
 
 
const initialState = {
  loading: false,
  auth: {}, // for user object
  access_token, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
}
 
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('access_token') // deletes token from storage
      state.loading = false
      state.access_token = null
      state.auth = null
      state.error = null
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
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;        
      });
  },
})
 
export const { logout } = authSlice.actions
 
export default authSlice.reducer