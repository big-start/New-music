export default {
  path: '/tracks',
  component: () => import('@/pages/tracksPage'),
  children: [
    {
      path: '/track',
      component: () => import('@/pages/oneTrackPage')
    }
  ]
};
