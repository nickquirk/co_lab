import { useEffect, useState } from 'react'

// Bootstrap Components 
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


// Components 
import MIDISounds from 'midi-sounds-react'

const InstrumentSequencer = () => {

  // Instead of passing values to the play functions, we 
  //should create and then just change the state of the midi sounds object 
  const midisounds = new MIDISounds({})

  // ! Vars
  const MIDI_TRANSPOSE = 54
  const ROWS = 7
  const COLS = 16

  // ! State
  const [ instruments, setInstruments ] = useState([])
  const [ currentInstrument, setCurrentInstrument ] = useState([1])
  const [ grid, setGrid ] = useState([])
  const [ sequence, setSequence ] = useState([])
  
  // ! Execution
  useEffect(() => {
    setInstruments(getInstrumentNames())
    setGrid(createGrid(COLS, ROWS))
    midisounds.cacheInstrument(currentInstrument)
  }, [])

  // Takes row and column amount and returns an array in format:
  // grid = row(n)[cols(n)]
  const createGrid = (cols, rows) => {
    const makeGrid = []
    const makeSequence = []
    for (let i = 0; i < cols; i++){
      const currentCol = []
      makeSequence.push([[], []])
      for (let i = 0; i < rows; i++){
        currentCol.push({ isChecked: false  })
      }
      makeGrid.push(currentCol)
    }
    setSequence(makeSequence)
    return makeGrid
  }

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
        col[1][0][0] = currentInstrument
      }
    })
  }, [currentInstrument])

  // Generate new sequence data each time a cell is clicked
  const generateSequenceData = (rowId, colId, isChecked) => {
    console.log('isChecked', isChecked)
    isChecked = !isChecked
    const instrument = parseInt(currentInstrument)
    const note = -rowId + MIDI_TRANSPOSE
    const newSequence = [...sequence]
    if (isChecked){
      newSequence[colId][1] = [[ instrument, [note], 2 / 16]]
    } else {
      newSequence[colId] = [[], []]
    }
    setSequence(newSequence)
    const updatedGrid = [...grid]
    updatedGrid[colId] = updatedGrid[colId].map((row, index) => {
      if (index === rowId) {
        return { ...row, isChecked: isChecked }
      } else {
        return { ...row, isChecked: false }
      }
    })
    // Play note when cell is clicked but not when toggled off
    if (isChecked) {
      midisounds.playChordNow(currentInstrument, [note], 0.2)
    }
    setGrid(updatedGrid)
  }

  // Play sequence 
  const playLoop = (e) => {
    // instruments, BPM, Time Signature
    midisounds.startPlayLoop(sequence, 120, 1 / 16)
    console.log('loopStarted -> ', midisounds.loopStarted)
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
  const saveSequence = (e) => {
    console.log('sequenced saved')
    const trackData = {
      gridData: grid,
      sequenceData: sequence,
    }
    localStorage.setItem('trackData', JSON.stringify(trackData))
  }

  // Load sequence from memory
  const loadSequence = (e) => {
    console.log('load')
    const trackToLoad = JSON.parse(localStorage.getItem('trackData'))
    const gridToLoad = trackToLoad.gridData
    const sequenceToLoad = trackToLoad.sequenceData
    setGrid(gridToLoad)
    setSequence(sequenceToLoad)
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