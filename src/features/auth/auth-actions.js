import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
 
const backendURL = import.meta.env.VITE_KEY_API;
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};
 
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ firstName, email, password }, { rejectWithValue }) => {
    try {
      await axios.post(`${backendURL}/register`, { firstName, email, password }, config);
    } catch (error) {
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);
 
export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${backendURL}/login`, { email, password }, config);
      localStorage.setItem('access_token', data.access_token);
      return data;
    } catch (error) {
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);