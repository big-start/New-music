import $ from 'jquery';
import app from '@/main';
import template from '@/templates/mainPage.hbs';

export default () => {
  return {
    template: template({name: 'world main page (example)!'}),
    context: () => {
      console.log('main');
      $('.j-router-link').on('click', function() {
        app.$router.push({path: $(this).data('href')});
      });
    }
  };
}