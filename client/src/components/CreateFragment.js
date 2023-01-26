import axios from 'axios'

// React Imports
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { getToken } from './helpers/Auth'

// Bootstrap Imports
import { Container, Row, Col } from 'react-bootstrap'


const CreateFragment = () => {

  // ! State
  const [formFields, setFormFields] = useState({
    name: '',
    tempo: '120',
  })

  const [errors, setErrors] = useState(false)

  // ! Locations
  const navigate = useNavigate()

  // ! Executions
  // Create new Fragment in database and navigate to sequencer page
  // POST Request
  const onClick = async (e) => {
    let fragmentId
    try {
      const { data } = await axios.post('/api/fragments/', formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('newFragment data ->', data)
      fragmentId = data.id
      navigate(`/fragments/${fragmentId}`)
    } catch (err) {
      console.log(err)
      setErrors(true)
    }
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
    //  reset errors 
    setErrors('')
  }

  // ! JSX
  return (
    <Container className="component-wrapper create-fragment-wrapper mt-3">
      <Row>
        <Col xs={6} sm={12}>
          <form className='fragment-form' onChange={handleChange}>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' placeholder='Fragment Name'></input>
            <label htmlFor='tempo'>Tempo</label>
            <input type='number' name='tempo' placeholder='120BPM'></input>
          </form>
        </Col>
        <Col xs={6}>
          {errors ? <p className='error create-fragment'>Please enter a name to continue...</p> : null}
          <button className='btn mt-3 mb-3' onClick={onClick}>New Fragment</button>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateFragment