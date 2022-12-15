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
        <MIDISounds 
          ref={(ref) => (this.midiSounds = ref)} 
          appElementName="root"
          drums={[]}
          instruments={[]}
        />
        <Fragments 
          playLoop={this.playLoop.bind(this)}
        />
      </div>
    )
  }
}

export default MidiSounds
