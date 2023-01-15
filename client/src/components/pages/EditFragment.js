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
import ShowOnceModal from '../ShowOnceModal'

// todo
// use isOwner
const EditFragment = () => {

  // ! Location Variables
  const navigate = useNavigate()
  const { fragmentId } = useParams()

  // ! States
  //const [ sequencer, setSequencer ]   = useState('instrument')
  const [trackData, setTrackData] = useState({})
  const [fragment, setFragment] = useState()
  const [sequenceState, setSequenceState] = useState()

  // ! Executions
  // Axios GET Request
  // Endpoint: /api/fragments
  // Description: on change of fragmentId GET fragment with id that matches fragmentId
  useEffect(() => {
    const getFragmentData = async () => {
      try {
        const { data } = await axios.get(`/api/fragments/${fragmentId}/`)
        console.log(data)
        console.log('fragmentId', fragmentId)
        setFragment(data)
      } catch (err) {
        console.log(err.message)
      }
    }
    getFragmentData()
  }, [])

  // axios POST request
  // Endpoint: /api/tracks
  // Description: POST new track data to database
  const saveTrack = async (e) => {
    console.log('saved')
    try {
      await axios.post('/api/tracks/', JSON.stringify(trackData), {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate('/fragments')
    } catch (err) {
      console.log(err.message)
    }
  }


  // axios DELETE request
  // Endpoint: /api/fragments
  // Description: DELETE  track data from database
  const deleteFragment = async (e) => {
    try {
      const response = await axios.delete(`/api/fragments/${fragmentId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container className="component-wrapper mt-3">
      <ShowOnceModal
        className='modal'
        pageId={'EditFragment'}
        modalTitle={'Sequencer'}
        modalBody={<>
          <p>Add Tracks to a Fragment using the Sequencer. This allows simple melodies to be created using
            a 16 step grid that spans an octave (14 notes). Click the cells to toggle notes on and off or
            clear the whole sequence by clicking &apos;Clear&apos;. Click &apos;Play/Stop&apos; to play or stop
            playback of the current melody. If you are the owner of the Fragment you can delete it here.
          <br /><br />
            Choose from over 1000 different instruments from Orchestral to Synthesizers.
          <br /><br />
            When you&apos;re happy with your melody, click &apos;Save&apos; to add the track to the Fragment.
          </p>
        </>}
      />
      {fragment ?
        <>
          <h1>{fragment.name}</h1>
          <h4>{`Tempo: ${fragment.tempo} BPM`}</h4>
          <h5>{`Creator: ${fragment.owner.username}`}</h5>
          {isOwner(fragment.owner.id) ?
            <button className='btn' onClick={deleteFragment}>Delete Fragment</button>
            :
            null
          }
          <MidiSoundsSequencer
            trackData={trackData}
            setTrackData={setTrackData}
          />
        </>
        :
        <p>Spinner</p>
      }
    </Container>
  )
}

export default EditFragment