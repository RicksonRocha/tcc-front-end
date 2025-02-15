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
    path: '/my-profile',
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
    icon: <Iconify icon="ic:round-school" />,
    path: '/orientadores',
  },
  {
    title: 'Cronograma',
    path: '/events',
    icon: <Iconify icon="ic:round-calendar-today" />,
  },
  {
    title: 'Materiais de Apoio',
    path: '/materiais-apoio',
    icon: <Iconify icon="ic:round-library-books" />,
  },
];

export default navConfig;
