require('normalize.css');
require('@/main.css');

import template from '@/templates/test.hbs';
import $ from "jquery";
import Api from '@/js/get.js';

let apiKey = '';
let allTrack = 'track.getTags' + apiKey + '&artist=AC/DC&track=Hells+Bells&user=RJ&format=json';
let similarTrack = 'track.getsimilar&artist=cher&track=believe' + apiKey + '&format=json';
let albumTop = 'album.gettoptags&artist=radiohead&album=the%20bends' + apiKey + '&format=json';
let api = new Api();

$('#track').click(function() {
  api.get(allTrack);
});
$('#artist').click(function() {
  api.get(similarTrack);
});
$('#album').click(function() {
  api.get(albumTop);
});
