import { useEffect, useState } from 'react'
import axios from 'axios'
// Bootstrap Components 
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


// Components 
import MIDISounds from 'midi-sounds-react'
import { createPath } from 'react-router-dom'


const App = () => {

  const midisounds = new MIDISounds({})

  // ! State
  const [ instruments, setInstruments ] = useState([])
  const [ currentInstrument, setCurrentInstrument ] = useState([1])
  const [ grid, setGrid ] = useState([])
  const [ sequence, setSequence ] = useState([])
  // instrument, note, duration
  const seqData = [
    [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [30], 2 / 16]]], [[], []], [[], [[currentInstrument, [31], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [26], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [30], 2 / 16]]], [[], []], [[], [[currentInstrument, [31], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [28], 2 / 16]]], [[], []], [[], [[currentInstrument, [33], 2 / 16]]], [[], []]
  ]

  
  // ! Execution
  useEffect(() => {
    setInstruments(getInstrumentNames())
    setGrid(createGrid(16, 7))
    midisounds.cacheInstrument(currentInstrument)
  }, [])

  // Takes row and column amount and returns an array in format:
  // grid = row(n)[cols(n)]
  const createGrid = (cols, rows) => {
    const grid = []
    const sequence = []
    for (let i = 0; i < cols; i++){
      const currentRow = []
      sequence.push([[], []])
      for (let i = 0; i < rows; i++){
        currentRow.push(i)
      }
      grid.push(currentRow)
    }
    setSequence(sequence)
    return grid
  }

  const getInstrumentNames = () => {
    const instNames = []
    const instKeysLen = midisounds.player.loader.instrumentKeys().length
    for (let i = 0; i < instKeysLen; i++) {
      instNames.push(midisounds.player.loader.instrumentInfo(i).title)
    }
    return instNames
  }
  useEffect(() =>{
    sequence.forEach( col => {
      if (col[1][0]) {
        col[1][0][0] = currentInstrument
      }
    })
  }, [currentInstrument])

  const generateSequenceData = (e) => {
    console.log('col ->', e.target.name)
    console.log('row ->', e.target.id)
    console.log('state ->', e.target.checked)
    const col = parseInt(e.target.name)
    const row = parseInt(e.target.id)
    const state = e.target.checked
    const instrument = parseInt(currentInstrument)
    console.log('generateSequenceData: Current intrument -> ', currentInstrument)
    console.log('note = ', row + 54)
    if (state){
      sequence[col][1] = [[ instrument, [-row + 50], 2 / 16]]
    } else {
      sequence[col] = [[], []]
    }
    //console.log(sequence)
  }

  const playLoop = (e) => {
    // instrument, note, duration
    //midisounds.playChordNow(currentInstrument, [50], 0.2)
    // instruments, BPM, Time Signature
    midisounds.startPlayLoop(sequence, 120, 1 / 16)
  }

  const handleChange = (e) => {
    // stop current loop
    midisounds.stopPlayLoop()
    setCurrentInstrument(e.target.value)
    console.log(midisounds.player.loader.instrumentInfo(currentInstrument).title)
    midisounds.cacheInstrument(e.target.value)
    
  }

  const stopLoop = (e) => {
    // const settings = new midisounds.showPropertiesDialog({})
    // settings.showPropertiesDialog
    midisounds.stopPlayLoop()
  }

  // ! JSX
  return (
    <div className="page-wrapper">
      <h1>co_lab Prototype</h1>
      <select
        onChange={handleChange}
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
      <Container className='grid-container'>
        {grid.map((row, rowId) => {
          return (
            <div key={rowId}>
              <p>{rowId}</p>
              {grid[rowId].map((col, colId) => {
                return (
                  <div key={colId}>
                    <input type="radio" name={rowId} id={colId} onChange={generateSequenceData}></input>
                  </div>
                )
              })}
            </div>
          )
        })
        }
      </Container>
    </div>
  )
}

export default App
