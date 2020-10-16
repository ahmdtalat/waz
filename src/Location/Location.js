import React, { useContext } from 'react'

import { CountryContext } from '../context'
import Country from './components/Country'
import City from './components/City'
import Area from './components/Area'

const Location = () => {
  const { location } = useContext(CountryContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(JSON.stringify(location))
  }
  return (
    <div className='App'>
      <Country />
      <City />
      <Area />
      <button type='submit' onClick={handleSubmit} disabled={!location.country || !location.city}>
        Save
      </button>
    </div>
  )
}

export default Location
