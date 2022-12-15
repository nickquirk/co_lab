// Bootstrap Imports
import { Container } from 'react-bootstrap'

const Track = ({ track }) => {
  //console.log(track)
  return (
    <Container className="component-wrapper">
      <div className='track-wrapper'>
        <h6>{`${track.owner}`}</h6>
      </div>
    </Container>
  )
}

export default Track
