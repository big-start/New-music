import app from '@/main';
import template from '@/templates/test.hbs';

export default () => {
  return app.createComponent({
    template: template({name: 'world band page (example)!'}),
    context: ({$}) => {
      $('.j-router-link').on('click', function() {
        app.$router.push($(this).data('href'));
      });
      app.$api.getAlbumTop({artist: 'radiohead', album: 'the%20bends'}).then(() => {});
    }
  });
};
