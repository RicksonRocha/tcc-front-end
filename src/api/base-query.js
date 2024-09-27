import { fetchBaseQuery } from '@reduxjs/toolkit/query';
 
const baseQueryApi = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_KEY_API,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access_token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
      headers.set('accept', 'application/json');
      return headers;
    }
  },
});
 
export default baseQueryApi;