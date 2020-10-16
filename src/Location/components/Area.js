import React, { useContext } from 'react'
import { CountryContext } from '../../context'

const Area = () => {
  const { location, handleCountryChange, loading, areas } = useContext(CountryContext)

  return (
    <>
      {location.country === 'Egypt' && location.city ? (
        <div className='container'>
          <label htmlFor='area'>
            Area<span className='optional'> (optional) </span>
          </label>

          <select name='area' id='area' onChange={handleCountryChange} value={location.area}>
            <option value='' disabled>
              Select
            </option>
            {loading ? (
              <option disabled>Loading ...</option>
            ) : (
              areas?.map(({ id, attributes: { name } }) => <option key={id}>{name}</option>)
            )}
          </select>
        </div>
      ) : null}
    </>
  )
}

export default Area
