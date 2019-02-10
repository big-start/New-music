import app from '@/main';
import template from '@/templates/appWrapper.hbs';
import topArtists from '@/templates/components/topArtists.hbs';

require('@/assets/styles/top-artists.less');

export default () => {
  return app.createComponent({
    template: template({
      artists: window.location.pathname.indexOf('artists') !== -1,
      tracks: window.location.pathname.indexOf('tracks') !== -1
    }),
    context: ({$, $router, $api}) => {
      $($router.routerLinkClass).on('click', function() {
        $router.push($(this).data('href'));
      });
      $api.getTopArtists().then((data) => {
        const artistsTmp = topArtists({title: 'Top artists list', artists: data.artists.artist});
        app.render({template: artistsTmp});
      });
    }
  });
};