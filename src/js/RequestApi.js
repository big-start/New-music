export default function (options) {
  this.get = function(request) {
    return fetch(`${options.url}${request}${options.apiKey}${options.format}`)
             .then(res => res.json()).then(data => {
              return data
           })
             .catch(err => {
               console.log(err)
             })
  }
}
