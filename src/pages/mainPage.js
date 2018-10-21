import $ from 'jquery';
import app from '@/main';
import template from '@/templates/mainPage.hbs';

export default () => {
  const routerView = document.querySelector('.j-router-view');
  routerView.innerHTML = template({name: 'world main page (example)!'});
  
  $('.j-router-link').on('click', function() {
    app.$router.push({path: $(this).data('href')});
  });
}