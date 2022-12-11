import { useEffect, useState } from 'react'

// Bootstrap Components 
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

// Components 
import MIDISounds from 'midi-sounds-react'

const DrumSequencer = () => {

  // Instead of passing values to the play functions, we 
  //should create and then just change the state of the midi sounds object 
  const midisounds = new MIDISounds({})
  
  // ! Variables
  const ROWS = 1
  const COLS = 16

 
  // ! State
  const [ drums, setDrums ] = useState([])
  const [ currentDrum, setCurrentDrum ] = useState(1)
  const [ grid, setGrid ] = useState([])
  const [ sequence, setSequence ] = useState([])

  
  // ! Execution
  useEffect(() => {
    console.log('midisounds state ->', midisounds.state)
    setDrums(getDrumNames())
    setGrid(createGrid(COLS, ROWS))
    midisounds.cacheDrum(currentDrum)
  }, [])

  // Takes row and column amount and returns an array in format:
  // grid = row(n)[cols(n)]
  const createGrid = (cols, rows) => {
    const makeGrid = []
    for (let i = 0; i < rows; i++){
      const currentRow = []
      for (let i = 0; i < cols; i++){
        currentRow.push({ isChecked: false  })
      }
      makeGrid.push(currentRow)
    }
    setSequence(makeSequence(cols))
    return makeGrid
  }

  // Creates a blank sequence with amount of steps  = columns in grid
  const makeSequence = (cols) => {
    const blankSequence = []
    for (let i = 0; i < cols; i++){
      blankSequence.push([[], []])
    }
    return blankSequence
  }

  // Load drum names from 
  const getDrumNames = () => {
    const drumNames = []
    const drumKeysLen = midisounds.player.loader.drumKeys().length
    for (let i = 0; i < drumKeysLen; i++) {
      drumNames.push(midisounds.player.loader.drumInfo(i).title)
    }
    return drumNames
  }
  // Update current drum across all steps in the sequence
  // sequence[colId] = [[drum],[]]
  useEffect(() =>{
    sequence.forEach( col => {
      if (col[0][0]) {
        col[0][0] = currentDrum
      }
    })
  }, [currentDrum])

  // Generate new sequence data each time a cell is clicked
  const generateSequenceData = (rowId, colId, isChecked) => {
    isChecked = !isChecked
    const drum = currentDrum
    const newSequence = [...sequence]
    if (isChecked){
      // this needs to push new drum data
      newSequence[colId][0] = [drum], []
    } else {
      newSequence[colId] = [[], []]
    }
    setSequence(newSequence)
    // create a shallow copy of grid 
    const updatedGrid = [...grid]
    // create variable for cell thats been clicked on
    const selectedCell = updatedGrid[0][colId]
    // update cell value in row, keeping all other values in row
    selectedCell.isChecked = isChecked  
    // play drum sound if cell is toggled on but not off
    if (isChecked){
      console.log('current drum ->', currentDrum)
      midisounds.playDrumsNow([drum])
    }
    // Update the grid to be the new grid
    setGrid(updatedGrid)
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
    setCurrentDrum(parseInt(e.target.value))
    midisounds.cacheDrum(e.target.value)
    midisounds.state.drums = currentDrum
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
    <Container className="component-wrapper">
      <button onClick={playLoop}>Play</button>
      <button onClick={stopLoop}>Stop</button>
      <button onClick={clearSequence}>Clear</button>
      <button onClick={saveSequence}>Save</button>
      <button onClick={loadSequence}>Load</button>
      <Container className='drum-grid-container  mt-3'>
        {grid.map((row, rowId) => {
          return (
            <div key={rowId} className="drum-row-container">
              <DrumSelect
                rowId = {rowId}
                drums = {drums}
                changeDrum = {changeDrum}
              />
              {grid[rowId].map((cell, colId) => {
                return (
                  <div key={colId}>
                    <Cell
                      rowId={rowId}
                      colId={colId}
                      generateSequenceData={generateSequenceData}
                      isChecked={cell.isChecked}
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

export default DrumSequencer

// ? Cell component
// Creates Cell component which is a clickable, state aware div. 
//Forms the basis of the grid
const Cell = ({ rowId, colId, generateSequenceData, isChecked  }) => {
  return <div onClick={() => generateSequenceData(rowId, colId, isChecked)} style={{ width: '20px', height: '20px', padding: '5px', backgroundColor: isChecked ? '#0722A1' : '#FFC300' }} ></div>
}

// ? Drum Select component
// Dropdown menu with available drum sounds  
const DrumSelect = ({ rowId, drums, changeDrum }) => {
  return (
    <div key={rowId}>
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