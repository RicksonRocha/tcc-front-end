import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Configuração da API base
export const api = createApi({
  reducerPath: 'api', 
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3030', // URL da API local para testes
  }),
  endpoints: () => ({}), 
  // Os endpoints serão definidos em arquivos separados, como user.js e etc.
});

export default api;
