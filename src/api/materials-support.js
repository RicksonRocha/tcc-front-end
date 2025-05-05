import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryApi from './base-query';

export const supportMaterialApi = createApi({
  reducerPath: 'supportMaterialApi',
  tagTypes: ['SupportMaterials'],
  baseQuery: baseQueryApi,
  endpoints: (build) => ({
    // GET /api/university/support-material
    getAllMaterials: build.query({
      query: () => '/university/support-material',
      providesTags: ['SupportMaterials'],
    }),

    // GET /api/university/support-material/team/:teamId
    getMaterialsByTeamId: build.query({
      query: (teamId) => `/university/support-material/team/${teamId}`,
      providesTags: ['SupportMaterials'],
    }),

    // POST /api/university/support-material
    createMaterial: build.mutation({
      query: (newMaterial) => ({
        url: '/university/support-material',
        method: 'POST',
        body: newMaterial,
      }),
      invalidatesTags: ['SupportMaterials'],
    }),

    // PUT /api/university/support-material/:id
    updateMaterial: build.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/university/support-material/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: ['SupportMaterials'],
    }),

    // DELETE /api/university/support-material/:id
    deleteMaterial: build.mutation({
      query: (id) => ({
        url: `/university/support-material/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SupportMaterials'],
    }),
  }),
});

export const {
  useGetAllMaterialsQuery,
  useGetMaterialsByTeamIdQuery,
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
} = supportMaterialApi;
