import React, { useReducer } from 'react'

import locationReducer from './reducer'

const initialState = {
  data: {
    countries: null,
    cities: null,
    areas: null
  },
  location: {
    country: '',
    city: '',
    area: ''
  },
  loading: {
    city: false,
    area: false
  },
  error: {
    country: false,
    city: false
  }
}

const CountryContext = React.createContext()
CountryContext.displayName = 'Country Context'

const CountryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(locationReducer, initialState)

  const handleOptionChange = (e) => {
    dispatch({ type: 'update location', key: e.target.name, value: e.target.value })
  }
  const value = [state, dispatch, handleOptionChange]

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
}

export { CountryProvider, CountryContext }
