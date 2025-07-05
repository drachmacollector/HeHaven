import { useState } from 'react'
import React from 'react';
import HeHaven from './components/HeHaven';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="App">
      <HeHaven />
    </div>
    </>
  )
}

export default App
