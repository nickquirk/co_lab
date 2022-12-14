// React imports
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// import axios
import axios from 'axios'

// Bootstrap imports
import Container from 'react-bootstrap/Container'

// Custom Components 
import InstrumentSequencer from '../InstrumentSequencer'
import DrumSequencer from '../DrumSequencer'
import MidiSoundsSequencer from '../MidiSoundsSequencer'

// Custom Functions 
import { packTrackObject, unpackTrackObject } from '../helpers/Data'
import { getToken } from '../helpers/Auth'

const EditFragment = () => {

  // ! Location Variables
  const navigate = useNavigate()

  // ! States
  //const [ sequencer, setSequencer ]   = useState('instrument')
  const [ trackData, setTrackData ] = useState({})
  
  // axios POST request
  // Endpoint: /api/fragments
  // Description: POST new fragment data to database
  const handleClick = async (e) => {
    console.log('saved')
    try {
      await axios.post('/api/fragments/', trackData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate('/fragments')
    } catch (err) {
      console.log(err.message)
    }
  }

  // axios GET request
  // Endpoint: /api/fragments
  // Description: GET fragment data from database
  const loadSequence = (e) => {
    console.log('load')
    setTrackData(JSON.parse(localStorage.getItem('trackData')))
    console.log(trackData)
  }

  const playLoop = (e) => {

  }


  return (
    <Container className="page-wrapper">
      <div> 
        <h1>Edit Fragmment</h1>
        {/* <input type='text'></input> */}
      </div>
      <MidiSoundsSequencer 
        trackData={trackData}
        setTrackData={setTrackData}
      />
    </Container>
  )
}

export default EditFragment