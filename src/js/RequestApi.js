export default function (params) {
  let apiString = 'http://ws.audioscrobbler.com/2.0/?method=';

  this.get = function(params) {
    fetch(apiString + params)
      .then(res => res.json()).then(data => {
        return data
    })
      .catch(err => {
        console.log(err)
      })
  }
}
