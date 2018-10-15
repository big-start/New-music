require('normalize.css');
// require('@/assets/styles/main.less');

import template from '@/templates/test.hbs';
import $ from "jquery"
import  Router from "@/js/router.js"
import Api from '@/js/get.js';

let key = process.env.APP_API_KEY;
let apiKey = '&api_key=' + key;
let format = '&format=json';
let GET = {
  artist: {
    getTags: 'artist.getTags&artist=Red%20Hot%20Chili%20Peppers&user=RJ' + apiKey + format,
    getCorrection: 'artist.getcorrection&artist=Guns%20and%20Roses' + apiKey + format,
    getInfo: 'artist.getinfo&artist=Cher' + apiKey + format,
    getSimilar: 'artist.getsimilar&artist=cher' + apiKey + format,
    getTopAlbums: 'artist.gettopalbums&artist=cher' + apiKey + format,
    getTopTags: 'artist.gettoptags&artist=cher' + apiKey + format,
    getTopTracks: 'artist.gettoptracks&artist=cher' + apiKey + format
  },
  album: {
    getInfo: 'artist.gettoptracks&artist=cher' + apiKey + format,
    getTags: 'album.gettags&artist=cher&album=believe' + apiKey + format,
    getTopTags: 'album.gettoptags&artist=radiohead&album=the%20bends' + apiKey + format
  },
  track: {
    getCorrection: 'track.getcorrection&artist=guns%20and%20roses&track=Mrbrownstone' + apiKey + format,
    getInfo: 'track.getInfo' + apiKey + '&artist=cher&track=believe' + format,
    getSimilar: 'track.getsimilar&artist=cher&track=believe' + apiKey + format,
    getTags: 'track.getTags' + apiKey + 'artist=AC/DC&track=Hells+Bells&user=RJ' + format,
    getTopTags: 'track.gettoptags&artist=radiohead&track=paranoid+android' + apiKey + format
  },
  chart: {
    getTopArtists: 'chart.gettopartists' + apiKey + format,
    getTopTags: 'chart.gettoptags' + apiKey + format,
    getTopTracks: 'chart.gettoptracks' + apiKey + format
  }
};

let api = new Api();
let router = new Router();

$('.menu a').click(function(e) {
  let href = e.target.getAttribute('href');
  e.preventDefault();
  router.state(e);
  if (href === 'artist') {
    api.get(GET.artist.getTags);
  }
  if (href === 'album') {
    api.get(GET.album.getTopTags);
  }
  if (href === 'track') {
    api.get(GET.track.getTopTags);
  }
  if (href === 'chart') {
    api.get(GET.chart.getTopTracks);
  }
});

window.onload = function (e) {
  let data =  e.target.location.pathname.slice(1);
  router.updatePage(data);
};
