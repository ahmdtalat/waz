import React, { useContext } from 'react'
import { CountryContext } from '../../context'

const City = () => {
  const { location, handleCountryChange, loading, cities, error } = useContext(CountryContext)

  return (
    <div className='container'>
      <label htmlFor='city'>City</label>
      <select name='city' id='city' onChange={handleCountryChange} value={location?.city}>
        <option value='' disabled>
          Select City
        </option>
        {!cities || loading ? (
          <option>Loading</option>
        ) : (
          cities.map(({ id, attributes: { name } }) => <option key={id}>{name}</option>)
        )}
      </select>
      {error.city ? <span className='error'>please select a city</span> : null}
    </div>
  )
}

export default City
