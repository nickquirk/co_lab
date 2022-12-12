import axios from 'axios'

// Bootstrap Imports
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

// Custom Imports
import Track from './Track'
import { playButton } from './helpers/PageComponents'
import { useEffect, useState } from 'react'

// This will be the main component in the app. It will be a midisounds object that can play up to four tracks. It will display:
// Trackname
// Creator Username
// Up to four tracks
// Play/Stop toggle button
// It will have to be functional on a carousel component and standalone 
const Fragment = ({ playLoop }) => {

  // ! State
  const [trackData, setTrackData] = useState('')


  // ! Executions
  // GET all track data assocated with Fragment 
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('api/fragments/')
        setTrackData(data)
        console.log(data)
      } catch (err) {
        console.log(err.message)
      }
    }
    //getData()
    loadSequence()
  }, [])


  const handleClick = () => {
    playLoop(trackData)
  }

  // Load sequence from memory
  // Axios GET request
  // /api/fragments
  // GET track data associated with the fragment
  const loadSequence = (e) => {
    console.log('Sequence Loaded')
    const trackToLoad = JSON.parse(localStorage.getItem('trackData'))
    const gridToLoad = trackToLoad.gridData
    const sequenceToLoad = trackToLoad.sequenceData
    console.log()
    setTrackData(sequenceToLoad)
  }

  // ! JSX
  return (
    <Container className='component-wrapper'>
      <h4>Fragment</h4>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Fragment Name</Card.Title>
              <Card.Subtitle>Creator: Username</Card.Subtitle>
              <Card.Text>Tempo: 120 BPM</Card.Text>
              <Track />
              <button onClick={handleClick}>Play</button>
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

