import { Component, useEffect, useState } from 'react'
import MIDISounds from 'midi-sounds-react'
import Fragment from './Fragments'

class MidiSounds extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drums: 12,
      intruments: 15,
      tracks: [],
    }
  }

  playLoop(fragmentTrack) {
    if (fragmentTrack){
      console.log('play loop fragment track', fragmentTrack)
      this.midiSounds.startPlayLoop([[], [1, [50], 1 / 16], [1, [50], 1 / 16]],[[], [1, [50], 1 / 16], [1, [50], 1 / 16]], 120, 1 / 16)
      // if (this.midiSounds.loopStarted) {
      //   this.midiSounds.stopPlayLoop()
      //   console.log('stopped')
      // } else {
      //   console.log('playing')
      // }
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
        <Fragment 
          playLoop={this.playLoop.bind(this)}
        />
      </div>
    )
  }
}

export default MidiSounds
