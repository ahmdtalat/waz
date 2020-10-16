import React from 'react'

import { CountryProvider } from './context'
import Location from './Location'
import './App.css'

function App() {
  return (
    <CountryProvider>
      <Location />
    </CountryProvider>
  )
}

export default App
