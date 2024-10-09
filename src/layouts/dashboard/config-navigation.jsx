import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'visão geral',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'meu perfil',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'equipes',
    path: '/products',
    icon: icon('ic_user'),
  },
  {
    title: 'orientadores',
    path: '/blog',
    icon: icon('ic_user'),
  },
  {
    title: 'cronograma',
    path: '/404',
    icon: icon('ic_user'),
  },
  {
    title: 'maperiais de apoio',
    path: '/404',
    icon: icon('ic_user'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_user'),
  },
];

export default navConfig;
