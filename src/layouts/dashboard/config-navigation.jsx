import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Visão Geral',
    path: '/',
    icon: <Iconify icon="ic:round-dashboard" />,
    roles: ['ALUNO', 'PROFESSOR', 'ADMIN'],
  },
  {
    title: 'Meu Perfil',
    path: '/my-profile',
    icon: <Iconify icon="ic:round-account-circle" />,
    roles: ['ALUNO', 'PROFESSOR', 'ADMIN'],
  },
  {
    title: 'Equipes',
    path: '/equipes',
    icon: <Iconify icon="ic:round-group" />,
    roles: ['ALUNO', 'PROFESSOR', 'ADMIN'],
  },
  {
    title: 'Alunos',
    path: '/alunos',
    icon: <Iconify icon="ic:round-person" />,
    roles: ['ALUNO', 'PROFESSOR', 'ADMIN'],
  },
  {
    title: 'Orientadores',
    icon: <Iconify icon="ic:round-school" />,
    path: '/orientadores',
    roles: ['ALUNO', 'ADMIN'],
  },
  {
    title: 'Cronograma',
    path: '/events',
    icon: <Iconify icon="ic:round-calendar-today" />,
    roles: ['ALUNO', 'ADMIN'],
  },
  {
    title: 'Materiais de Apoio',
    path: '/materiais-apoio',
    icon: <Iconify icon="ic:round-library-books" />,
    roles: ['ALUNO', 'ADMIN'],
  },
];

export default navConfig;
