import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Bootstrap Components 
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


// Components 
import MIDISounds from 'midi-sounds-react'

// Custom Imports 
import { packTrackObject, unpackTrackObject, createSequencerGrid, createEmptySequence } from './helpers/Data'
import axios from 'axios'
import { getToken } from './helpers/Auth'

const InstrumentSequencer = ({ startLoop, trackData, setTrackData }) => {

  const { fragmentId } = useParams()
  // ! Instead of passing values to the play functions, we 
  // ! should create and then just change the state of the midi sounds object 
  const midisounds = new MIDISounds({})

  // ! Vars
  const MIDI_TRANSPOSE = 54
  const ROWS = 7
  const COLS = 16
  const NOTE_LENGTH = 2 / 16
  const TEMPO = 120

  // ! State
  const [ instruments, setInstruments ] = useState([])
  const [ currentInstrument, setCurrentInstrument ] = useState([1])
  const [ grid, setGrid ] = useState([])
  const [ sequence, setSequence ] = useState([])
  const [ tempo, setTempo ] = useState()
  
  // ! Execution
  useEffect(() => {
    setInstruments(getInstrumentNames())
    setGrid(createSequencerGrid(COLS, ROWS))
    setSequence(createEmptySequence(COLS))
    midisounds.cacheInstrument(currentInstrument)
  }, [])

  const getInstrumentNames = () => {
    const instNames = []
    const instKeysLen = midisounds.player.loader.instrumentKeys().length
    for (let i = 0; i < instKeysLen; i++) {
      instNames.push(midisounds.player.loader.instrumentInfo(i).title)
    }
    return instNames
  }
  // Update current instrument across all steps 
  useEffect(() =>{
    sequence.forEach( col => {
      if (col[1][0]) {
        col[1][0][0] = parseInt(currentInstrument)
      }
    })
  }, [currentInstrument])

  // Generate new sequence data each time a cell is clicked
  const generateSequenceData = (rowId, colId, isChecked) => {
    // set isChecked to opposite of what it was
    isChecked = !isChecked
    // create local variables 
    const instrument = parseInt(currentInstrument)
    const note = -rowId + MIDI_TRANSPOSE
    const newSequence = [...sequence]
    const updatedGrid = [...grid]
    // Build sequence from trackState object
    if (isChecked){
      newSequence[colId][1] = [[ instrument, [note], NOTE_LENGTH]]
    } else {
      newSequence[colId] = [[], []]
    }
    // Set sequence = new sequence thats been generated
    setSequence(newSequence)
    // update grid with new state
    updatedGrid[colId] = updatedGrid[colId].map((row, index) => {
      if (index === rowId) {
        return { ...row, isChecked }
      } else {
        return { ...row, isChecked: false }
      }
    })
    if (isChecked) {
      midisounds.playChordNow(currentInstrument, [note], NOTE_LENGTH)
    }
    setGrid(updatedGrid)
  }

  // Play sequence 
  const playLoop = (e) => {
    // instruments, BPM, Time Signature
    midisounds.startPlayLoop(sequence, TEMPO, NOTE_LENGTH)
    console.log('loopStarted -> ', midisounds.loopStarted)
    startLoop(sequence)
  }

  // Stop sequence
  const stopLoop = (e) => {
    midisounds.stopPlayLoop()
    console.log('loopStarted -> ', midisounds.loopStarted)
  }

  // Change instrument 
  const changeInstrument = (e) => {
    // stop current loop
    midisounds.stopPlayLoop()
    setCurrentInstrument(e.target.value)
    console.log(midisounds.player.loader.instrumentInfo(currentInstrument).title)
    midisounds.cacheInstrument(e.target.value)
  }

  // Clear sequence 
  const clearSequence = (e) => {
    const seq = sequence.map(col => {
      return [[], []]
    })
    let clearGrid = [...grid]
    clearGrid = clearGrid.map(col => {
      return col.map(row => {
        return { isChecked: false }
      })
    })
    setSequence(seq)
    setGrid(clearGrid)
  }

  // Save sequence to memory as an object
  const saveSequence = async (e) => {
    console.log('sequenced saved')
    const sequenceData = {
      instrumentGridSize: { rows: ROWS, cols: COLS },
      grid: grid,
      sequence: sequence,
      midiTranspose: MIDI_TRANSPOSE,
      tempo: TEMPO,
    }
    const packedObject =  JSON.stringify(packTrackObject(sequenceData))
    localStorage.setItem('trackData', packedObject)
    try {
      const { data } = await axios.post('/api/fragments/', { data: packedObject, fragment: parseInt(fragmentId), instrument: currentInstrument[0] }, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      //navigate('/fragments')
      console.log(data)
    } catch (err) {
      console.log(err.message)
    }
  }

  // Load sequence from memory
  const loadSequence = (e) => {
    console.log('load')
    let sequenceObject = JSON.parse(localStorage.getItem('trackData'))
    sequenceObject = unpackTrackObject(sequenceObject)
    const { grid, sequence, instrument, tempo } = sequenceObject
    setGrid(grid)
    setSequence(sequence)
    setCurrentInstrument(instrument)
    setTempo(tempo)
  }


  // ! JSX
  return (
    <Container className="component-wrapper">
      <select
        onChange={changeInstrument}
        name="instruments"
        id="instrument-select"
        className="dropdown"
      >
        {instruments.map((inst, i) => {
          return (
            <option key={i} name={inst} value={i}>{`${inst}`}</option>
          )
        })
        }
      </select>
      <button onClick={playLoop}>Play</button>
      <button onClick={stopLoop}>Stop</button>
      <button onClick={clearSequence}>Clear</button>
      <button onClick={saveSequence}>Save</button>
      <button onClick={loadSequence}>Load</button>
      <Container className='instrument-grid-container'>
        {grid.map((col, colId) => {
          return (
            <div key={colId} className='mt-3'>
              {grid[colId].map((cell, rowId) => {
                return (
                  <div key={rowId}>
                    <Cell
                      rowId = {rowId}
                      colId = {colId}
                      generateSequenceData = {generateSequenceData}
                      isChecked = {cell.isChecked}
                    />
                  </div>
                )
              })}
            </div>
          )
        })
        }
      </Container>
    </Container>
  )
}

export default InstrumentSequencer

// ? Cell component
// Creates Cell component which is a clickable, state aware div forms the basis of the grid
const Cell = ({ rowId, colId, generateSequenceData, isChecked  }) => {
  return <div onClick={() => generateSequenceData(rowId, colId, isChecked)} style={{ width: '20px', height: '20px', padding: '5px', backgroundColor: isChecked ? '#0722A1' : '#FFC300' }} ></div>
}