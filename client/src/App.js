import { useEffect, useState } from 'react'
import axios from 'axios'
// Bootstrap Components 
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


// Components 
import MIDISounds from 'midi-sounds-react'


const App = () => {

  const midisounds = new MIDISounds({})

  // ! State
  const [ instruments, setInstruments ] = useState([])
  const [ currentInstrument, setCurrentInstrument ] = useState([1])
  const [ grid, setGrid ] = useState([])
  const [ sequence, setSequence ] = useState([])
  const [ selected, setSelected ] = useState(false)
  const [ isPlaying, setIsPlaying ] = useState(false)
  
  // ! Execution
  useEffect(() => {
    setInstruments(getInstrumentNames())
    setGrid(createGrid(16, 7))
    midisounds.cacheInstrument(currentInstrument)
    console.log(midisounds)
    midisounds.targetOpenModal
  }, [])

  // Takes row and column amount and returns an array in format:
  // grid = row(n)[cols(n)]
  const createGrid = (cols, rows) => {
    const grid = []
    const sequence = []
    for (let i = 0; i < cols; i++){
      const currentCol = []
      sequence.push([[], []])
      for (let i = 0; i < rows; i++){
        currentCol.push(i)
      }
      grid.push(currentCol)
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
    console.log('note = ', row + 54)
    //setSelected(true)
    this.setState({
      selectedOption: e.target.value,
    })
    if (state){
      sequence[col][1] = [[ instrument, [-row + 50], 2 / 16]]
    } else {
      sequence[col] = [[], []]
    }
  }

  const playLoop = (e) => {
    // instrument, note, duration
    //midisounds.playChordNow(currentInstrument, [50], 0.2)
    // instruments, BPM, Time Signature
    midisounds.startPlayLoop(sequence, 120, 1 / 16)
    console.log('loopStarted -> ', midisounds.loopStarted)
  }

  const stopLoop = (e) => {
    // const settings = new midisounds.showPropertiesDialog({})
    // settings.showPropertiesDialog
    midisounds.stopPlayLoop()
    console.log('loopStarted -> ', midisounds.loopStarted)
  }



  const changeInstrument = (e) => {
    // stop current loop
    midisounds.stopPlayLoop()
    setCurrentInstrument(e.target.value)
    console.log(midisounds.player.loader.instrumentInfo(currentInstrument).title)
    midisounds.cacheInstrument(e.target.value)
  }

  const clearSequence = (e) => {
    console.log('clear')
    //midisounds.stopPlayLoop()
    const seq = sequence.map(col => {
      return [[], []]
    })
    setSequence(seq)
    setSelected(false)
  }


  // ! JSX
  return (
    <div className="page-wrapper">
      <h1>co_lab Prototype</h1>
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
      <Container className='grid-container'>
        {grid.map((row, rowId) => {
          return (
            <div key={rowId}>
              <p>{rowId}</p>
              {grid[rowId].map((col, colId) => {
                return (
                  <div key={colId}>
                    <input type="radio" name={rowId} id={colId} onChange={generateSequenceData} checked={this.state.selectedOption === rowId}></input>
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
