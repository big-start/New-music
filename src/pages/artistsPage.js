import app from '@/main';
import topArtists from '@/templates/components/topArtists.hbs';

require('@/assets/styles/top-artists.less');

export default () => {
  return app.createComponent({
    context: ({$, $router, $api}) => {
      $($router.routerLinkClass).on('click', function() {
        $router.push($(this).data('href'));
      });
      $api.getTopArtists().then((data) => {
        const artistsTmp = topArtists({title: 'Top artists list', data});
        app.render({template: artistsTmp});
      });
    }
  });
};