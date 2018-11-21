import app from '@/main';
import template from '@/templates/test.hbs';

export default () => {
  return {
    template: template({name: 'world author page (example)!'}),
    context: () => {
      app.$api.getAllArtis({artist: 'cher'}).then(() => {});
    }
  };
};
