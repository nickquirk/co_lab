import { useEffect, useState } from 'react'

// Bootstrap Components 
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


// Components 
import MIDISounds from 'midi-sounds-react'

const DrumSequencer = () => {

  const midisounds = new MIDISounds({})

  // ! Vars
  const MIDI_TRANSPOSE = 54

  // ! State
  const [ drums, setDrums ] = useState([])
  const [ currentDrum, setCurrentDrum ] = useState([1])
  const [ grid, setGrid ] = useState([])
  const [ sequence, setSequence ] = useState([])
  
  // ! Execution
  useEffect(() => {
    setDrums(getDrumNames())
    setGrid(createGrid(16, 4))
    midisounds.cacheDrum(currentDrum)
  }, [])

  // Takes row and column amount and returns an array in format:
  // grid = row(n)[cols(n)]
  const createGrid = (cols, rows) => {
    const makeGrid = []
    const makeSequence = []
    for (let i = 0; i < rows; i++){
      const currentRow = []
      makeSequence.push([[], []])
      for (let i = 0; i < cols; i++){
        currentRow.push(false)
      }
      makeGrid.push(currentRow)
    }
    setSequence(makeSequence)
    console.log(makeGrid)
    return makeGrid
  }

  const getDrumNames = () => {
    const drumNames = []
    const drumKeysLen = midisounds.player.loader.drumKeys().length
    for (let i = 0; i < drumKeysLen; i++) {
      drumNames.push(midisounds.player.loader.drumInfo(i).title)
    }
    return drumNames
  }
  // Update current drum across all steps 
  useEffect(() =>{
    sequence.forEach( col => {
      if (col[1][0]) {
        col[1][0][0] = currentDrum
      }
    })
  }, [currentDrum])

  // Generate new sequence data each time a cell is clicked
  const generateSequenceData = (rowId, colId, isChecked) => {
    const drum = parseInt(currentDrum)
    const newSequence = [...sequence]
    if (!isChecked){
      newSequence[colId][0] = [drum], []
    } else {
      newSequence[colId] = [[], []]
    }
    setSequence(newSequence)
    const updatedGrid = [...grid]
    updatedGrid[colId] = updatedGrid[colId].map((row, index) =>  index === rowId)
    setGrid(updatedGrid)
    midisounds.playDrumsNow(currentDrum, [])
    console.log('is Checked ', isChecked)
    console.log('sequence ->', sequence)
  }

  // Play sequence 
  const playLoop = (e) => {
    // drum, BPM, Time Signature
    midisounds.startPlayLoop(sequence, 120, 1 / 16)
    console.log('loopStarted -> ', midisounds.loopStarted)
  }

  // Stop sequence
  const stopLoop = (e) => {
    midisounds.stopPlayLoop()
    console.log('loopStarted -> ', midisounds.loopStarted)
  }

  // Change Drum
  const changeDrum = (e) => {
    // stop current loop
    midisounds.stopPlayLoop()
    setCurrentDrum(e.target.value)
    console.log(midisounds.player.loader.drumInfo(currentDrum).title)
    midisounds.cacheDrum(e.target.value)
  }

  // Clear sequence 
  const clearSequence = (e) => {
    const seq = sequence.map(col => {
      return [[], []]
    })
    let clearGrid = [...grid]
    clearGrid = clearGrid.map(col => {
      return col.map(row => {
        return false
      })
    })
    setSequence(seq)
    setGrid(clearGrid)
  }

  // Save sequence to memory as an object
  const saveSequence = (e) => {
    console.log('sequenced saved')
    const drumTrackData = {
      gridData: grid,
      sequenceData: sequence,
    }
    localStorage.setItem('drumTrackData', JSON.stringify(drumTrackData))
  }

  // Load sequence from memory
  const loadSequence = (e) => {
    console.log('load')
    const trackToLoad = JSON.parse(localStorage.getItem('drumTrackData'))
    const gridToLoad = trackToLoad.gridData
    const sequenceToLoad = trackToLoad.sequenceData
    setGrid(gridToLoad)
    setSequence(sequenceToLoad)
  }


  // ! JSX
  return (
    <div className="page-wrapper">
      <h2>Drum Sequencer</h2>
      <button onClick={playLoop}>Play</button>
      <button onClick={stopLoop}>Stop</button>
      <button onClick={clearSequence}>Clear</button>
      <button onClick={saveSequence}>Save</button>
      <button onClick={loadSequence}>Load</button>
      <Container className='drum-grid-container'>
        {grid.map((row, rowId) => {
          return (
            <div key={rowId}>
              {grid[rowId].map((col, colId) => {
                return (
                  <p key={colId}>{colId}</p>
                )
              })}
              <p key={rowId}>{rowId}</p>
            </div>
          )
        })
        }
      </Container>
    </div>
  )
}

export default DrumSequencer

// ? Cell component
// Creates Cell component which is a clickable, state aware div forms the basis of the grid
const Cell = ({ rowId, colId, generateSequenceData, isChecked  }) => {
  return <div onClick={() => generateSequenceData(rowId, colId, isChecked)} style={{ width: '20px', height: '20px', padding: '5px', backgroundColor: isChecked ? '#0722A1' : '#FFC300' }} ></div>
}

// ? Drum Select component 
const DrumSelect = ({ key, drums, changeDrum }) => {
  return (
    <div key={key}>
      <select
        onChange={changeDrum}
        name="drums"
        id="drums-select"
        className="dropdown"
      >
        {drums.map((drum, i) => {
          return (
            <option key={i} name={drum} value={i}>{`${drum}`}</option>
          )
        })
        }
      </select>
    </div>
    
  )
}