// use this as a proxy for our requests to the api,
// this will allow adding CORS headers, so we can access
// the response
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

export const getData = (url) => {
  return fetch(proxyUrl + url, { cache: 'force-cache' }).then((res) => res.json())
}
