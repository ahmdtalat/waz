import React, { useState, useEffect } from 'react'

const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const countriesUrl = 'http://46.101.108.59/api/countries'

const CountryContext = React.createContext()
CountryContext.displayName = 'Country Context'

function CountryProvider({ children }) {
  const [data, setData] = useState({
    country: '',
    city: '',
    area: ''
  })
  const [countries, setCountries] = useState(null)
  const [cities, setCities] = useState(null)
  const [areas, setAreas] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})

  const handleCountryChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    // get countries
    fetch(proxyUrl + countriesUrl, { cache: 'force-cache' })
      .then((response) => response.json())
      .then((result) => setCountries(result.data))
      .catch((e) => console.error(e))
  }, [])

  useEffect(() => {
    // get cities
    if (data.country) {
      setLoading(true)
      setData({ ...data, city: '', area: '' })
      const { id } = countries.find((c) => c.attributes.name === data.country)

      fetch(proxyUrl + `http://46.101.108.59/api/country/${id}/city`, { cache: 'force-cache' })
        .then((response) => response.json())
        .then((result) => {
          setCities(result.data)
          setLoading(false)
        })
        .catch((e) => console.error(e))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.country])

  useEffect(() => {
    // get areas
    if (data.country === 'Egypt' && data.city) {
      setLoading(true)
      setData({ ...data, area: '' })

      const { id: cityID } = cities.find((c) => c.attributes.name === data.city)
      const { id: countryID } = countries.find((c) => c.attributes.name === data.country)

      fetch(proxyUrl + `http://46.101.108.59/api//country/${countryID}/city/${cityID}/area`, { cache: 'force-cache' })
        .then((response) => response.json())
        .then((result) => {
          setAreas(result.data)
          setLoading(false)
        })
        .catch((e) => console.error(e))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.city])

  return (
    <CountryContext.Provider
      value={{
        data,
        countries,
        cities,
        areas,
        loading,
        error,
        handleCountryChange
      }}
    >
      {children}
    </CountryContext.Provider>
  )
}

export { CountryProvider, CountryContext }
