export const saveTokens = (token, refreshToken) => {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

export const getTokens = () => ({
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
});
