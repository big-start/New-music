import $ from 'jquery';
import app from '@/main';
import template from '@/templates/test.hbs';

export default () => {
  const routerView = document.querySelector('.j-router-view');
  
  routerView.innerHTML = template({name: 'world track page (example)!'});
  
  $('.j-router-link').on('click', function() {
    app.$router.push({path: $(this).data('href')});
  });
}