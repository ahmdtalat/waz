/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import { getData } from '../helpers/getData'

const CountryContext = React.createContext()
CountryContext.displayName = 'Country Context'

function CountryProvider({ children }) {
  const [data, setData] = useState({
    countries: null,
    cities: null,
    areas: null
  })

  const [location, setLocation] = useState({
    country: '',
    city: '',
    area: ''
  })

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState({
    country: false,
    city: false
  })

  const handleCountryChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value })
    if (e.target.name !== 'area') setError({ ...error, [e.target.name]: !e.target.value })
  }

  const { areas, cities, countries } = data

  // get countries
  useEffect(() => {
    getData('http://46.101.108.59/api/countries')
      .then((res) => setData({ ...data, countries: res.data }))
      .catch((e) => console.error(e))
  }, [])

  // update cities
  useEffect(() => {
    if (location.country) {
      setLoading(true)
      setLocation({ ...location, city: '', area: '' })

      const { id } = countries.find((c) => c.attributes.name === location.country)

      getData(`http://46.101.108.59/api/country/${id}/city`)
        .then((res) => {
          setData({ ...data, cities: res.data })
          setLoading(false)
        })
        .catch((e) => console.error(e))
    }
  }, [location.country])

  // set areas if the country is Egypt
  useEffect(() => {
    if (location.country === 'Egypt' && location.city) {
      setLocation({ ...location, area: '' })

      const { id: cityID } = cities.find((c) => c.attributes.name === location.city)
      const { id: countryID } = countries.find((c) => c.attributes.name === location.country)

      getData(`http://46.101.108.59/api//country/${countryID}/city/${cityID}/area`)
        .then((res) => {
          setData({ ...data, areas: res.data })
          setLoading(false)
        })
        .catch((e) => console.error(e))
    }
  }, [location.city])

  return (
    <CountryContext.Provider
      value={{
        error,
        areas,
        cities,
        loading,
        location,
        countries,
        setError,
        handleCountryChange
      }}
    >
      {children}
    </CountryContext.Provider>
  )
}

export { CountryProvider, CountryContext }
