import $ from 'jquery';
import app from '@/main';
import template from '@/templates/mainPage.hbs';

export default () => {
  return {
    /*
    * Template - handlebars template
    */
    template: template({name: 'world main page (example)!'}),
    /*
    * Context - component JS code
    */
    context: () => {
      $('.j-router-link').on('click', function() {
        app.$router.push($(this).data('href'));
      });
    }
  };
};
