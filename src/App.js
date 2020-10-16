import React from 'react'
import './App.css'

import { CountryProvider } from './context'
import Location from './Location'

function App() {
  return (
    <CountryProvider>
      <Location />
    </CountryProvider>
  )
}

export default App
