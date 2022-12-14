// React imports
import { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'

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
import { getToken, isOwner } from '../helpers/Auth'

// todo
// use isOwner
const EditFragment = () => {

  // ! Location Variables
  const navigate = useNavigate()
  const { fragmentId } = useParams()

  // ! States
  //const [ sequencer, setSequencer ]   = useState('instrument')
  const [ trackData, setTrackData ] = useState({})
  const [ fragment, setFragment ] = useState()
  const [ sequenceState, setSequenceState ] = useState()
  
  // ! Executions
  // Axios GET Request
  // Endpoint: /api/fragments
  // Description: on change of fragmentId GET fragment with id that matches fragmentId
  useEffect(() => {
    const getFragmentData = async () => {
      try {
        const { data } = await axios.get(`/api/fragments/${fragmentId}`)
        console.log(data)
        console.log('fragmentId', fragmentId)
        setFragment(data)
      } catch (err) {
        console.log(err.message)
      }
    }
    getFragmentData()
    // const getTrackData = async () => {
    //   try {
    //     const { data } = await axios.get(`/api/tracks/${fragmentId}`)
    //     console.log(data)
    //   } catch (err) {
    //     console.log(err.message)
    //   }
    // }
    // getTrackData()
  }, [])

  // axios POST request
  // Endpoint: /api/tracks
  // Description: POST new track data to database
  const handleClick = async (e) => {
    console.log('saved')
    try {
      await axios.post('/api/tracks/', trackData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate('/fragments')
    } catch (err) {
      console.log(err.message)
    }
  }

  const loadSequence = (e) => {
    console.log('load')
    setTrackData(JSON.parse(localStorage.getItem('trackData')))
    console.log(trackData)
  }

  const playLoop = (e) => {

  }

  const saveData = () => {
    console.log('data saved Boi...')
  }

  return (
    <Container className="page-wrapper">
      {fragment ?
        <>
          <h1>{fragment.name}</h1>
          <h4>{`Tempo: ${fragment.tempo} BPM`}</h4>
          <h5>{`Creator: ${fragment.owner.username}`}</h5>
          <div> 
            {/* <input type='text'></input> */}
            <button onClick={handleClick}>Save</button>
          </div>
          <MidiSoundsSequencer 
            trackData={trackData}
            setTrackData={setTrackData}
            saveData={saveData}
          />
    
        </>
        :
        <p>Spinner Huuuuur</p>
      }
    </Container>
  )
}

export default EditFragment