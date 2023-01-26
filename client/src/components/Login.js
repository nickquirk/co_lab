// React Imports
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { setToken } from './helpers/Auth'

// imports
import axios from 'axios'

// Bootstrap Imports
import { Container } from 'react-bootstrap'

const Login = () => {
  // ! Location Variables
  const navigate = useNavigate()

  // ! State
  // Track state of following variables
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState('')

  const handleChange = (e) => {
    // on change of form update setFormFields
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formFields)
      console.log('token->', data)
      setToken(data.token)
      // navigate to fragment index after successful login
      navigate('/')
    } catch (err) {
      setErrors(err.response.data)
      console.log(err.response.data)
    }
  }


  return (
    <Container className='login-component-wrapper'>
      <div className="text-center form-main">
        <h4 className='text-center'>Log in</h4>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <input
              required
              className="form-control mt-3 mb-3"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email *"
              value={formFields.email}
            />
            {/* Password */}
            <input
              required
              className="form-control mt-3"
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password *"
              value={formFields.password}
            />
            {errors.detail ? <p className='error'>{errors.detail}</p> : null}
            {/* {error && error.message && <small className='text-danger'>{error.message}</small>} */}
            <button className="btn btn-lg mt-3 mb-3">Login</button>
          </form>
        </div>
      </div>
    </Container>
  )
}

export default Login