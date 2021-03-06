import app from '@/main';
import template from '@/templates/appWrapper.hbs';
import topTags from '@/templates/components/topTags.hbs';

require('@/assets/styles/top-tags.less');

export default () => {
  return app.createComponent({
    /*
    * Template - handlebars template
    */
    template: template(),
    /*
    * Context - component JS code
    */
    context: ({$api}) => {
      $api.getTopTags().then((data) => {
        app.render({template: topTags({title: 'Top tags list', tags: data.tags.tag})});
      });
    }
  });
};
