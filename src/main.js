require('normalize.css');
require('@/assets/styles/main.less');

import $ from "jquery";
import App from '@/js/App';
import RequestApi from '@/js/RequestApi';
import routes from '@/routes';

const $router = routes();
const $root = document.getElementById('app');
const $api = new RequestApi();

const key = process.env.APP_API_KEY;
const apiKey = '&api_key=' + key;
const allTrack = 'track.getTags&api_key=' + apiKey + '&artist=AC/DC&track=Hells+Bells&user=RJ&format=json';
const similarTrack = 'track.getsimilar&artist=cher&track=believe&api_key=' + apiKey + '&format=json';
const albumTop = 'album.gettoptags&artist=radiohead&album=the%20bends&api_key=' + apiKey + '&format=json';

function appInit () {
  return new App({
    $root,
    $router,
    $api,
  });
}

const app = appInit();
export default app;
