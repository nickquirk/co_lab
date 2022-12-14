import axios from 'axios'
import { Link } from 'react-router-dom'

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
const Fragments = ({ playLoop }) => {

  // ! State
  const [ errors, setErrors ] = useState()
  const [track1, setTrack1] = useState('')
  const [track2, setTrack2] = useState('')
  const [track3, setTrack3] = useState('')
  const [track4, setTrack4] = useState('')
  const [ fragmentTrack, setFragmentTrack ] = useState('')
  const [fragments, setFragments ] = useState([])

 
  // ! Executions
  //GET fragment data
  // Endpoint: /api/fragments
  // on pageLoad GET all fragments
  useEffect(() => {
    const getFragmentData = async () => {
      try {
        const { data } = await axios.get('api/fragments/')
        console.log(data)
        setFragments(data)
      } catch (err) {
        console.log(err.message)
      }
    }
    
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
    getFragmentData()
    console.log(fragments)
  },[])


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
    <>
      <div className='component-wrapper'>
        <Container className='component-wrapper'>
          <h4>Fragments</h4>
          {fragments.length ? (
            <Row>
              {fragments.map(frag => {
                const { name, tempo, id, owner } = frag
                return (
                  <Col key={id}>
                    <Link
                      className="text-decoration-none"
                      to={`/fragments/${id}`}>
                      <Card>
                        <Card.Body>
                          <Card.Title>{name}</Card.Title>
                          <Card.Subtitle>{`Creator: ${owner}`}</Card.Subtitle>
                          <Card.Text>{`Tempo: ${tempo}`}</Card.Text>
                          <Track />
                          <button onClick={handleClick}>Play</button>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                )
              })} 
            </Row>
          ) : errors ?
            <h2>Error Message Here...</h2>
            :
            <p>Spinner Huuuur</p>
          }
        </Container>
      </div>
    </>
  )
}

export default Fragments

