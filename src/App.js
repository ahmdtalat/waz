import React from 'react'

import { CountryProvider } from './context'
import Country from './Country'
import City from './City'
import Area from './Area'
import './App.css'

function App() {
  return (
    <CountryProvider>
      <div className='App'>
        <Country />
        <City />
        <Area />
      </div>
    </CountryProvider>
  )
}

export default App
