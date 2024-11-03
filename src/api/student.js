import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryApi from './base-query';

export const studentApi = createApi({
  reducerPath: 'studentApi',
  tagTypes: ['Students'],
  baseQuery: baseQueryApi,
  endpoints: (build) => ({
    
    // Endpoint para obter todos os alunos
    getStudents: build.query({
      query: () => '/university/student', 
      providesTags: ['Students'],
    }),

    // Endpoint para obter um aluno específico por ID
    getStudentById: build.query({
      query: (id) => `/university/student/${id}`, 
      providesTags: (result, error, id) => [{ type: 'Students', id }],
    }),
  }),
});

export const { useGetStudentsQuery, useGetStudentByIdQuery } = studentApi;
