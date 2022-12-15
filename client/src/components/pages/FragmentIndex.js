import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Bootstrap Imports
import { Container } from 'react-bootstrap'

// Custom Imports
import axios from 'axios'
import { getToken } from '../helpers/Auth'

// Custom Components
import Fragments from '../Fragments'
import MidiSounds from '../MidiSounds'
import CreateFragment from '../CreateFragment'


const FragmentIndex = () => {

  // ! Location Variables
  const navigate = useNavigate()
  const { fragmentId } = useParams()

  // ! State
  const [ trackData, setTrackData ] = useState([])
  const [ clicked, setClicked ] = useState()
  const [fragments, setFragments ] = useState({})


  // ! Executions


  // ! JSX
  return (
    <Container className="page-wrapper">
      <CreateFragment />
      <MidiSounds
      />
    </Container>
  )
}

export default FragmentIndex