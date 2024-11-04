import { Outlet, Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/dashboard';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!token && !refreshToken) {
    return <Navigate to="/login" replace />; // Redireciona se não houver tokens
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default ProtectedRoute;
