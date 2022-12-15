// Bootstrap Imports
import { Container, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap'
// React imports
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

//Imports
import axios from 'axios'

//Custom imports 
import { getToken, getUserId } from '../helpers/Auth'
//import UploadImage from '../../helpers/UploadImage'
import { handleLogout } from '../helpers/Auth'

const UserProfile = () => {
  // ! State
  const [user, setUser] = useState([])
  const [errors, setErrors] = useState(false)
  const [formData, setFormData] = useState({
    image: '',
  })
  const [ fragmentId, setFragmentId ] = useState()

  // ! Location
  const { userId } = useParams()
  // ! Navigation
  const navigate = useNavigate()


  // ! Execution
  // GET request
  // Endpoint: /api/users/:userId
  // Get details of user who is logged in
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        console.log('data ->', data)
        setUser(data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getUser()
    console.log('user data', user)
  }, [user])

  
  // DELETE Request
  // Endpoint: /api/fragments/:fragmentId
  // Delete a fragment that the user owns
  const deleteFragment = async (locationId, reviewId) => {
    try {
      const response = await axios.delete(`/api/fragments/${fragmentId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  // PUT Request
  // Endpoint: /api/user/:userId
  // Update user profile 
  const updateUserProfile = async (event) => {
    event.preventDefault()
    try {
      await axios.put(`/api/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      const { data } = await axios.get(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setUser(data)
      setFormData({ ...formData, [event.target.name]: event.target.value })
    } catch (err) {
      console.log(err)
    }
  }


  // ! JSX
  return (
    <Container className="page-wrapper">
      <h1>{user.id}</h1>

    </Container>
  )

}

export default UserProfile