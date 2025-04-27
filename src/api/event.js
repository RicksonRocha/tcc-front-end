import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryApi from './base-query';

const ENDPOINT = `/university/event`;

export const eventApi = createApi({
  reducerPath: 'eventApi',
  tagTypes: ['Events'],
  baseQuery: baseQueryApi,
  endpoints: (build) => ({
    getEvents: build.query({
      query: (teamId) => `${ENDPOINT}/${teamId}`,
      providesTags: ['Events'],
    }),

    getEventById: build.query({
      query: (id) => `${ENDPOINT}/${id}`,
      providesTags: (result, error, id) => [{ type: 'Events', id }],
    }),

    createEvent: build.mutation({
      query: (newEvent) => ({
        url: ENDPOINT,
        method: 'POST',
        body: newEvent,
      }),
      invalidatesTags: ['Events'],
    }),

    updateEvent: build.mutation({
      query: ({ id, payload }) => ({
        url: `${ENDPOINT}/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Events', id }],
    }),

    deleteEvent: build.mutation({
      query: (id) => ({
        url: `${ENDPOINT}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Events', id }],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useGetEventByStudentQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;
