import { Component, useEffect, useState } from 'react'
import MIDISounds from 'midi-sounds-react'
import InstrumentSequencer from './InstrumentSequencer'
import DrumSequencer from './DrumSequencer'

import { unpackTrackObject, packTrackObject } from './helpers/Data'

class MidiSoundsSequencer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      sequencerType: 'instrument',
      drums: [],
      instruments: [],
      sequence: [],
    }
  }

  // todo
  // control logic so that loop can't be started when no sequence is loaded
  startLoop(loop) {
    this.setState( { sequence: loop })
    console.log('loop', loop)
    // if (loop[0][1].length){
    //   console.log('undefined', loop[0][1][0][1])
    // }
    if (this.midiSounds.loopStarted) {
      this.midiSounds.stopPlayLoop()
      this.setState( { playing: this.midiSounds.loopStarted })
      console.log('stopped')
    } else {
      this.midiSounds.startPlayLoop(loop, 120, 1 / 16)
      this.setState( { playing: this.midiSounds.loopStarted })
      console.log('playing')
    }
  }

  playNote(chord) {
    const { instrument, note, duration } = chord
    this.midiSounds.playChordNow(instrument, note, duration)
  }

  loadInstrument(instrument) {
    this.midiSounds.cacheInstrument(instrument)
  }

  loadSequence() {
    let sequenceObject = JSON.parse(localStorage.getItem('trackData'))
    sequenceObject = unpackTrackObject(sequenceObject)
    const { grid, sequence, instrument, tempo } = sequenceObject
    this.setState({ sequence: sequence })
    console.log('sequence state', this.state.sequence)
  }

  setSequencerType(e) {
    this.setState({ sequencerType: e.target.value })
    console.log(this.state.sequencerType)
  }

  saveData(e) {
    this.props.saveData()
    console.log('save in mdisounds')
  }

  testFunction(e) {
    console.log('test')
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
          <h4>Sequencer Type</h4>
          {/* <button onClick={this.saveData.bind(this)}>Save</button> */}
          <select onChange={this.setSequencerType.bind(this)} className='mb-3'>
            <option name='sequencerType' value='instrument'>Instrument</option>
            <option name='sequencerType' value='drum'>Drum</option>
          </select>
          <InstrumentSequencer
            startLoop={this.startLoop.bind(this)}
            playNote={this.playNote.bind(this)}
            loadInstrument={this.loadInstrument.bind(this)}
            setTrackData={this.props.setTrackData}
            trackData={this.props.trackData}
            playing={this.state.playing}
            testFunction={this.testFunction.bind(this)}
          /> 
          {/* <DrumSequencer/>  */}
        </div>
      </div>
    )
  }
}

export default MidiSoundsSequencer
