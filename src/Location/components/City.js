import React, { useContext, useEffect } from 'react'

import { getData } from '../../helpers/getData'
import { CountryContext } from '../../context'

const City = () => {
  const [{ location, loading, data, error }, dispatch, handleOptionChange] = useContext(CountryContext)

  // update cities
  useEffect(() => {
    if (location.country) {
      dispatch({ type: 'update cities' })

      const { id } = data.countries.find((c) => c.attributes.name === location.country)

      getData(`http://46.101.108.59/api/country/${id}/city`)
        .then((res) => {
          dispatch({ type: 'set cities', cities: res.data })
        })
        .catch((e) => console.error(e))
    }
  }, [data.countries, dispatch, location.country])

  return (
    <div className='container'>
      <label htmlFor='city'>City</label>
      <select name='city' id='city' onChange={handleOptionChange} value={location?.city}>
        <option value='' disabled>
          Select City
        </option>
        {loading?.city ? (
          <option disabled> Loading ...</option>
        ) : (
          data?.cities?.map(({ id, attributes: { name } }) => <option key={id}>{name}</option>)
        )}
      </select>
      {error.city ? <span className='error'>please select a city</span> : null}
    </div>
  )
}

export default City
