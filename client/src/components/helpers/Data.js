export const playButton = ({ handleClick }) => {
  return (
    <button onClick={() => handleClick}>Play</button>
  )
}

// Takes row and column amount and returns an array in format:
// grid = row(n)[cols(n)]
export const createSequencerGrid = (cols, rows) => {
  const grid = []
  for (let i = 0; i < cols; i++){
    const currentCol = []
    for (let i = 0; i < rows; i++){
      currentCol.push({ isChecked: false  })
    }
    grid.push(currentCol)
  }
  return grid
}

// Takes column amount and returns an empty sequence array in the form
// [[], []].... * cols
export const createEmptySequence = (cols) => {
  const sequence = []
  for (let i = 0; i < cols; i++){
    sequence.push([[], []])
  }
  return sequence
}

// Function that takes a trackObject and returns a sequenceData object in the form:
// { grid: [{}], sequence: [[][instrument, [note], duration]] }
export const unpackTrackObject = (trackObject) => {
  console.log('track object to pack ->', trackObject)
  const { instrumentGridSize, midiTranspose, tempo  } = trackObject[0]
  const notes = trackObject.map(cell => {
    if (cell.note){
      return [cell.note[0], cell.note[1], cell.note[2]]
    } else {
      return []
    }
  })

  // create an empty sequence that has the same number of steps as columns in grid
  const sequence = createEmptySequence(instrumentGridSize.cols)
  // create an empty grid using the number of rows/cols on trackObject
  const grid = createSequencerGrid(instrumentGridSize.cols, instrumentGridSize.rows)

  // create sequence data from trackObject
  const newSequence = grid.map((row, col) => {
    if (trackObject[col].isChecked){
      return [[], [notes[col]]]
    } else {
      return [[],[]]
    }
  })

  // create gridData from trackObject
  const newGrid = grid.map((rowId, col) => {
    if (trackObject[col].isChecked){
      const note = notes[col][1][0] 
      const row =  -note + midiTranspose
      console.log('row ->', row)
      console.log('rowId ->', rowId)
      console.log('note ->', note)
      const newRow = rowId[row] = [...rowId]  
      newRow[row].isChecked = true
      return newRow
    } else {
      return [ ...rowId ]
    }
  })
  console.log('new grid', newGrid)
  console.log('new sequence', newSequence)
  const sequenceObject = {
    grid: newGrid,
    sequence: newSequence,
  }
  return sequenceObject
}

// Function that takes sequence and grid data and returns a track object in the form:
// { isChecked: bool, drums: [int], note: [intrument, [note], duration],  }..... * length of grid
export const packTrackObject = (sequenceData) => {
  const { grid, sequence, midiTranspose, instrumentGridSize, tempo } = sequenceData
  console.log('sequence to pack ->', sequenceData)
  // return array of just the selected cells
  let trackObject  = grid.map(col => {
    return col.filter(cell => cell.isChecked === true)
  })
  trackObject.instrumentGridSize = instrumentGridSize
  trackObject.tempo = tempo
  // If cell is checked populate cell with instrument and note data
  trackObject = trackObject.map((cell, index) => {
    let note
    let duration
    let instrument
    if (sequence[index][1][0] ) {
      instrument = sequence[index][1][0][0]
      note = sequence[index][1][0][1]
      duration = sequence[index][1][0][2]
    }
    if (cell[0]) {
      return { 
        ...cell[0], 
        drums: [], 
        note: [instrument, note , duration], 
        midiTranspose: midiTranspose,
        instrumentGridSize: instrumentGridSize,
        tempo: tempo,
      }
    } else {
      return { 
        isChecked: false, 
        instrumentGridSize: instrumentGridSize,
        tempo: tempo,
        midiTranspose: midiTranspose  }
    }
  })

  // drums: [], notes: [instrument], duration: duration 
  // const updatedGrid = [...grid]
  // updatedGrid[colId] = updatedGrid[colId].map((row, index) => {
  //   if (index === rowId) {
  //     return { ...row, isChecked: isChecked, instrument: currentInstrument, note: note, duration: NOTE_LENGTH }
  //   } else {
  //     return { ...row, isChecked: false, instrument: '', note: 0, duration: '' }
  //   }
  // })
  // create a new variable and set it equal to updated grid
  //let tempTrackState = [...updatedGrid]
  // return array of just the selected cells
  // tempTrackState = tempTrackState.map(col => {
  //   return col.filter(cell => cell.isChecked === true)
  // })
  // set track state equal to array of selected cells in structure:
  // isChecked: true
  // instrument: [currentInstrument]
  // note: -row + MIDI_TRANSPOSE
  // duration: 1 / 16
  //setTrackState(tempTrackState)
  // Play note when cell is clicked but not when toggled off
  return (trackObject)
}