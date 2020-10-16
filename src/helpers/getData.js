// use this as a proxy for our requests to the api,
// this will allow adding CORS headers, so we can access
// the response
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

export const getData = async (url) => {
  const response = await fetch(proxyUrl + url, { cache: 'force-cache' })
  const result = await response.json()
  const data = await result.data
  return data
}
