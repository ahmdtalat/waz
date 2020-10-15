import React, { useContext } from 'react'
import { CountryContext } from './context'

const City = () => {
  const { location, handleCountryChange, loading, cities } = useContext(CountryContext)

  return (
    <div className='container'>
      {location.country ? (
        <>
          <label htmlFor='city'>City</label>
          <select name='city' id='city' onChange={handleCountryChange} value={location.city}>
            <option value='' disabled>
              Select
            </option>
            {!cities || loading ? (
              <option>Loading</option>
            ) : (
              cities.map(({ id, attributes: { name } }) => <option key={id}>{name}</option>)
            )}
          </select>
        </>
      ) : null}
    </div>
  )
}

export default City
