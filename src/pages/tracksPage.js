import app from '@/main';
import topTracks from '@/templates/components/topTracks.hbs';

require('@/assets/styles/top-tracks.less');

export default () => {
  return app.createComponent({
    context: ({$, $router, $api}) => {
      $($router.routerLinkClass).on('click', function() {
        $router.push($(this).data('href'));
      });
      $api.getTopTracks().then((data) => {
        const tracksTmp = topTracks({title: 'Top tracks list', data});
        app.render({template: tracksTmp});
      });
    }
  });
};