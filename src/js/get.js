function Api(a) {
  let apiString = 'http://ws.audioscrobbler.com/2.0/?method=';

  this.get = function(a) {
    fetch(apiString + a)
      .then(res => res.json()).then(data => {
      return data
    })
      .catch(err => {
        console.log(err)
      })
  }
}

export default Api;
