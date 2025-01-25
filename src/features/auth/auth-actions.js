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
      if (error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  async ({ email, newsenha }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendURL}/auth/reset-password`,
        { email, newsenha },
        config
      );

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
