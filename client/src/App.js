import { useEffect, useState } from 'react'
import axios from 'axios'
// Bootstrap Components 
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

// Components 
import MIDISounds from 'midi-sounds-react'

// Custom Components 
import InstrumentSequencer from './components/InstrumentSequencer'
import DrumSequencer from './components/DrumSequencer'


const App = () => {
  // ! Vars

  // ! State
  
  // ! Execution

  // ! JSX
  return (
    <div className="page-wrapper">
      <h1>co_lab Prototype</h1>
      <InstrumentSequencer/>
      <DrumSequencer/>
    </div>
  )
}

export default App
