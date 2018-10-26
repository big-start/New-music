export default function (params) {
  this.get = function(params) {
    return fetch(params)
             .then(res => res.json()).then(data => {
              return data
           })
             .catch(err => {
               console.log(err)
             })
  }
}
