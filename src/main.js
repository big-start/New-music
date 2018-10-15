require('normalize.css');
require('@/assets/styles/main.less');

import template from '@/templates/test.hbs';
import $ from "jquery";
import Api from '@/js/get.js';

let apiKey = process.env.API_KEY;
let api = new Api();
let allTrack = 'track.getTags&api_key=' + apiKey + '&artist=AC/DC&track=Hells+Bells&user=RJ&format=json';
let similarTrack = 'track.getsimilar&artist=cher&track=believe&api_key=' + apiKey + '&format=json';
let albumTop = 'album.gettoptags&artist=radiohead&album=the%20bends&api_key=' + apiKey + '&format=json';

$('#track').click(function() {
  api.get(allTrack);
});
$('#artist').click(function() {
  api.get(similarTrack);
});
$('#album').click(function() {
  api.get(albumTop);
});
