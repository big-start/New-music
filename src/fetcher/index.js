import Api from '@/js/RequestApi';

const key = process.env.APP_API_KEY;
const LastFm = new Api({
  apiKey: '&api_key=' + key,
  url: 'http://ws.audioscrobbler.com/2.0/',
  method: '?method=',
  format: '&format=json',
});

export default  {
  allTrack: (options) => {
    const params = {
      method: 'track.',
      artist: '&artist=',
      track: '&track='
    };
    return LastFm.get(`${params.method}${options.get}${params.artist}${options.artist}${params.track}${options.track}`)
  },
  allArtis: (options) => {
    const params = {
      method: 'artist.',
      artist: '&artist=',
      user: '&user='
    };
    return LastFm.get(`${params.method}${options.get}${params.artist}${options.artist}`)
  },
  albumTop: (options) => {
    const params = {
      method: 'album.',
      artist: '&artist=',
      album: '&album='
    };
    return LastFm.get(`${params.method}${options.method}${params.artist}${options.artist}${params.album}${options.album}`)
  },
}
