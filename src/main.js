require('normalize.css');
require('@/assets/styles/main.less');

import App from '@/js/App';
import routes from '@/routes';
import jQuery from 'jquery';
import Handlebars from 'handlebars/dist/cjs/handlebars';

const $router = routes();
const $root = document.getElementById('app');
const $lib = {jQuery, Handlebars};

function appInit () {
  return new App({
    $lib,
    $root,
    $router,
  });
}

export default appInit();
