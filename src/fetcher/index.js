import Api from '@/js/RequestApi';

const key = process.env.APP_API_KEY;
const api = new Api({
  apiKey: '&api_key=' + key,
  url: 'http://ws.audioscrobbler.com/2.0/?method=',
  format: '&format=json',
});

export default function () {

  this.allTrack = () => {
    return api.get('track.gettoptags&artist=radiohead&track=paranoid+android')
  };

  this.similarTrack = () => {
    return api.get('track.getsimilar&artist=cher&track=believe')
  };

  this.albumTop = () => {
    return api.get('album.gettoptags&artist=radiohead&album=the%20bends')
  };

}
