import app from '@/main';
import template from '@/templates/appWrapper.hbs';
import artistInfo from '@/templates/components/artist/artistInfo.hbs';

require('@/assets/styles/top-tags.less');
require('@/assets/styles/top-artists.less');
require('@/assets/styles/artist.less');

export default () => {
  return app.createComponent({
    template: template(),
    context: ({$router, $api}) => {
      $api.getArtistInfo($router.route.query).then((data) => {
        app.render({template: artistInfo({
          artists: data.artist.similar.artist,
          artist: data.artist,
          tags: data.artist.tags.tag
        })});
      });
    }
  });
};