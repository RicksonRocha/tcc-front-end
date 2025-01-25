import { createApi } from '@reduxjs/toolkit/query/react';
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
      query: () => '/users',
    }),

    getStudents: build.query({
      query: () => '/auth/users/students',
      providesTags: ['Users'],
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
  useGetStudentsQuery
} = userApi;
