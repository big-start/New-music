import app from '@/main';
import template from '@/templates/appWrapper.hbs';
import topTags from '@/templates/components/topTags.hbs';
import trackInfo from '@/templates/components/track/trackInfo.hbs';

require('@/assets/styles/top-tags.less');
require('@/assets/styles/track.less');

export default () => {
  return app.createComponent({
    template: template(),
    context: ({$, $router, $api, Handlebars}) => {
      $($router.routerLinkClass).on('click', function() {
        $router.push($(this).data('href'));
      });
      $api.getTrackInfo($router.route.query).then((data) => {
        Handlebars.registerPartial('topTags', topTags);
        app.render({template: trackInfo({track: data.track, tags: data.track.toptags.tag})});
      });
    }
  });
};