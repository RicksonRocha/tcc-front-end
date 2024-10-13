import Iconify from 'src/components/iconify'; 

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Visão Geral',
    path: '/',
    icon: <Iconify icon="ic:round-dashboard" />, 
  },
  {
    title: 'Meu Perfil',
    path: '/preferencias-aluno',
    icon: <Iconify icon="ic:round-account-circle" />, 
  },
  {
    title: 'Equipes/Alunos',
    path: '/equipes',
    icon: <Iconify icon="ic:round-group" />, 
  },
  {
    title: 'Orientadores',
    path: '/blog',
    icon: <Iconify icon="ic:round-school" />, 
  },
  {
    title: 'Cronograma',
    path: '/404',
    icon: <Iconify icon="ic:round-calendar-today" />, 
  },
  {
    title: 'Materiais de Apoio',
    path: '/404',
    icon: <Iconify icon="ic:round-library-books" />, 
  },
  {
    title: 'Login',
    path: '/login',
    icon: <Iconify icon="ic:round-login" />, 
  },
];

export default navConfig;

