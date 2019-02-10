import app from '@/main';
import topArtists from '@/templates/components/topArtists.hbs';

export default () => {
  return app.createComponent({
    template: '',
    context: ({$, $router, $api}) => {
      $('.j-router-link').on('click', function() {
        $router.push($(this).data('href'));
      });
      $api.getTopArtists().then((data) => {
        console.log(data);
        const artistsTmp = topArtists({title: 'Top artists list', data});
        app.render(artistsTmp);
      });
    }
  });
};