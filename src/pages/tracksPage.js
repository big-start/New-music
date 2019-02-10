import app from '@/main';
import template from '@/templates/appWrapper.hbs';
import topTracks from '@/templates/components/topTracks.hbs';

require('@/assets/styles/top-tracks.less');

export default () => {
  return app.createComponent({
    template: template({
      artists: window.location.pathname.indexOf('artists') !== -1,
      tracks: window.location.pathname.indexOf('tracks') !== -1
    }),
    context: ({$api}) => {
      $api.getTopTracks().then((data) => {
        const tracksTmp = topTracks({title: 'Top tracks list', data});
        app.render({template: tracksTmp});
      });
    }
  });
};