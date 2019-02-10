import app from '@/main';
import template from '@/templates/appWrapper.hbs';
import topTags from '@/templates/components/topTags.hbs';

require('@/assets/styles/top-tags.less');

export default () => {
  return app.createComponent({
    /*
    * Template - handlebars template
    */
    template: template({
      artists: window.location.pathname.indexOf('artists') !== -1,
      tracks: window.location.pathname.indexOf('tracks') !== -1
    }),
    /*
    * Context - component JS code
    */
    context: ({$, $router, $api}) => {
      $($router.routerLinkClass).on('click', function() {
        $router.push($(this).data('href'));
      });
      $api.getTopTags().then((data) => {
        const tagsTmp = topTags({title: 'Top tags list', tags: data.tags.tag});
        app.render({template: tagsTmp});
      });
    }
  });
};
