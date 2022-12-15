// Bootstrap Imports
import { Container } from 'react-bootstrap'

const Track = ({ track }) => {
  //console.log(track)
  return (
    <div className='track-wrapper'>
      <h6>{`${track.owner}`}</h6>
    </div>
  )
}

export default Track
