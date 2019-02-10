import Api from '@/js/RequestApi';

const key = process.env.API_KEY;
const LastFm = new Api({
  url: 'http://ws.audioscrobbler.com/2.0/',
  queryParams: {
    method: '',
    api_key: key,
    format: 'json'
  }
});

export default {
  // tops (for list pages)
  getTopTracks: (params) => {
    return LastFm.get('chart.gettoptracks', params);
  },
  getTopArtists: (params) => {
    return LastFm.get('chart.gettopartists', params);
  },
  getTopTags: (params) => {
    return LastFm.get('chart.gettoptags', params);
  },

  // track requests
  getTrackInfo: (params) => {
    return LastFm.get('track.getInfo', params);
  },

  // artist requests
  getArtistInfo: (params) => {
    return LastFm.get('artist.getinfo', params);
  }
};