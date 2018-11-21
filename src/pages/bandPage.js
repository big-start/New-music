import app from '@/main';
import template from '@/templates/test.hbs';

export default () => {
  return {
    template: template({name: 'world band page (example)!'}),
    context: () => {
      app.$api.getAlbumTop({artist: 'radiohead', album: 'the%20bends'}).then(() => {});
    }
  };
};
