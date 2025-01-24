import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryApi from './base-query';

export const teamApi = createApi({
  reducerPath: 'teamApi',
  tagTypes: ['Teams'],
  baseQuery: baseQueryApi,
  endpoints: (build) => ({
    // Endpoint para obter todas as equipes
    getTeams: build.query({
      query: () => '/university/tcc',
      providesTags: ['Teams'],
    }),

    // Endpoint para obter uma equipe específica por ID
    getTeamById: build.query({
      query: (id) => `/university/tcc/${id}`,
      providesTags: (result, error, id) => [{ type: 'Teams', id }],
    }),

    // Endpoint para obter a equipe do usuário logado
    getTeamByStudent: build.query({
      query: () => '/university/tcc/student',
      providesTags: ['Teams'],
    }),

    // Endpoint para criar uma nova equipe
    createTeam: build.mutation({
      query: (newTeam) => ({
        url: '/university/tcc',
        method: 'POST',
        body: newTeam,
      }),
      invalidatesTags: ['Teams'],
    }),

    // Endpoint para atualizar uma equipe existente
    updateTeam: build.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/university/tcc/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Teams', id }],
    }),

    // Endpoint para deletar uma equipe
    deleteTeam: build.mutation({
      query: (id) => ({
        url: `/university/tcc/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Teams', id }],
    }),
  }),
});

export const { 
  useGetTeamsQuery, 
  useGetTeamByIdQuery, 
  useGetTeamByStudentQuery, 
  useCreateTeamMutation, 
  useUpdateTeamMutation, 
  useDeleteTeamMutation 
} = teamApi;

