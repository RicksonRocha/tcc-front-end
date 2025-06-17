import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryApi from './base-query';

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['Users'],
  baseQuery: baseQueryApi,
  endpoints: (build) => ({
    // Endpoint para obter informações de um usuário
    getUser: build.query({
      query: (userId) => `/auth/users/${userId}`,
    }),

    // Endpoint para listar todos os usuários
    getUsers: build.query({
      query: () => '/auth/users',
    }),

    getUsersCountByRole: build.query({
      query: () => '/auth/users/count-by-role',
    }),

    // Endpoint para listar estudantes
    getStudents: build.query({
      query: () => '/auth/users/students',
      providesTags: ['Users'],
    }),

    // Endpoint para listar professores
    getTeachers: build.query({
      query: () => '/auth/users/teachers',
      providesTags: ['Users'],
    }),

    // Endpoint para atualizar um usuário
    updateUser: build.mutation({
      query: ({ id, ...updatedUser }) => ({
        url: `/auth/users/${id}`,
        method: 'PUT',
        body: updatedUser,
      }),
      invalidatesTags: ['Users'],
    }),

    // Endpoint para excluir um usuário
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/auth/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersCountByRoleQuery,
  useGetUserQuery,
  useGetUsersQuery,
  useGetStudentsQuery,
  useGetTeachersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useResetPasswordMutation,
  useRegisterUserMutation,
} = userApi;
