import { api } from './api'; // Importando a configuração base da API

// Definição dos endpoints relacionados a usuários
export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Endpoint para registrar um novo usuário
    registerUser: build.mutation({
      query: (newUser) => ({
        url: '/users/register',
        method: 'POST',
        body: newUser,
      }),
    }),

    // Endpoint para login de usuário
    loginUser: build.mutation({
      query: (loginData) => ({
        url: '/users/login',
        method: 'POST',
        body: loginData,
      }),
    }),

    // Endpoint para redefinir a senha
    resetPassword: build.mutation({
      query: (data) => ({
        url: '/users/reset-password',
        method: 'PUT', 
        body: data,
      }),
    }),

    // Endpoint para obter informações de um usuário
    getUser: build.query({
      query: (userId) => `/users/${userId}`,
    }),

    // Endpoint para listar todos os usuários
    getUsers: build.query({
      query: () => '/users',
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
