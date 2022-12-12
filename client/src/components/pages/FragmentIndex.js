// Bootstrap Imports
import { useState } from 'react'
import { Container } from 'react-bootstrap'


import Fragment from '../Fragment'
import MidiSounds from '../MidiSounds'


const FragmentIndex = () => {

  // ! State
  const [ trackData, setTrackData ] = useState([])
  const [ clicked, setClicked ] = useState()

  const onClick = (e) => {
    console.log('component ->', e.target)
  }

  return (
    <Container className="page-wrapper">
      <h1>FragmentIndex</h1>
      <MidiSounds
        onClick={onClick}
      />
    </Container>
  )
}

export default FragmentIndex