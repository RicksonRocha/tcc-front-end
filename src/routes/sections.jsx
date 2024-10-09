import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import { userLogin } from 'src/features/auth/auth-actions';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const ResetPasswordPage = lazy(() => import('src/pages/reset-password'));
export const PreferenciasAlunoPage = lazy(() => import('src/pages/preferencias-aluno'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const PreferenciasProfessorPage = lazy(() => import('src/pages/preferencias-professor'));
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([

    // Rota de redirecionamento para login ao acessar a raiz
    { path: '/', element: userLogin ? <IndexPage /> : <Navigate to="/login" /> },

    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true }, // Rota para o componente Index
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: 'reset-password',
      element: <ResetPasswordPage />,
    },
    {
      path: 'preferencias-aluno',
      element: <PreferenciasAlunoPage />,
    },
    {
      path: 'preferencias-professor',
      element: <PreferenciasProfessorPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
