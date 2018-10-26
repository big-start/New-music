require('normalize.css');
require('@/assets/styles/main.less');

import App from '@/js/App.js';
import routes from '@/routes';
import jQuery from 'jquery';
import Handlebars from 'handlebars/dist/cjs/handlebars';
import {lastFm} from "./fetcher";
import fetcher from '@/fetcher';

const $router = routes();
const $root = document.getElementById('app');
const $lib = {jQuery, Handlebars};


function appInit () {
  return new App({
    $lib,
    $root,
    $router,
    lastFm,
    fetcher,
  });
}

export default appInit();
