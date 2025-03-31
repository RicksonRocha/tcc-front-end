import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryApi from './base-query';

export const requestEntryTccApi = createApi({
  reducerPath: 'requestEntryTccApi',
  baseQuery: baseQueryApi,
  tagTypes: ['RequestEntries'],
  endpoints: (build) => ({
    // Criar nova solicitação de entrada
    createRequestEntry: build.mutation({
      query: (entryData) => ({
        url: '/university/request-entry',
        method: 'POST',
        body: entryData,
      }),
      invalidatesTags: ['RequestEntries'],
    }),

    // Buscar solicitações por owner (dono da equipe)
    getRequestsByOwner: build.query({
      query: (ownerId) => `/university/request-entry/owner/${ownerId}`,
      providesTags: ['RequestEntries'],
    }),

    // Aceitar solicitação
    acceptRequestEntry: build.mutation({
      query: (id) => ({
        url: `/university/request-entry/${id}/accept`,
        method: 'POST',
      }),
      invalidatesTags: ['RequestEntries'],
    }),

    // Rejeitar solicitação
    rejectRequestEntry: build.mutation({
      query: (id) => ({
        url: `/university/request-entry/${id}/reject`,
        method: 'POST',
      }),
      invalidatesTags: ['RequestEntries'],
    }),

    // Deletar solicitação
    deleteRequestEntry: build.mutation({
      query: (id) => ({
        url: `/university/request-entry/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['RequestEntries'],
    }),
  }),
});

export const {
  useCreateRequestEntryMutation,
  useGetRequestsByOwnerQuery,
  useAcceptRequestEntryMutation,
  useRejectRequestEntryMutation,
  useDeleteRequestEntryMutation,
} = requestEntryTccApi;
