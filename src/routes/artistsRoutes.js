export default {
  path: '/artists',
  component: () => import('@/pages/artistsPage'),
  children: [
    {
      path: '/artist',
      component: () => import('@/pages/oneArtistPage')
    }
  ]
};
