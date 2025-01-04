import axios from 'axios';
import { isTokenExpired, refreshAccessToken } from 'src/features/auth/auth-utils';

const api = axios.create({
  baseURL: import.meta.env.VITE_KEY_API,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor para verificar o token antes de cada requisição
api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('token');

  if (isTokenExpired(token)) {
    try {
      token = await refreshAccessToken(); // Atualiza o token se expirado
    } catch (error) {
      localStorage.clear(); // Limpa storage e força logout
      window.location.href = '/login'; // Redireciona para login
      throw error;
    }
  }

  config.headers.Authorization = `Bearer ${token}`; // Adiciona o token atualizado
  return config;
});

export default api;
