import app from '@/main';
import template from '@/templates/appWrapper.hbs';
import topTags from '@/templates/components/topTags.hbs';

require('@/assets/styles/tags.less');

export default () => {
  return app.createComponent({
    /*
    * Template - handlebars template
    */
    template: template(),
    /*
    * Context - component JS code
    */
    context: ({$, $router, $api}) => {
      $('.j-router-link').on('click', function() {
        $router.push($(this).data('href'));
      });
      $api.getTopTags().then((data) => {
        const tagsTmp = topTags({title: 'Top tags list', data});
        app.render(tagsTmp);
      });
    }
  });
};
