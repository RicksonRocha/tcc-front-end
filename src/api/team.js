import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryApi from './base-query';

export const teamApi = createApi({
  reducerPath: 'teamApi',
  tagTypes: ['Teams'],
  baseQuery: baseQueryApi,
  endpoints: (build) => ({
    
    // Endpoint para obter todas as equipes
    getTeams: build.query({
      query: () => '/tcc', 
      providesTags: ['Teams'],
    }),

    // Endpoint para obter uma equipe específica por ID
    getTeamById: build.query({
      query: (id) => `/tcc/${id}`, 
      providesTags: (result, error, id) => [{ type: 'Teams', id }],
    }),

    // Endpoint para criar uma nova equipe
    createTeam: build.mutation({
      query: (newTeam) => ({
        url: '/tcc',
        method: 'POST',
        body: newTeam,
      }),
      invalidatesTags: ['Teams'],
    }),

    // Endpoint para atualizar uma equipe existente
    updateTeam: build.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/tcc/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Teams', id }],
    }),

    // Endpoint para deletar uma equipe
    deleteTeam: build.mutation({
      query: (id) => ({
        url: `/tcc/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Teams', id }],
    }),
  }),
});

export const { 
  useGetTeamsQuery, 
  useGetTeamByIdQuery, 
  useCreateTeamMutation, 
  useUpdateTeamMutation, 
  useDeleteTeamMutation 
} = teamApi;
