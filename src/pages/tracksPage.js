import app from '@/main';
import topTracks from '@/templates/components/topTracks.hbs';

export default () => {
  return app.createComponent({
    template: '',
    context: ({$, $router, $api}) => {
      $('.j-router-link').on('click', function() {
        $router.push($(this).data('href'));
      });
      $api.getTopTracks().then((data) => {
        console.log(data);
        const tracksTmp = topTracks({title: 'Top tracks list', data});
        app.render(tracksTmp);
      });
    }
  });
};