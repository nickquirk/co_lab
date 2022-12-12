import { Component } from 'react'
import MIDISounds from 'midi-sounds-react'

class MidiSounds extends Component {
  constructor(props) {
    super(props)
  }

  playLoop() {
    this.midiSounds.playDrumsNow([60])
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
        <button onClick={this.playLoop.bind(this)}>Play loop</button>
      </div>
    )
  }
}

export default MidiSounds