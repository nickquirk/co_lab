
import { useEffect, useState } from 'react'
// Bootstrap imports
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

// A component that creates a basic pop-up modal once per user
// modalTitle and modalBody can be passed as props in the form of strings to display content 
// PageId is used as a reference for the locally stored token
const ShowOnceModal = ({ modalTitle, modalBody, pageId }) => {
  // ! State
  const [ show, setShow ] = useState(true)

  // ! Executions
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // Show modal on page load
  // Then save a token with key = pageId 
  // This token is saved the first time the page is visited
  // If the token exists then modal is not shown
  useEffect(() => {
    if (localStorage.getItem(pageId)) {
      setShow(false)
    } else {
      setShow(true)
      localStorage.setItem(pageId, true)
    }
  }, [])

  // ! JSX
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ShowOnceModal