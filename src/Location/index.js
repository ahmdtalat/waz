import React, { useContext, useEffect } from 'react'

import { CountryContext } from '../context'
import { getData } from '../helpers/getData'

import Country from './components/Country'
import City from './components/City'
import Area from './components/Area'

const Location = () => {
  const [{ location, error }, dispatch] = useContext(CountryContext)

  const handleSubmit = (e) => {
    // imitate a form submit
    e.preventDefault()
    if (!location.country || !location.city) {
      dispatch({ type: 'set error' })
      return
    }
    window.confirm(
      // format the alert msg
      `Your location: \nCountry: ${location.country}\nCity: ${location.city}${
        location.area ? `\nArea:${location.area}` : '\n'
      }`
    )
  }

  useEffect(() => {
    getData('http://46.101.108.59/api/countries')
      .then((res) => dispatch({ type: 'set countries', countries: res.data }))
      .catch((e) => console.error(e))
  }, [dispatch])

  return (
    <div className='App'>
      <Country />
      <City />
      <Area />
      <button type='submit' onClick={handleSubmit} disabled={error.city || error.country}>
        Submit
      </button>
    </div>
  )
}

export default Location
