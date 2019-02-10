import app from '@/main';
import template from '@/templates/test.hbs';

export default () => {
  return app.createComponent({
    template: template({name: 'world band page (example)!'}),
    context: ({$, $router, $api}) => {
      $('.j-router-link').on('click', function() {
        $router.push($(this).data('href'));
      });
      $api.getAlbumTop({artist: 'radiohead', album: 'the%20bends'}).then(() => {});
    }
  });
};
