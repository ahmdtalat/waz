import React, { useContext } from 'react'
import { CountryContext } from '../../context'

const Country = () => {
  const [{ location, data, error }, , handleOptionChange] = useContext(CountryContext)

  return (
    <div className='container'>
      <h2>Location</h2>
      <label htmlFor='country'>Country</label>
      <select name='country' id='country' onChange={handleOptionChange} value={location.country}>
        <option value='' disabled>
          Select Country
        </option>
        {!data?.countries ? (
          <option disabled>Loading ...</option>
        ) : (
          data?.countries?.map(({ id, attributes: { name } }) => <option key={id}>{name}</option>)
        )}
      </select>
      {error.country ? <span className='error'>please select a country</span> : null}
    </div>
  )
}

export default Country
