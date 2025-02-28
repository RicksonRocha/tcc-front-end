import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

// Recupera o objeto salvo no localStorage
const storedData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const currentUser = storedData && storedData.user ? storedData.user : null;

// Se o usuário for professor, define o path para o perfil de professor
const perfilPath = currentUser && currentUser.role === 'PROFESSOR' ? '/meu-perfil-professor' : '/my-profile';

const navConfig = [
  {
    title: 'Visão Geral',
    path: '/',
    icon: <Iconify icon="ic:round-dashboard" />,
    roles: ['ALUNO', 'PROFESSOR', 'ADMIN'],
  },
  {
    title: 'Meu Perfil',
    path: perfilPath,
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
