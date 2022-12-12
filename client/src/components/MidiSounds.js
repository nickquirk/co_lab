import { Component, useEffect, useState } from 'react'
import MIDISounds from 'midi-sounds-react'
import Fragment from './Fragment'

class MidiSounds extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drums: 12,
      intruments: 15,
      tracks: [],
    }
  }

  playLoop(props) {
    console.log(props)
    this.midiSounds.playDrumsNow([60])
    console.log
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
        {/* <button onClick={this.playLoop.bind(this)}>Play loop</button> */}
        <Fragment 
          playLoop={this.playLoop.bind(this)}
        />
      </div>
    )
  }
}

export default MidiSounds

const clickHandler = (props) => {
  useEffect(() => {
    console.log(props)
    this.playLoop()
  }, [props])
}