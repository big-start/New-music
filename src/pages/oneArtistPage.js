import app from '@/main';
import template from '@/templates/appWrapper.hbs';
import artistInfo from '@/templates/components/artist/artistInfo.hbs';

require('@/assets/styles/albums.less');
require('@/assets/styles/top-tags.less');
require('@/assets/styles/top-artists.less');
require('@/assets/styles/artist.less');

export default () => {
  return app.createComponent({
    template: template(),
    context: ({$router, $api}) => {
      const promisArr = [
        $api.getArtistInfo($router.route.query),
        $api.getArtistAlbums($router.route.query)
      ];
      Promise.all(promisArr).then((data) => {
        const artist = data[0].artist;
        const albums = data[1].topalbums;
        app.render({template: artistInfo({
          artists: artist.similar.artist,
          artist: artist,
          tags: artist.tags.tag,
          albums: albums.album
        })});
      });
    }
  });
};