import axios from 'axios'

// React Imports
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { getToken } from './helpers/Auth'

// Bootstrap Imports
import { Container } from 'react-bootstrap'


const CreateFragment = () => {

  // ! State
  const [ formFields, setFormFields ] = useState({
    name: '',
    tempo: '',
  })

  // ! Locations
  const navigate = useNavigate()

  // ! Executions
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
    <Container className="component-wrapper create-fragment-wrapper mt-3">
      <form className='fragment-form' onChange={handleChange}>
        <label className='ml-3' htmlFor='name'>Name</label>
        <input type='text' name='name' placeholder='Fragment Name'></input>
        <label htmlFor='tempo'>Tempo</label>
        <input type='number' name='tempo' placeholder='120BPM'></input>
      </form>
      <button className='btn mt-3 mb-3' onClick={onClick}>New Fragment</button>
    </Container>
  )

}

export default CreateFragment