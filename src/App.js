import React from 'react'

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
