require('normalize.css');
// require('@/assets/styles/main.less');

import template from '@/templates/test.hbs';
import $ from "jquery";
import RequestApi from '@/js/RequestApi';
import  Router from "@/js/router.js";

let key = process.env.APP_API_KEY;
let apiKey = '&api_key=' + key;
let allTrack = 'track.getTags&api_key=' + apiKey + '&artist=AC/DC&track=Hells+Bells&user=RJ&format=json';
let similarTrack = 'track.getsimilar&artist=cher&track=believe&api_key=' + apiKey + '&format=json';
let albumTop = 'album.gettoptags&artist=radiohead&album=the%20bends&api_key=' + apiKey + '&format=json';
let api = new RequestApi();
let router = new Router();

$('#track').click(function(e) {
  e.preventDefault();
    api.get(allTrack);
    router.state(e);
});
$('#artist').click(function(e) {
    e.preventDefault();
    api.get(similarTrack);
    router.state(e);
});
$('#album').click(function(e) {
    e.preventDefault();
    api.get(albumTop);
    router.state(e);
});
