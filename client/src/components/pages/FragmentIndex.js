import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Bootstrap Imports
import { Container } from 'react-bootstrap'

// Custom Imports
import axios from 'axios'
import { getToken, isAuthenticated } from '../helpers/Auth'

// Custom Components
import Fragments from '../Fragments'
import MidiSounds from '../MidiSounds'
import CreateFragment from '../CreateFragment'
import ShowOnceModal from '../ShowOnceModal'


const FragmentIndex = () => {

  // ! Location Variables

  // ! State
  const [showModal, setShowModal] = useState(false)

  // ! Executions
  useEffect(() => {
    setShowModal(true)
  }, [])

  // ! JSX
  return (
    <Container className="page-wrapper">
      <>
        {isAuthenticated() ? 
          <CreateFragment/>
          :
          null
        }
      </>
      <ShowOnceModal
        className='modal'
        pageId={'FragmentIndex'}
        modalTitle={<>Welcome to <span className='text-yellow'>CO</span>_LAB</>}
        modalBody={<>
          <p>
            An experimental platform that allows users to collaborate on short loops of music called Fragments.
            <br/><br/>
            Each Fragment can contain up to four Tracks which are composed on the Sequencer page. 
            <br/><br/>
            You can listen to Fragments on this page but to create new Fragments and add tracks to existing Fragments you&apos;ll
            need to create an account or login. 
            <br/><br/>
            Once your&apos;re logged in you can create Fragments by clicking &apos;New Fragment&apos; and add Tracks
            to an existing Fragment by clicking on the Fragment.
          </p>
        </>}
      />
      <MidiSounds/>
    </Container>
  )
}

export default FragmentIndex