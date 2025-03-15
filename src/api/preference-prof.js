import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryApi from './base-query';

export const professorPreferenceApi = createApi({
  reducerPath: 'professorPreferenceApi',
  tagTypes: ['ProfessorPreference'],
  baseQuery: baseQueryApi,
  endpoints: (build) => ({
    getProfessorPreferences: build.query({
      query: () => '/cluster/preferencias-professor',
      providesTags: ['ProfessorPreference'],
    }),
    getProfessorPreferenceById: build.query({
      query: (id) => `/cluster/preferencias-professor/${id}`,
      providesTags: (result, error, id) => [{ type: 'ProfessorPreference', id }],
    }),
    createProfessorPreference: build.mutation({
      query: (payload) => ({
        url: '/cluster/preferencias-professor',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['ProfessorPreference'],
    }),
    updateProfessorPreference: build.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/cluster/preferencias-professor/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'ProfessorPreference', id }],
    }),
    deleteProfessorPreference: build.mutation({
      query: (id) => ({
        url: `/cluster/preferencias-professor/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'ProfessorPreference', id }],
    }),
  }),
});

export const {
  useGetProfessorPreferencesQuery,
  useGetProfessorPreferenceByIdQuery,
  useCreateProfessorPreferenceMutation,
  useUpdateProfessorPreferenceMutation,
  useDeleteProfessorPreferenceMutation,
} = professorPreferenceApi;
