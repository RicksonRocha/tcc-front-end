import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { isTokenExpired, refreshAccessToken } from 'src/features/auth/auth-utils';

const baseQueryApi = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_KEY_API,
  prepareHeaders: async (headers, { getState }) => {
    const { token } = getState().auth;
    try {
      if (isTokenExpired(token)) {
        const newToken = await refreshAccessToken();
        headers.set('authorization', `Bearer ${newToken}`);
      } else if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      headers.set('accept', 'application/json');
      return headers;
    } catch (error) {
      localStorage.clear(); // Limpa storage e força logout
      window.location.href = '/login'; // Redireciona para login
      throw error;
    }
  },
});

export default baseQueryApi;
