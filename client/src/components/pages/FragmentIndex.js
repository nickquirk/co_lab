// Bootstrap Imports
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

// Custom Imports
import axios from 'axios'
import { getToken } from '../helpers/Auth'

// Custom Components
import Fragments from '../Fragments'
import MidiSounds from '../MidiSounds'


const FragmentIndex = () => {

  // ! Location Variables
  const navigate = useNavigate()
  const { fragmentId } = useParams()

  // ! State
  const [ trackData, setTrackData ] = useState([])
  const [ clicked, setClicked ] = useState()
  const [fragments, setFragments ] = useState({})
  const [ formFields, setFormFields ] = useState({
    name: '',
    tempo: '',
  })

  // ! Executions
  useEffect(() => {
    
  }, [])


  // Create new Fragment in database and navigate to sequencer page
  // POST Request
  const onClick = async (e)  => {
    let fragmentId
    try {
      const { data } = await axios.post('/api/fragments/',formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('newFragment data ->', data)
      fragmentId = data.id
    } catch (err) {
      console.log(err.message)
    }
    navigate(`/fragments/${fragmentId}`)
    // 
  }

  const handleChange = (e) => {
    e.preventDefault()
    // This happens on any change to the form
    // create shallow copy of form fields by spreading in to a new object
    const updatedFormFields = { ...formFields }
    // set key name to value entered into form field
    updatedFormFields[e.target.name] = e.target.value
    // set formFields = updatedFormFields
    setFormFields(updatedFormFields)
    // ! if there's an error, set to an empty string
  }


  // ! JSX
  return (
    <Container className="page-wrapper">
      <h1>FragmentIndex</h1>
      <form onChange={handleChange}>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' placeholder='Fragment Name'></input>
        <label htmlFor='tempo'>Tempo</label>
        <input type='number' name='tempo' placeholder='120BPM'></input>
      </form>
      <button onClick={onClick}>New Fragment</button>
      <MidiSounds
        // onClick={onClick}
      />
    </Container>
  )
}

export default FragmentIndex