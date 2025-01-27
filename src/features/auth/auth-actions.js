import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const backendURL = import.meta.env.VITE_KEY_API;
const config = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      await axios.post(`${backendURL}/auth/register`, { name, email, password, role }, config);
    } catch (error) {
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${backendURL}/auth/login`, { email, password }, config);
      return data;
    } catch (error) {
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);

// // Endpoints base para a recuperação de senha
// export const recoveryPassword = createAsyncThunk(
//   'auth/reset-password',
//   async ({ email }, { rejectWithValue }) => {
//     try {
//       await axios.post(`${backendURL}/auth/reset-password`, { email }, config);
//     } catch (error) {
//       if (error.response.data.error) {
//         return rejectWithValue(error.response.data.error);
//       }
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Endpoint para definir uma nova senha com token
// export const resetPassword = createAsyncThunk(
//   'auth/resetPassword',
//   async ({ token, password }, { rejectWithValue }) => {
//     try {
//       await axios.post(`${backendURL}/auth/reset-password`, { token, password }, config);
//     } catch (error) {
//       if (error.response.data.error) {
//         return rejectWithValue(error.response.data.error);
//       }
//       return rejectWithValue(error.message);
//     }
//   }
// );

// Thunk para enviar solicitação de recuperação de senha
export const resetPassword = createAsyncThunk(
  '/auth/resetPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      // Faz a requisição para o endpoint forgot-password
      const response = await axios.post(
        `${backendURL}/auth/forgot-password`,
        { email } // Enviando apenas o email conforme esperado pelo backend
      );

      // Se a requisição for bem-sucedida, retorne a resposta
      return response.data;
    } catch (error) {
      // Tratamento de erro e rejeição com mensagem específica do backend ou mensagem padrão
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.error || 'Erro ao solicitar redefinição de senha.'
        );
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  'auth/updatePassword', // Identificador do thunk
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      // Faz a requisição para o endpoint de atualização de senha
      const response = await axios.post(
        `${backendURL}/auth/reset-password`, // Endpoint do backend
        { token, newPassword }, // Corpo da requisição (dados esperados pelo backend)
        config // Configuração do cabeçalho HTTP
      );

      // Retorna os dados da resposta se a operação for bem-sucedida
      return response.data;
    } catch (error) {
      // Tratamento de erro e rejeição com mensagem específica do backend ou mensagem genérica
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error || 'Erro ao redefinir a senha.');
      }
      return rejectWithValue(error.message);
    }
  }
);

export const preferenciasUserAluno = createAsyncThunk(
  'auth/preferencias-aluno',
  async (
    {
      turno,
      linguagemProgramacao,
      bancoDeDados,
      nivelDeExperiencia,
      habilidadesPessoais,
      temasDeInteresse,
      disponibilidade,
      modalidadeTrabalho,
      frameworkFront,
    },
    { rejectWithValue }
  ) => {
    try {
      await axios.post(
        `${backendURL}/auth/preferencias-aluno`,
        {
          turno,
          linguagemProgramacao,
          bancoDeDados,
          nivelDeExperiencia,
          habilidadesPessoais,
          temasDeInteresse,
          disponibilidade,
          modalidadeTrabalho,
          frameworkFront,
        },
        config
      );
    } catch (error) {
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const preferenciasUserProfessor = createAsyncThunk(
  'auth/preferencias-professor',
  async (
    {
      turno,
      disponivelOrientacao,
      linguagemProgramacao,
      disciplinasLecionadas,
      habilidadesPessoais,
      temasDeInteresse,
      disponibilidade,
      modalidadeTrabalho,
    },
    { rejectWithValue }
  ) => {
    try {
      await axios.post(
        `${backendURL}/auth/preferencias-professor`,
        {
          turno,
          disponivelOrientacao,
          linguagemProgramacao,
          disciplinasLecionadas,
          habilidadesPessoais,
          temasDeInteresse,
          disponibilidade,
          modalidadeTrabalho,
        },
        config
      );
    } catch (error) {
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);
