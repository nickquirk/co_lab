// Bootstrap Imports
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

// This will be the main component in the app. It will be a midisounds object that can play up to four tracks. It will display:
// Trackname
// Creator Username
// Up to four tracks
// Play/Stop toggle button
// It will have to be functional on a carousell component and stndalone 
const Fragment = () => {
  // ! State

  // ! Executions 

  // ! JSX
  return (
    <Container className='component-wrapper'>
      <h4>Fragment</h4>
      <Card>
        <Card.Body>
          <Card.Title>Fragment Name</Card.Title>
          <Card.Subtitle>Creator Username</Card.Subtitle>
          <button>Play</button>
        </Card.Body>
      </Card>
    </Container>
  )
}


export default Fragment