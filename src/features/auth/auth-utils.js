import axios from 'axios';

const backendURL = import.meta.env.VITE_KEY_API;

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refresh_token');

  if (!refreshToken) {
    throw new Error('Sem refresh token disponível');
  }

  try {
    const { data } = await axios.post(`${backendURL}/auth/refresh`, {
      refresh_token: refreshToken,
    });

    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);

    return data.access_token;
  } catch (error) {
    console.error('Erro ao renovar token:', error);
    throw new Error('Falha ao renovar o token');
  }
}

// auth-utils.js
export function isTokenExpired(token) {
  if (!token) return true;

  try {
    const { exp } = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload JWT
    const now = Math.floor(Date.now() / 1000); // Tempo atual em segundos
    return exp < now; // Retorna true se o token expirou
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return true; // Considera expirado em caso de erro
  }
}
