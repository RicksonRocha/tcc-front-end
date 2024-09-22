// src/api/users.js
import { api } from './api';

// Endpoints relacionados a usuários
export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
      transformResponse: (response) => response.map((user) => ({
        fullName: user.fullName,
        email: user.email,
        password: user.password,
      })),
    }),
    // Criar mesma estrutura para o login e atualizar nos códigos das sections (de login e etc.)
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: 'users/register',
        method: 'POST',
        body: newUser,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery, useRegisterUserMutation } = usersApi;

