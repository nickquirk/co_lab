import { useEffect, useState } from 'react'

// Bootstrap Components 
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

// Components 
import MIDISounds from 'midi-sounds-react'

// This component builds up the beat data array from user input
// The beat data array is then saved to the database 
const DrumSequencer = () => {

  // ! Variables
  const ROWS = 4
  const COLS = 16

 
  // ! State
  const [ drums, setDrums ] = useState([])
  const [ currentDrum0, setCurrentDrum0 ] = useState(1)
  const [ currentDrum1, setCurrentDrum1 ] = useState(1)
  const [ currentDrum2, setCurrentDrum2 ] = useState(1)
  const [ currentDrum3, setCurrentDrum3 ] = useState(1)
  const [ grid, setGrid ] = useState([])
  const [ sequence, setSequence ] = useState([])
  const [ trackState, setTrackState ] = useState({})

  // Instead of passing values to the play functions, we 
  //should create and then just change the state of the midi sounds object 
  const midiSounds = new MIDISounds({})

  
  // ! Execution
  // This use effect executes on page load:
  // 1. Gets and sets all of the drum names and dynamically populates the dropdown 
  // 2. Creates the sequencer grid
  // 3. Creates a trackState object
  // 4. Creates an empty sequence 
  useEffect(() => {
    //console.log('midisounds state ->', midiSounds.state)
    setDrums(getDrumNames())
    setGrid(createGrid(COLS, ROWS))
    // Create empty sequence
    setSequence(makeSequence(COLS))
    // set trackState to a new object with empty drum track data in
    setTrackState({ ...makeTrackObject(COLS, ROWS) })
    midiSounds.cacheDrum(currentDrum0)
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
    midiSounds.state.drums  = 2
    //console.log('midisounds state after ->', midiSounds.state)
    return makeGrid
  }

  // Dynamically creates a blank sequence with amount of steps  = columns in grid
  const makeSequence = (cols) => {
    const blankSequence = []
    for (let i = 0; i < cols; i++){
      blankSequence.push([[], []])
    }
    return blankSequence
  }

  // Based on rows and cols dynamically creates a blank drum track object to store state of each drum beat
  const makeTrackObject = (cols, rows) => {
    const trackObject = []
    const tempObject = {}
    for (let i = 0; i < rows; i++){
      tempObject[`drum${i}`] = [currentDrum0, false]
    }
    for (let i = 0; i < cols; i++){
      trackObject.push(tempObject) 
    }
    return trackObject
  } 

  // Load drum names from MIDISounds object
  const getDrumNames = () => {
    const drumNames = []
    const drumKeysLen = midiSounds.player.loader.drumKeys().length
    for (let i = 0; i < drumKeysLen; i++) {
      drumNames.push(midiSounds.player.loader.drumInfo(i).title)
    }
    return drumNames
  }
  // Update current drum across all steps in the sequence
  // sequence[colId] = [[drum],[]]
  useEffect(() =>{
    sequence.forEach( col => {
      if (col[0][0]) {
        col[0][0] = currentDrum0
      }
    })
  }, [currentDrum0])

  // Generate new sequence data each time a cell is clicked
  const updateSequenceData = (rowId, colId, isChecked) => {
    isChecked = !isChecked
    const sequenceObject = trackState
    const drum = currentDrum0
    const newSequence = [...sequence]
    console.log(sequenceObject[colId][`drum${rowId}`])
    if (isChecked){
      // Update sequenceObject to reflect cell thats been selected
      sequenceObject[colId][`drum${rowId}`] = [drum, isChecked]
      //newSequence[colId][rowId] = [drum], []
    } else {
      //newSequence[colId] = [[], []]
      sequenceObject[colId][`drum${rowId}`] = [drum, false]
    }
    setTrackState(sequenceObject)
    console.log(sequenceObject[0])
    for (let i = 0; i < COLS; i++) {
      console.log('sequenceObjtect -> ',sequenceObject[colId][`drum${rowId}`][1])
      if (sequenceObject[colId][`drum${rowId}`][1]){
        newSequence[colId][0][rowId] = drum
      } else {
        if (newSequence[colId][0][rowId]) {
          newSequence[colId][0].splice(rowId, rowId + 1)
        }
        
      }
    }

    // for (const [key, value] of Object.entries(sequenceObject)) {

    //   console.log(`${key}: ${value.drum1[1]}`)
    // }
    setSequence(newSequence)
    // create a shallow copy of grid 
    const updatedGrid = [...grid]
    // create variable for cell thats been clicked on
    const selectedCell = updatedGrid[rowId][colId]
    // update cell value in row, keeping all other values in row
    selectedCell.isChecked = isChecked  
    // play drum sound if cell is toggled on but not off
    if (isChecked){
      console.log('current drum ->', currentDrum0)
      midiSounds.playDrumsNow([drum])
    }
    // Update the grid to be the new grid
    setGrid(updatedGrid)
  }

  // Play sequence 
  const playLoop = (e) => {
    // drum, BPM, Time Signature
    midiSounds.startPlayLoop(sequence, 120, 1 / 16)
    console.log('loopStarted -> ', midiSounds.loopStarted)
  }

  // Stop sequence
  const stopLoop = (e) => {
    midiSounds.stopPlayLoop()
    console.log('loopStarted -> ', midiSounds.loopStarted)
  }

  // Change Drum
  const changeDrum = (e) => {
    // stop current loop
    midiSounds.stopPlayLoop()
    setCurrentDrum0(parseInt(e.target.value))
    midiSounds.cacheDrum(e.target.value)
    midiSounds.state.drums = currentDrum0
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
                      updateSequenceData={updateSequenceData}
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
const Cell = ({ rowId, colId, updateSequenceData, isChecked  }) => {
  return <div onClick={() => updateSequenceData(rowId, colId, isChecked)} style={{ width: '20px', height: '20px', padding: '5px', backgroundColor: isChecked ? '#0722A1' : '#FFC300' }} ></div>
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