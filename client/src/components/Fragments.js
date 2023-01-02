import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

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
import { getUserId, isAuthenticated } from '../components/helpers/Auth'

// This will be the main component in the app. It will be a midisounds object that can play up to four tracks. It will display:
// Trackname
// Creator Username
// Up to four tracks
// Play/Stop toggle button
const Fragments = ({ playLoop }) => {

  // ! State
  const [errors, setErrors] = useState()
  const [fragmentTrack, setFragmentTrack] = useState([])
  const [allFragments, setAllFragments] = useState([])
  const [selectedFragment, setSelectedFragment] = useState({})

  // ! Location
  const navigate = useNavigate()

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
  }, [])

  useEffect(() => {
    // Unpack and parse fragment tracks from database
    const trackArr = []
    if (selectedFragment.tracks) {
      selectedFragment.tracks.forEach(track => {
        const currentTrack = unpackTrackObject(JSON.parse(track.data))
        trackArr.push(currentTrack)
      })
    }
    setFragmentTrack(packFragmentTrack(trackArr))
  }, [selectedFragment])

  useEffect(() => {
    console.log('FRAGMENT TRACK', fragmentTrack)
    if (fragmentTrack && fragmentTrack.length) {
      playLoop(fragmentTrack, selectedFragment)
    }

  }, [fragmentTrack])

  const getFragmentId = (e) => {
    const fragmentId = e.target.name
    const getFragmentData = async () => {
      try {
        const { data } = await axios.get(`api/fragments/${fragmentId}/`)
        setSelectedFragment(data)
      } catch (err) {
        console.log(err.message)
      }
    }
    getFragmentData()
  }


  // ! JSX
  return (
    <>
      <div className='component-wrapper'>
        <Container className='component-wrapper'>
          <div className='fragment-title'>
            <h4><span className='text-yellow' style={{ fontSize: '28px' }}> Frag</span>/ ments</h4>
          </div>
          <div className='fragments-wrapper'>
            {allFragments.length ?
              <Row>
                {allFragments.map(frag => {
                  const { name, tempo, id, owner, tracks } = frag
                  return (
                    <Col key={id} className='col-lg-4 col-sm-6 col-12'>
                      <div>
                        <Card className='fragment-card'>
                          <Card.Body className='card-body'>
                            <Link
                              className="text-decoration-none"
                              to={`/fragments/${id}`}>
                              <Card.Title className='card-text'>{name}</Card.Title>
                              <Card.Subtitle className='card-text'>{`Creator: ${owner.username}`}</Card.Subtitle>
                              <Card.Text className='card-text-tempo'>{`Tempo: ${tempo}`}</Card.Text>
                              {tracks.map(track => {
                                return (
                                  <Track
                                    key={track.id}
                                    track={track}
                                  />
                                )
                              })}
                            </Link>
                            <button className='btn mt-3 mb-3' onClick={getFragmentId} name={id}>Play</button>
                          </Card.Body>
                        </Card>
                      </div>
                    </Col>
                  )
                })}
              </Row>
              : errors ?
                <h2>Error Message Here...</h2>
                :
                <p>Spinner</p>
            }
          </div>

        </Container>
      </div>
    </>
  )
}

export default Fragments

const isLoggedIn = ({ id }) => {
  if (isAuthenticated()) {
    console.log('id ->', id)
    return (
      `/fragments/${id}/`
    )
  } else {
    return (
      '/'
    )
  }
}