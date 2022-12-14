
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
  const { instrumentGridSize, midiTranspose, tempo, instrument, trackType } = trackObject[0]
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
      const newRow = rowId[row] = [...rowId]  
      newRow[row].isChecked = true
      return newRow
    } else {
      return [ ...rowId ]
    }
  })
  
  //create sequenceObject and return
  const sequenceObject = {
    grid: newGrid,
    sequence: newSequence,
    tempo: tempo,
    instrument: instrument,
    trackType: trackType,
  }
  return sequenceObject
}

// Function that takes sequence and grid data and returns a track object in the form:
// { isChecked: bool, drums: [int], note: [intrument, [note], duration],  }..... * length of grid
export const packTrackObject = (sequenceData) => {
  const { grid, sequence, midiTranspose, instrumentGridSize, tempo, instrument, trackType } = sequenceData
  //let instrument
  // return array of just the selected cells
  let trackObject  = grid.map(col => {
    return col.filter(cell => cell.isChecked === true)
  })
  // If cell is checked populate cell with instrument and note data
  trackObject = trackObject.map((cell, index) => {
    let note
    let duration
    if (sequence[index][1][0] ) {
      //instrument = sequence[index][1][0][0]
      note = sequence[index][1][0][1]
      duration = sequence[index][1][0][2]
    }
    // if there's note data then populate the cell with notedata otherwise return default cell state
    if (cell[0]) {
      return { 
        ...cell[0], 
        drums: [], 
        note: [instrument, note , duration], 
        midiTranspose: midiTranspose,
        instrumentGridSize: instrumentGridSize,
        tempo: tempo,
        instrument: instrument,
        trackType: trackType,
      }
    } else {
      return { 
        isChecked: false, 
        instrumentGridSize: instrumentGridSize,
        tempo: tempo,
        midiTranspose: midiTranspose,
        instrument: instrument,
        trackType: trackType,
      }
    }
  })
  return (trackObject)
}

// function to pack four track sequences into one Fragment track
// map through all arrays and combine into one array * seqLength
// will return an array in the form: [[drums],[[track1Inst, note, duration], [track2Inst, note, duration]] per step // Tempo
export const packFragmentTrack = (trackArr) => {
  let fragmentTrack
  const sequences = trackArr.map(track => {
    return track.sequence
  }) 
  // if track array has content 
  if (trackArr.length) {
    // create new sequence by combining all track sequences
    const newSequence = createEmptySequence(sequences[0].length)
    sequences.forEach(seq => {
      seq.forEach((step, index) => {
        //console.log('step drum ->', step[0][0])
        //console.log('step inst ->', step[1][0])
        if (step[0].length){
          newSequence[index][0].push(step[0][0])
        } else if (step[1].length) {
          //console.log('STEP! ->', step[1][0])
          newSequence[index][1].push(step[1][0])
        }
      })
    })
    //remove all blank steps and return fragment track
    fragmentTrack = newSequence.map(step => {
      return step.map(beat => {
        const filteredBeat = beat.filter(arr => arr.length)
        if (filteredBeat[0]) {
          return filteredBeat
        } else {
          return []
        }
      })
    })
  }
  return fragmentTrack
}