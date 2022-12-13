import { useEffect, useState } from 'react'

import Container from 'react-bootstrap/Container'

// Custom Components 
import InstrumentSequencer from '../InstrumentSequencer'
import DrumSequencer from '../DrumSequencer'
import MidiSoundsSequencer from '../MidiSoundsSequencer'

const Sequencer = () => {
  // ! States
  const [ sequencer, setSequencer ]   = useState('instrument')
  
  const handleChange = (e) => {
    setSequencer(e.target.value)
  }

  return (
    <Container className="page-wrapper">
      <div> 
        <h1>Sequencer</h1>
      </div>
      <MidiSoundsSequencer 
        sequencer={sequencer}
      />
      
    </Container>
  )
}

export default Sequencer