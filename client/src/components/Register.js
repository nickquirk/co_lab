//Imports
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// Bootstrap Imports
import { Container } from 'react-bootstrap'

const Register = () => {
  // ! Variables
  const IMAGE = 'https://res.cloudinary.com/dhjguxvm1/image/upload/v1669364899/default-images/van-logo_upuiqv.png'

  // ! Location Variables
  const navigate = useNavigate()

  // ! State 
  // Create states for following variables 
  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const [errors, setErrors] = useState('')
  const [response, setResponse] = useState('')

  // ! Executions
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // send off form data to our API
      const { data } = await axios.post('/api/auth/register/', formFields)
      console.log(data)
      setResponse(data)
      console.log('form submitted')
    } catch (err) {
      setErrors(err.response.data)
    }
  }

  const handleChange = (e) => {
    // This happens on any change to the form
    // create shallow copy of form fields by spreading in to a new object
    const updatedFormFields = { ...formFields }
    // set key name to value entered into form field
    updatedFormFields[e.target.name] = e.target.value
    // set formFields = updatedFormFields
    setFormFields(updatedFormFields)
    // if there's an error, set errors to an empty string
    setErrors('')
    setResponse('')
  }

  return (
    // Display Register Form
    <>
      <Container className="login-component-wrapper">
        <h4 className='text-center'>Register</h4>
        <div className='hero-page text-center form-main'>
          <div className='form-container'>
            <form>
              <input
                required
                className='form-control mt-3 mb-3'
                type="text"
                name="username"
                onChange={handleChange}
                placeholder="Username *"
                value={formFields.username}
              />
              {errors ? <p className='error'>{errors.username}</p> : null}
              <input
                required
                className='form-control'
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Email *"
                value={formFields.email}
              />
              {errors ? <p className='error'>{errors.email}</p> : null}
              <input
                required
                className='form-control mt-3 mb-3'
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password *"
                value={formFields.password}
              />
              {errors ? <p className='error'>{errors.password}</p> : null}
              {errors.non_field_errors ? <p className='error'>{errors.non_field_errors}</p> : null}
              <input
                required
                className='form-control mb-3'
                type="password"
                name="password_confirmation"
                onChange={handleChange}
                placeholder="Confirm password *"
                value={formFields.password_confirmation}
              />
              {errors ? <p className='error'>{errors.password_confirmation}</p> : null}
              <button onClick={handleSubmit} className="btn btn-lg mb-3">Register</button>
            </form>

          </div>
        </div>

      </Container>

      {response ? <p className='success'>{response}</p> : null}
    </>
  )

}

export default Register
