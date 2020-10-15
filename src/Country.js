import React, { useContext } from 'react'
import { CountryContext } from './context'

const Country = () => {
  const { data, handleCountryChange, countries, error } = useContext(CountryContext)

  return (
    <div className='container'>
      <h2>Location</h2>
      <label htmlFor='country'>Country</label>
      <select name='country' id='country' onChange={handleCountryChange} value={data.country}>
        <option value='' disabled>
          Select
        </option>
        {!countries ? (
          <option>Loading</option>
        ) : (
          countries.map(({ id, attributes: { name } }) => <option key={id}>{name}</option>)
        )}
      </select>
      {error.country ? <span className='error'>please select a country</span> : null}
    </div>
  )
}

export default Country
