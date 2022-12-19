// Bootstrap Imports
import { Container, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap'
// React imports
import { useState, useEffect, Fragment } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

//Imports
import axios from 'axios'

//Custom imports 
import { getToken, getUserId } from '../helpers/Auth'
import UploadImage from '../helpers/UploadImage'
import { handleLogout } from '../helpers/Auth'

const UserProfile = () => {
  // ! State
  const [user, setUser] = useState([])
  const [errors, setErrors] = useState(false)
  const [formData, setFormData] = useState({
    image: '',
  })
  const [ fragmentId, setFragmentId ] = useState()
  const [ fragments, setFragments ] = useState()
  const [ ownedFragments, setOwnedFragments ] = useState()

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
        const { data } = await axios.get(`/api/users/${userId}/`, {
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
  }, [])

  // GET request
  // Endpoint: /api/fragments/
  // Get all fragments
  useEffect(() => {
    const getFragments = async () => {
      try {
        const { data } = await axios.get('/api/fragments/')
        setFragments(data)
      } catch (err) {
        console.log(err.message)
      }
    }
    getFragments()
    
  },[])

  useEffect(() => {
    if (fragments){
      const filteredFragments = fragments.filter(frag => frag.owner.id === user.id)
      console.log(filteredFragments)
      setOwnedFragments(filteredFragments)
    }
    
  }, [fragments])

  
  // DELETE Request
  // Endpoint: /api/fragments/:fragmentId
  // Delete a fragment that the user owns
  const deleteFragment = async (fragmentId) => {
    try {
      const response = await axios.delete(`/api/fragments/${fragmentId}/`, {
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
      await axios.put(`/api/users/${userId}/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      const { data } = await axios.get(`/api/users/${userId}/`, {
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

  const handleSubmit = () => {

  }


  // ! JSX
  return (
    <Container className="component-wrapper mt-3">
      <Row className='text-center'>
        <Col md="4" className='text-center '>
          <div className='user-details d-flex flex-column align-items-center'>
            <h3 className="mt-5 mb-5">{user.username}</h3>
            <div className='profile-container'>
              <img className='img-thumbnail profile-pic' src={`${user.image}`}></img>
              <div className="upload-image-div d-flex  mt-2">
                <Link onClick={updateUserProfile} className=' profile-btn btn align-self-center btn-md btn-sm mb-3' >Upload</Link>
                <UploadImage
                  imageFormData={formData}
                  setFormData={setFormData}
                  handleSubmit={updateUserProfile}
                />
              </div>
              <div className='mt-4 d-flex flex-column justify-content-center'>
                <Link className='btn' to="/login" onClick={() => handleLogout(navigate)}>Logout</Link>
              </div>
            </div>
          </div>
        </Col>
        <Col md="8">
          <h3 className="mt-5 mb-5">Your Fragments</h3>
          <div className='user-fragments'>
            <>
              {ownedFragments ? (
                <ListGroup className='ms-1 mb-5'>
                  {ownedFragments.map(fragment => {
                    const { id, name } = fragment
                    return (
                      <Link
                        className="text-decoration-none"
                        key={id}
                        to={`/fragments/${id}`}>
                        <ListGroupItem className='d-flex review-list list-group-item-action mt-2 fragment-track'>
                          <div className='d-flex flex-column align-items-start ms-3'>
                            <h4>{name}</h4>
                          </div>
                          <div className='d-flex flex-column buttons align-self-start'>
                            <Link onClick={() => deleteFragment(id)} className='btn mt-3 align-self-end' id="del2-btn" to="">Delete</Link>
                          </div>
                        </ListGroupItem>
                      </Link>
                    )
                  })}
                </ListGroup>
              ) : errors ? (
                <h2>Error...</h2>
              ) : (
                <>
                  <h4>No fragments here</h4>
                  <p>Better get creating...</p>
                </>
              )}
            </>
          </div>
        </Col>
      </Row>
    </Container>
  )

}

export default UserProfile