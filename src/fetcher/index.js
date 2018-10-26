import Api from '@/js/RequestApi';

const api = new Api();
const key = process.env.APP_API_KEY;
const apiKey = '&api_key=' + key;
const apiString = 'http://ws.audioscrobbler.com/2.0/?method=';
const format = '&format=json';

export const lastFm = ({
  allTrack: apiString + 'track.getTags&api_key=' + apiKey + '&artist=AC/DC&track=Hells+Bells&user=RJ' + format,
  similarTrack: apiString + 'track.getsimilar&artist=cher&track=believe&api_key=' + apiKey + format,
  albumTop: apiString + 'album.gettoptags&artist=radiohead&album=the%20bends&api_key=' + apiKey + format
});

export default function (params) {
   return api.get(params);
}
