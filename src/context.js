/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

const CountryContext = React.createContext()
CountryContext.displayName = 'Country Context'

function CountryProvider({ children }) {
  const [data, setData] = useState({
    countries: null,
    cities: null,
    areas: null,
    loading: false
  })

  const [location, setLocation] = useState({
    country: '',
    city: '',
    area: ''
  })

  const [error, setError] = useState({
    country: false,
    city: false
  })

  const handleCountryChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value })
  }

  const { areas, cities, countries, loading } = data

  // get countries
  useEffect(() => {
    fetch(proxyUrl + 'http://46.101.108.59/api/countries', { cache: 'force-cache' })
      .then((response) => response.json())
      .then((result) => setData({ ...data, countries: result.data }))
      .catch((e) => console.error(e))
  }, [])

  // get cities
  useEffect(() => {
    if (location.country) {
      setData({ ...data, loading: true })
      setLocation({ ...location, city: '', area: '' })

      const { id } = countries.find((c) => c.attributes.name === location.country)

      fetch(proxyUrl + `http://46.101.108.59/api/country/${id}/city`, { cache: 'force-cache' })
        .then((response) => response.json())
        .then((result) => {
          setData({ ...data, cities: result.data, loading: false })
        })
        .catch((e) => console.error(e))
    }
  }, [location.country])

  // get areas
  useEffect(() => {
    if (location.country === 'Egypt' && location.city) {
      setData({ ...data, loading: true })
      setLocation({ ...location, area: '' })

      const { id: cityID } = cities.find((c) => c.attributes.name === location.city)
      const { id: countryID } = countries.find((c) => c.attributes.name === location.country)

      fetch(proxyUrl + `http://46.101.108.59/api//country/${countryID}/city/${cityID}/area`, { cache: 'force-cache' })
        .then((response) => response.json())
        .then((result) => {
          setData({ ...data, areas: result.data, loading: false })
        })
        .catch((e) => console.error(e))
    }
  }, [location.city])

  // set Errors
  useEffect(() => {
    setError({ ...error, city: !location.city, country: !location.country })
  }, [location.country, location.city])

  return (
    <CountryContext.Provider
      value={{
        error,
        areas,
        cities,
        loading,
        location,
        countries,
        handleCountryChange
      }}
    >
      {children}
    </CountryContext.Provider>
  )
}

export { CountryProvider, CountryContext }
