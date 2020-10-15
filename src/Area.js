import React, { useContext } from 'react'
import { CountryContext } from './context'

const Area = () => {
  const { data, handleCountryChange, loading, areas } = useContext(CountryContext)

  return (
    <div className='container'>
      {data.country === 'Egypt' && data.city ? (
        <>
          <label htmlFor='area'>Area</label>
          <select name='area' id='area' onChange={handleCountryChange} value={data.area}>
            <option value='' disabled>
              Select
            </option>
            {!areas || loading ? (
              <option>Loading</option>
            ) : (
              areas.map(({ id, attributes: { name } }) => <option key={id}>{name}</option>)
            )}
          </select>
        </>
      ) : null}
    </div>
  )
}

export default Area
