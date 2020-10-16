import React, { useContext, useEffect } from 'react'

import { CountryContext } from '../../context'
import { getData } from '../../helpers/getData'

const Area = () => {
  const [{ location, loading, data }, dispatch, handleOptionChange] = useContext(CountryContext)

  // set areas if the country is Egypt
  useEffect(() => {
    if (location.country === 'Egypt' && location.city) {
      dispatch({ type: 'update areas' })

      const { id: cityID } = data.cities.find((c) => c.attributes.name === location.city)
      const { id: countryID } = data.countries.find((c) => c.attributes.name === location.country)

      getData(`http://46.101.108.59/api//country/${countryID}/city/${cityID}/area`)
        .then((res) => {
          dispatch({ type: 'set areas', areas: res.data })
        })
        .catch((e) => console.error(e))
    }
  }, [data.cities, data.countries, dispatch, location.city, location.country])

  return (
    <>
      {location.country === 'Egypt' && location.city ? (
        <div className='container'>
          <label htmlFor='area'>
            Area<span className='optional'> (optional) </span>
          </label>

          <select name='area' id='area' onChange={handleOptionChange} value={location.area}>
            <option value='' disabled>
              Select
            </option>
            {loading?.area ? (
              <option disabled>Loading ...</option>
            ) : (
              data?.areas?.map(({ id, attributes: { name } }) => <option key={id}>{name}</option>)
            )}
          </select>
        </div>
      ) : null}
    </>
  )
}

export default Area
