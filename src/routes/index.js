import  Router from '@/js/Router';
import tracksRoutes from './tracksRoutes';
import artistsRoutes from './artistsRoutes';

export default function createRouter() {
  return new Router({
    routes: [
      {
        path: '/',
        redirect: {path: '/app'}
      },
      {
        path: '/app',
        component: () => import('@/pages/appWrapper')
      },
      tracksRoutes,
      artistsRoutes,
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
