import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryApi from './base-query';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: baseQueryApi,
  tagTypes: ['Notifications'],
  endpoints: (build) => ({
    // Criar uma nova notificação
    createNotification: build.mutation({
      query: (notification) => ({
        url: '/university/notifications',
        method: 'POST',
        body: notification,
      }),
      invalidatesTags: ['Notifications'],
    }),

    // Deletar uma notificação
    deleteNotification: build.mutation({
      query: (id) => ({
        url: `/university/notifications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notifications'],
    }),

    // Buscar notificações por usuário (receiverId)
    getUserNotifications: build.query({
      query: (userId) => `/university/notifications/user/${userId}`,
      providesTags: ['Notifications'],
    }),
    markAllNotificationsAsRead: build.mutation({
      query: (userId) => ({
        url: `/university/notifications/user/${userId}/read-all`,
        method: 'PUT',
      }),
      invalidatesTags: ['Notifications'],
    }),
    getUnreadNotificationCount: build.query({
      query: (userId) => `/university/notifications/user/${userId}/unread-count`,
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useDeleteNotificationMutation,
  useGetUserNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
  useGetUnreadNotificationCountQuery, useLazyGetUserNotificationsQuery
} = notificationApi;
