import axios from 'axios'

// Bootstrap Imports
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

// Custom Imports
import Track from './Track'
import { useEffect, useState } from 'react'

// Custom Functions 
import { packTrackObject, unpackTrackObject, packFragmentObject } from './helpers/Data'

//todo
// create function to combine tracks into one fragment track
// pass whole track to MIDISounds object
// MIDISounds object unpacks sequence and plays

// This will be the main component in the app. It will be a midisounds object that can play up to four tracks. It will display:
// Trackname
// Creator Username
// Up to four tracks
// Play/Stop toggle button
// It will have to be functional on a carousel component and standalone 
const Fragment = ({ playLoop }) => {

  // ! State
  const [track1, setTrack1] = useState('')
  const [track2, setTrack2] = useState('')
  const [track3, setTrack3] = useState('')
  const [track4, setTrack4] = useState('')
  const [ fragmentTrack, setFragmentTrack ] = useState('')
  const [fragments, setFragments ] = useState()

 
  // ! Executions
  //GET fragment data
  // This will contain information about that tracks that are stored on in
  useEffect(() => {
    const getFragmentData = async () => {
      try {
        const { data } = await axios.get('api/fragments/')
        setFragments(data)
        console.log(data)
      } catch (err) {
        console.log(err.message)
      }
    }
    getFragmentData()
    // GET all track data assocated with Fragment 
    // data will be an array of four track data objects
    const getTrackData = async () => {
      try {
        const { data } = await axios.get('api/tracks/')
        console.log(data)
      } catch (err) {
        console.log(err.message)
      }
    }
    //getTrackData()
    //loadSequence()
  }, [])


  const handleClick = () => {
    playLoop(fragmentTrack)
  }

  // Load sequence from memory
  // Axios GET request
  // /api/fragments
  // GET track data associated with the fragment
  const loadSequence = (e) => {
    const trackToLoad1 = JSON.parse(localStorage.getItem('trackData1'))
    const trackToLoad2 = JSON.parse(localStorage.getItem('trackData2'))
    //console.log('track1', trackToLoad1)
    setTrack1(unpackTrackObject(trackToLoad1))
    setTrack2(unpackTrackObject(trackToLoad2))
    packFragmentObject(track1, track2)
    //setFragmentData()
  }

  // ! JSX
  return (
    <Container className='component-wrapper'>
      <h4>Fragments</h4>
      <Row>
        {fragments.length}
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Fragment Name</Card.Title>
              <Card.Subtitle>Creator: Username</Card.Subtitle>
              <Card.Text>Tempo: 120 BPM</Card.Text>
              <Track />
              <button onClick={handleClick}>Play</button>
              {/* <button onClick={loadSequence}>Load</button> */}
            </Card.Body>
          </Card>
        </Col>
        <Col>
        </Col>
      </Row>
    </Container>
  )
}

export default Fragment

