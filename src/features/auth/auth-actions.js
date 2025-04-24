import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const backendURL = import.meta.env.VITE_KEY_API;
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backendURL}/auth/register`,
        { name, email, password, role },
        config
      );
      return data; // Retorna os dados do usuário registrado
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Erro ao cadastrar usuário.');
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${backendURL}/auth/login`, { email, password }, config);

      // Salva os tokens e os dados do usuário no localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data)); // Persistindo os dados do usuário

      return data;
    } catch (error) {
      if (error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendURL}/auth/forgot-password`, { email }, config);

      // Se a requisição for bem-sucedida, retorne a resposta
      return response.data;
    } catch (error) {
      // Tratamento de erro e rejeição com mensagem específica do backend ou mensagem padrão
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error || 'Erro ao redefinir a senha.');
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

export const preferenciasUserProfessor = createAsyncThunk(
  'auth/professor-preferences',
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
        `${backendURL}/auth/professor-preferences`,
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
