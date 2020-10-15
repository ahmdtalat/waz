import React, { useContext } from 'react'
import { CountryContext } from './context'

const Country = () => {
  const { location, handleCountryChange, countries } = useContext(CountryContext)

  return (
    <div className='container'>
      <h2>Location</h2>
      <label htmlFor='country'>Country</label>
      <select name='country' id='country' onChange={handleCountryChange} value={location.country}>
        <option value='' disabled>
          Select
        </option>
        {!countries ? (
          <option>Loading</option>
        ) : (
          countries.map(({ id, attributes: { name } }) => <option key={id}>{name}</option>)
        )}
      </select>
    </div>
  )
}

export default Country
