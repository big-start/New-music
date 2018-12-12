require('normalize.css');
require('@/assets/styles/main.less');

import App from '@/js/App.js';
import $api from '@/fetcher';
import routes from '@/routes';

// external libraries
import $ from 'jquery';
import Handlebars from 'handlebars/dist/cjs/handlebars';

// init Application libs
const $router = routes();
const $root = document.getElementById('app');
const $libs = {$, Handlebars};

// create Application instance
function appInit () {
  return new App({
    $libs,
    $root,
    $router,
    $api
  });
}

export default appInit();
