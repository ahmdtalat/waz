import React, { useContext } from 'react'

import { CountryContext } from '../context'
import Country from './components/Country'
import City from './components/City'
import Area from './components/Area'

const Location = () => {
  const { location, error, setError } = useContext(CountryContext)

  const handleSubmit = (e) => {
    // imitate a form submit
    e.preventDefault()
    if (!location.country || !location.city) {
      setError({ ...error, city: !location.city, country: !location.country })
      return
    }
    window.confirm(
      // format the alert msg
      `Your location: \nCountry: ${location.country}\nCity: ${location.city}${
        location.area ? `\nArea:${location.area}` : '\n'
      }`
    )
  }

  return (
    <div className='App'>
      <Country />
      <City />
      <Area />
      <button type='submit' onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}

export default Location
