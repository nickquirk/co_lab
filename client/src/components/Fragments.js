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
import { packTrackObject, unpackTrackObject, packFragmentTrack } from './helpers/Data'

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
  const [ fragmentTrack, setFragmentTrack ] = useState([])
  const [allFragments, setAllFragments ] = useState([])
  const [ selectedFragment, setSelectedFragment ] = useState({})

 
  // ! Executions
  //GET fragment data
  // Endpoint: /api/fragments
  // on pageLoad GET all fragments
  useEffect(() => {
    const getFragmentData = async () => {
      try {
        const { data } = await axios.get('api/fragments/')
        setAllFragments(data)
      } catch (err) {
        console.log(err.message)
      }
    }
    getFragmentData()
  },[])

  useEffect(() => {
    // Unpack and parse fragment tracks from database
    const trackArr = []
    if (selectedFragment.tracks){
      selectedFragment.tracks.forEach(track=>{
        const currentTrack = unpackTrackObject(JSON.parse(track.data))
        trackArr.push(currentTrack)
      })
    }
    setFragmentTrack(packFragmentTrack(trackArr)) 
  },[selectedFragment])

  const getFragmentId = (e) => {
    const fragmentId = e.target.name
    const getFragmentData = async () => {
      try {
        const { data } = await axios.get(`api/fragments/${fragmentId}`)
        setSelectedFragment(data)
      } catch (err) {
        console.log(err.message)
      }
    }
    console.log(fragmentTrack)
    getFragmentData()
    playLoop(fragmentTrack)
  }
  const handleClick = () => {
    
  }
  const loadSequence = (e) => {
  }

  // ! JSX
  return (
    <>
      <div className='component-wrapper'>
        <Container className='component-wrapper'>
          <h4>Fragments</h4>
          {allFragments.length ? (
            <Row>
              {allFragments.map(frag => {
                const { name, tempo, id, owner } = frag
                return (
                  <Col key={id}>
                    <div>
                      <Card>
                        <Card.Body>
                          <Link
                            className="text-decoration-none"
                            to={`/fragments/${id}`}>
                            <Card.Title>{name}</Card.Title>
                            <Card.Subtitle>{`Creator: ${owner.username}`}</Card.Subtitle>
                            <Card.Text>{`Tempo: ${tempo}`}</Card.Text>
                            <Track />
                          </Link>
                          <button onClick={getFragmentId} name={id}>Play</button>
                        </Card.Body>
                      </Card>
                    </div>
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

