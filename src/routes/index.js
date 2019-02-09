import  Router from '@/js/Router';
// import bandRoutes from './bandRoutes';

export default function createRouter() {
  return new Router({
    routes: [
      {
        path: '/',
        redirect: {path: '/app'}
      },
      {
        path: '/app',
        component: () => import('@/pages/appWrapper'),
        children: [
          {
            path: '/author',
            component: () => import('@/pages/authorPage')
          },
          {
            path: '/band',
            component: () => import('@/pages/bandPage')
          }
        ]
      },
      // TODO separate route into files
      // bandRoutes,
      {
        path: '/errors',
        name: '500',
        component: () => import('@/pages/errors/500')
      },
      {
        path: '*',
        name: '404',
        component: () => import('@/pages/errors/404')
      }
    ]
  });
}
