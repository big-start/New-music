require('normalize.css');
require('@/assets/styles/main.less');

import App from '@/js/App';
import RequestApi from '@/js/RequestApi';
import routes from '@/routes';
import jQuery from 'jquery';
import Handlebars from 'handlebars/dist/cjs/handlebars';

const $router = routes();
const $root = document.getElementById('app');
const $api = new RequestApi();
const $lib = {jQuery, Handlebars};

const key = process.env.APP_API_KEY;
const apiKey = '&api_key=' + key;
const allTrack = 'track.getTags&api_key=' + apiKey + '&artist=AC/DC&track=Hells+Bells&user=RJ&format=json';
const similarTrack = 'track.getsimilar&artist=cher&track=believe&api_key=' + apiKey + '&format=json';
const albumTop = 'album.gettoptags&artist=radiohead&album=the%20bends&api_key=' + apiKey + '&format=json';

function appInit () {
  return new App({
    $lib,
    $root,
    $router,
    $api,
  });
}

export default appInit();
