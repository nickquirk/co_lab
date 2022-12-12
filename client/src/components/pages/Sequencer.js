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
      <select
        name="changeSequencer"
        id="sequencer-select"
        className="dropdown mt-3"
        onChange={handleChange}
      >
        <option value="instrument">Instrument Sequencer</option>
        <option value="drum">Drum Sequencer</option>
      </select>
      <div className='mt-5'>
        {sequencer === 'instrument' ? 
          <InstrumentSequencer
          />
          :
          <DrumSequencer/>
        }
      </div>
    </Container>
  )

}

export default Sequencer