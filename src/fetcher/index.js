import api from '@/js/RequestApi';

const key = process.env.APP_API_KEY;
const apiKey = '&api_key=' + key;
const lastFm = new api({
  apiString: 'http://ws.audioscrobbler.com/2.0/?method=',
  format: '&format=json',
  allTrack: 'track.getTags&api_key=' + apiKey + '&artist=AC/DC&track=Hells+Bells&user=RJ&format=json',
  similarTrack: 'track.getsimilar&artist=cher&track=believe&api_key=' + apiKey + '&format=json',
  albumTop: 'album.gettoptags&artist=radiohead&album=the%20bends&api_key=' + apiKey + '&format=json'
});


// function getgetBands(params) {}
// app.get(lastFm);