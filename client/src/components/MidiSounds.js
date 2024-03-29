import { Component, useEffect, useState } from 'react'
import MIDISounds from 'midi-sounds-react'
import Fragments from './Fragments'

class MidiSounds extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drums: 12,
      intruments: 15,
    }
  }

  // !  Need to cache the instrument sounds here
  // attach to fragment track 
  playLoop(fragmentTrack, selectedFragment) {
    if (fragmentTrack){
      console.log('fragment data ->', selectedFragment)
      const { tempo } = selectedFragment
      this.setState({ sequence: fragmentTrack })
      console.log('play loop fragment track', fragmentTrack)
      if (this.midiSounds.loopStarted) {
        this.midiSounds.stopPlayLoop()
        console.log('stopped')
      } else {
        console.log('playing')
        console.log(fragmentTrack)
        this.midiSounds.startPlayLoop( fragmentTrack , tempo, 1 / 16)
      }
    }
  }
  
  render() {
    return (
      <div>
        <Fragments 
          playLoop={this.playLoop.bind(this)}
        />
        <div className='midi-sounds-div'>
          <MIDISounds 
            className='midi-sounds'
            ref={(ref) => (this.midiSounds = ref)} 
            appElementName="root"
            drums={[]}
            instruments={[]}
          />
        </div>
        
      </div>
    )
  }
}

export default MidiSounds
