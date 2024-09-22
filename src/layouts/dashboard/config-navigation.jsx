import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/',
  //   icon: icon('ic_analytics'),
  // },
  // {
  //   title: 'user',
  //   path: '/user',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'product',
  //   path: '/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  {
    title: 'Início',
    path: '/',
    icon: icon('ic_user'),
  },
  {
    title: 'Cronograma',
    path: '/schedule',
    icon: icon('ic_calendar'),
  },
  {
    title: 'Equipes',
    path: '/team',
    icon: icon('ic_team'),
  },
  {
    title: 'Orientadores',
    path: '/advisor',
    icon: icon('ic_teacher'),
  },
  {
    title: 'Materiais de apoio',
    path: '/study-material',
    icon: icon('ic_books'),
  },

  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
