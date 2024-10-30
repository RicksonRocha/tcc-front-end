import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');

  if (!token && !refreshToken) {
    return <Navigate to="/login" replace />; // Redireciona se não houver tokens
  }

  return <Outlet />; // Renderiza a rota se houver tokens
};

export default ProtectedRoute;
