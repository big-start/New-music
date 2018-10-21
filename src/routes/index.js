import  Router from '@/js/Router';
// import bandRoutes from './bandRoutes';

export default function createRouter() {
  return new Router({
    routes: [
      {
        path: '/',
        redirect: {path: '/main'}
      },
      {
        path: '/main',
        name: 'MainPage',
        component: () => import('@/pages/mainPage'),
        children: [
          {
            path: '/author',
            name: 'AuthorPage',
            component: () => import('@/pages/authorPage')
          },
          {
            path: '/band',
            name: 'BandPage',
            component: () => import('@/pages/bandPage')
          },
        ]
      },
      {
        path: '/track',
        name: 'TrackPage',
        component: () => import('@/pages/trackPage')
      },
      // bandRoutes,
      // {
      //   path: '/errors',
      //   name: '500',
      //   component: () => import('@/pages/errors/500')
      // },
      // {
      //   path: '*',
      //   name: '404',
      //   component: () => import('@/pages/errors/404')
      // }
    ]
  });
}
