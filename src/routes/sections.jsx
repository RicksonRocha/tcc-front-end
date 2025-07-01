import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import TeacherInitPage from 'src/pages/teacher-init-page';
import MyProfilePage from 'src/pages/my-profile';
import MyProfileProfessorPage from 'src/pages/my-profile-professor';
import MyTeamPage from 'src/pages/my-team-page';
import StudentPage from 'src/pages/student';
import TeacherPage from 'src/pages/teacher';
import SupportMaterialPage from 'src/pages/support-material';
import CrudUsersAdmPage from 'src/pages/crud-users-adm';
import { EventPage } from 'src/pages/event';
import EditTeamPage from 'src/pages/edit-team-page';
import { DashboardPage } from 'src/pages/dashboard';
import TccDetailPage from 'src/pages/tcc-detail-page';
import ProtectedRoute from './protected-route';

export const IndexPage = lazy(() => import('src/pages/app'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const ResetPasswordPage = lazy(() => import('src/pages/reset-password'));
export const TeamsPage = lazy(() => import('src/pages/teams'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

export const PreferenciasProfessorPage = lazy(() => import('src/pages/my-profile-professor'));

export const ResetPasswordRedefinationPage = lazy(() =>
  import('src/pages/reset-password-redefination')
);

export const NewTeamPage = lazy(() => import('src/pages/new-team'));

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
        { path: 'meu-perfil-professor', element: <MyProfileProfessorPage /> },
        { path: 'alunos', element: <StudentPage /> },
        { path: 'minha-equipe', element: <MyTeamPage /> },
        { path: 'minha-equipe/:teamId', element: <MyTeamPage /> },
        { path: 'equipes/nova', element: <NewTeamPage /> },
        { path: 'equipes/editar/:teamId', element: <EditTeamPage /> },
        { path: 'orientadores', element: <TeacherPage /> },
        { path: 'materiais-apoio', element: <SupportMaterialPage /> },
        { path: 'crud-users-adm', element: <CrudUsersAdmPage /> },
        { path: 'events', element: <EventPage /> },
        { path: 'init-page-teacher', element: <TeacherInitPage /> },
        { path: 'dashboard', element: <DashboardPage /> },
        {
          path: 'tcc/:teamId',
          element: <TccDetailPage />,
        },
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
    // {
    //   path: 'meu-perfil-professor',
    //   element: <PreferenciasProfessorPage />,
    // },
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
