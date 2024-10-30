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
    title: 'Equipes',
    path: '/equipes',
    icon: <Iconify icon="ic:round-group" />, 
  },
  {
    title: 'Alunos',
    path: '/alunos',
    icon: <Iconify icon="ic:round-person" />, 
  },
  {
    title: 'Orientadores',
    path: '/orientadores',
    icon: <Iconify icon="ic:round-school" />, 
  },
  {
    title: 'Cronograma',
    path: '/404',
    icon: <Iconify icon="ic:round-calendar-today" />, 
  },
  {
    title: 'Materiais de Apoio',
    path: '/materiais-apoio',
    icon: <Iconify icon="ic:round-library-books" />, 
  },
  {
    title: 'Login',
    path: '/login',
    icon: <Iconify icon="ic:round-login" />, 
  },
];

export default navConfig;

