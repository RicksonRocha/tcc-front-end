import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import MyProfilePage from 'src/pages/my-profile';
import MyTeamPage from 'src/pages/my-team-page';
import PreferenciasAlunoPage from 'src/pages/preferencias-aluno';
import StudentPage from 'src/pages/student';
import TeacherPage from 'src/pages/teacher';
import SupportMaterialPage from 'src/pages/support-material';
import ProtectedRoute from './protected-route';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const ResetPasswordPage = lazy(() => import('src/pages/reset-password'));
export const TeamsPage = lazy(() => import('src/pages/teams'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

export const PreferenciasProfessorPage = lazy(() => import('src/pages/preferencias-professor'));

export const ResetPasswordRedefinationPage = lazy(() =>
  import('src/pages/reset-password-redefination')
);

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'equipes', element: <TeamsPage /> },
        { path: 'my-profile', element: <MyProfilePage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'alunos', element: <StudentPage /> },
        { path: 'minha-equipe', element: <MyTeamPage /> },
        { path: 'orientadores', element: <TeacherPage /> },
        { path: 'materiais-apoio', element: <SupportMaterialPage /> },
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
      path: 'forgot-password',
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
    {
      path: 'reset-password',
      element: <ResetPasswordRedefinationPage />,
    },
  ]);

  return routes;
}
