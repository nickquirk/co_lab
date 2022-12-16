import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Bootstrap Components 
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


// Components ≤l
import MIDISounds from 'midi-sounds-react'

// Custom Imports 
import { packTrackObject, unpackTrackObject, createSequencerGrid, createEmptySequence } from './helpers/Data'
import axios from 'axios'
import { getToken } from './helpers/Auth'

const InstrumentSequencer = ({ startLoop, trackData, setTrackData, playing, playNote, loadInstrument }) => {

  const { fragmentId } = useParams()
  // ! Instead of passing values to the play functions, we 
  // ! should create and then just change the state of the midi sounds object 
  const midisounds = new MIDISounds({})



  // ! State
  const [ instruments, setInstruments ] = useState([])
  const [ currentInstrument, setCurrentInstrument ] = useState(1)
  const [ grid, setGrid ] = useState([])
  const [ sequence, setSequence ] = useState([])
  const [ tempo, setTempo ] = useState()
  const [ sequenceLength, setSequenceLength ] = useState(16)

  // ! Vars
  const MIDI_TRANSPOSE = 54
  const ROWS = 14
  const COLS = sequenceLength
  const NOTE_LENGTH = 2 / 16
  const TEMPO = 120


  // ! Location
  const navigate = useNavigate()
  
  // ! Execution
  useEffect(() => {
    setInstruments(getInstrumentNames())
    setGrid(createSequencerGrid(COLS, ROWS))
    setSequence(createEmptySequence(COLS))
    //midisounds.cacheInstrument(currentInstrument)
  }, [])

  useEffect(() => {
    setGrid(createSequencerGrid(COLS, ROWS))
  }, [sequenceLength])

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
      playNote({ instrument: currentInstrument, note: [note],duration: NOTE_LENGTH })
    }
    setGrid(updatedGrid)
  }

  // Call playLoop function in MidiSounds Object
  const playLoop = (e) => {
    console.log(sequence)
    startLoop(sequence)
  }

  // Change instrument 
  const changeInstrument = (e) => {
    // stop current loop
    setCurrentInstrument(e.target.value)
    loadInstrument(e.target.value)
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
      trackType: 'instrument',
      instrument: currentInstrument,
      instrumentGridSize: { rows: ROWS, cols: COLS },
      grid: grid,
      sequence: sequence,
      midiTranspose: MIDI_TRANSPOSE,
      tempo: TEMPO,
    }
    const packedObject =  JSON.stringify(packTrackObject(sequenceData))
    localStorage.setItem('trackData2', packedObject)
    try {
      const { data } = await axios.post('/api/tracks/', { data: packedObject, fragment: parseInt(fragmentId) }, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate('/fragments')
    } catch (err) {
      console.log(err.message)
    }
  }

  // Load sequence from memory
  const loadSequence = (e) => {
    console.log('sequence loaded')
    let sequenceObject = JSON.parse(localStorage.getItem('trackData2'))
    sequenceObject = unpackTrackObject(sequenceObject)
    const { grid, sequence, instrument, tempo } = sequenceObject
    setGrid(grid)
    setSequence(sequence)
    setCurrentInstrument(instrument)
    setTempo(tempo)
  }

  const changeSquenceLength = (e) => {
    console.log(e.target.value)
    setSequenceLength(parseInt(e.target.value))
  }


  // ! JSX
  return (
    <Container className="component-wrapper sequencer-container">
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
      <button onClick={playLoop}>{playing ? 'Stop' : 'Start'}</button>
      <button onClick={clearSequence}>Clear</button>
      <button onClick={saveSequence}>Save</button>
      <form className='d-flex flex-row' onChange={changeSquenceLength}>
        <label>Sequence Length: </label>
        <label htmlFor='16'>16</label>
        <input type='radio' name='sequence-length' value='16' id='16'></input>
        <label htmlFor='32'>32</label>
        <input type='radio' name='sequence-length' value='32' id='32'></input>
      </form>
      <div className='instrument-grid-container'>
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
      </div>
    </Container>
  )
}

export default InstrumentSequencer

// ? Cell component
// Creates Cell component which is a clickable, state aware div forms the basis of the grid
const Cell = ({ rowId, colId, generateSequenceData, isChecked  }) => {
  return <div className='grid-cell' onClick={() => generateSequenceData(rowId, colId, isChecked)} style={{ width: '20px', height: '20px', padding: '5px', backgroundColor: isChecked ? '#575757' : '#FFC300' }} ></div>
}