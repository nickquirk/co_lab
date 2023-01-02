// Imports
import axios from 'axios'
import { useState, useEffect } from 'react'

// Bootstrap Imports
import { Container } from 'react-bootstrap'

const Track = ({ track }) => {
  // ! State

  // ! Executions

  // ! JSX
  return (
    <div className='track-wrapper'>
      <h6>{`${track.owner.username}`}</h6>
    </div>
  )
}

export default Track
