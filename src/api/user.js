import { createApi } from '@reduxjs/toolkit/query';
import baseQueryApi from './base-query';

// Definição dos endpoints relacionados a usuários
export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['Users'],
  baseQuery: baseQueryApi,
  endpoints: (build) => ({

    // Endpoint para obter informações de um usuário
    getUser: build.query({
      query: (userId) => `/users/${userId}`,
    }),

    // Endpoint para listar todos os usuários
    getUsers: build.query({
      query: () => '/user/all',
    }),
  }),
});

// Exportando os hooks gerados automaticamente pelo react toolkit query
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useResetPasswordMutation, 
  useGetUserQuery,
  useGetUsersQuery,
} = userApi;
