//Imports
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// Custom Imports
import Register from '../Register'
import Login from '../Login'

// Bootstrap Imports
import { Container } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const LoginPage = () => {
  // ! Location Variables
  const navigate = useNavigate()

  // ! State 
  // Create states for following variables 
  
  // ! JSX
  return (
    <Container className="page-wrapper">
      <Row className='mt-5'>
        <Col>
          <Register />
        </Col>
        <Col>
          <Login />
        </Col>
      </Row>
    </Container>
  )

}

export default LoginPage
