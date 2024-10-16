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
      localStorage.setItem('access_token', data.access_token);
      return data;
    } catch (error) {
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Endpoints base para a recuperação de senha
export const recoveryPassword = createAsyncThunk(
  'auth/reset-password',
  async ({ email }, { rejectWithValue }) => {
    try {
      await axios.post(`${backendURL}/auth/reset-password`, { email }, config);
    } catch (error) {
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Endpoint para definir uma nova senha com token
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      await axios.post(`${backendURL}/auth/reset-password`, { token, password }, config);
    } catch (error) {
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const preferenciasUserAluno = createAsyncThunk(
  'auth/preferencias-aluno',
  async ({ turno, linguagemProgramacao, bancoDeDados, nivelDeExperiencia, habilidadesPessoais, temasDeInteresse, disponibilidade, modalidadeTrabalho, frameworkFront}, { rejectWithValue }) => {
    try {
      await axios.post(`${backendURL}/auth/preferencias-aluno`, { turno, linguagemProgramacao, bancoDeDados, nivelDeExperiencia, habilidadesPessoais, temasDeInteresse, disponibilidade, modalidadeTrabalho, frameworkFront}, config);
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
  async ({ turno, disponivelOrientacao, linguagemProgramacao, disciplinasLecionadas, habilidadesPessoais, temasDeInteresse}, { rejectWithValue }) => {
    try {
      await axios.post(`${backendURL}/auth/preferencias-professor`, { turno, disponivelOrientacao, linguagemProgramacao, disciplinasLecionadas, habilidadesPessoais, temasDeInteresse }, config);
    } catch (error) {
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  }
);

