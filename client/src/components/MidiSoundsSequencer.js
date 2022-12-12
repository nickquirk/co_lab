import { Component, useEffect, useState } from 'react'
import MIDISounds from 'midi-sounds-react'
import InstrumentSequencer from './InstrumentSequencer'
import DrumSequencer from './DrumSequencer'

class MidiSoundsSequencer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drums: 12,
      intruments: 15,
      tracks: [],
      sequencer: this.props.sequencer,
    }
  }

  startLoop(trackData) {
    console.log(this.state.sequencer)
    if (this.midiSounds.loopStarted) {
      this.midiSounds.stopPlayLoop()
      console.log('stopped')
    } else {
      this.midiSounds.startPlayLoop(trackData, 120, 1 / 16)
      console.log('playing')
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
        <div className='mt-5'>
          {this.state.sequencer === 'instrument' ? 
            <InstrumentSequencer
              startLoop={this.startLoop.bind(this)}
            />
            :
            <DrumSequencer/>
          }
        </div>
      </div>
    )
  }
}

export default MidiSoundsSequencer
