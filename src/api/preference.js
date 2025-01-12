import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryApi from './base-query';

export const preferenceApi = createApi({
  reducerPath: 'preferenceApi',
  tagTypes: ['Preference'],
  baseQuery: baseQueryApi,
  endpoints: (build) => ({
    getPreferences: build.query({
      query: () => '/cluster/preferencias-aluno',
      providesTags: ['Teams'],
    }),

    getPreferenceById: build.query({
      query: (id) => `/cluster/preferencias-aluno/${id}`,
      providesTags: (result, error, id) => [{ type: 'Teams', id }],
    }),

    createPreference: build.mutation({
      query: (payload) => ({
        url: '/cluster/preferencias-aluno',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Teams'],
    }),

    updatePreference: build.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/cluster/preferencias-aluno/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Teams', id }],
    }),

    deletePreference: build.mutation({
      query: (id) => ({
        url: `/cluster/preferencias-aluno/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Teams', id }],
    }),
  }),
});

export const {
  useGetPreferenceByIdQuery,
  useGetPreferencesQuery,
  useCreatePreferenceMutation,
  useUpdatePreferenceMutation,
  useDeletePreferenceMutation,
} = preferenceApi;