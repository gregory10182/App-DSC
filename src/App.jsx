import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Container from './components/Container'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container />
  )
}

export default App
