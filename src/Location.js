import React, { useContext } from 'react'

import { CountryContext } from './context'
import Country from './Country'
import City from './City'
import Area from './Area'

const Location = () => {
  const { location } = useContext(CountryContext)

  const handleSubmit = () => {
    alert(JSON.stringify(location))
  }
  console.log(location)
  return (
    <form onSubmit={handleSubmit}>
      <Country />
      <City />
      <Area />
      <button type='submit' disabled={!location.country || !location.city}>
        Save
      </button>
    </form>
  )
}

export default Location
