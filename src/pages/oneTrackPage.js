import app from '@/main';
import template from '@/templates/appWrapper.hbs';
import trackInfo from '@/templates/components/track/trackInfo.hbs';

require('@/assets/styles/top-tags.less');
require('@/assets/styles/track.less');

export default () => {
  return app.createComponent({
    template: template(),
    context: ({$router, $api}) => {
      $api.getTrackInfo($router.route.query).then((data) => {
        app.render({template: trackInfo({
          track: data.track,
          tags: data.track.toptags.tag
        })});
      });
    }
  });
};