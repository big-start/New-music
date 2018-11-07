import Api from '@/js/RequestApi';

const key = process.env.APP_API_KEY;
const LastFm = new Api({
  url: 'http://ws.audioscrobbler.com/2.0/',
  queryParams: {
    method: '',
    api_key: key,
    format: 'json'
  }
});

export default {
  getAllTrack: (params) => {
    return LastFm.get('track.gettoptags', params);
  },
  getAllArtis: (params) => {
    return LastFm.get('artist.gettopalbums', params);
  },
  getAlbumTop: (params) => {
    return LastFm.get('album.gettoptags', params);
  },
}