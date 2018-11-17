export default function (options) {
  this.get = function(method, params) {
    const string = generateRequest({method, params, options});

    return fetch(string)
      .then(res => res.json()).then(data => {
        return data;
      })
      .catch(err => {
        // eslint-disable-next-line
        console.log(err);
      });
  };
}

function generateRequest(data) {
  const queryString = [];
  const queryParams = data.options.queryParams;
  const dataParams = data.params;

  for (let key in queryParams) {
    const value = key === 'method' ? data.method : queryParams[key];
    queryString.push(`${key}=${value}`);
  }

  for (let key in dataParams) {
    queryString.push(`${key}=${dataParams[key]}`);
  }

  return `${data.options.url}?${queryString.join('&')}`;
}
