import { makeVerticals, makeCW, makeCCW } from './findLines'

const findHKO = (board) => {
    let potentialHKOs = []
    board.forEach((line, y) => {
      for (let x = 0; x < 5; x++) {
        if (line[x] === 'x' && line[x + 1] === 'x' && line[x + 2] === 'x') {
          if (line[x - 1] === null) {
            potentialHKOs.push({ y, x: x - 1 })
          }
          if (line[x + 3] === null) {
            potentialHKOs.push({ y, x: x + 3 })
          }
        }
      }
      for (let x = 0; x < 4; x++) {
        if (line[x] === 'x' && line[x + 3] === 'x') {
          if (line[x + 1] === 'x' && line[x + 2] === null) potentialHKOs.push ({y, x: x + 2}) 
          if (line[x + 2] === 'x' && line[x + 1] === null) potentialHKOs.push ({y, x: x + 1}) 
        }
      }
    })
    for (let potentialHKO of potentialHKOs) {
      let platform = true
      for (let y = potentialHKO.y + 1; y < 6; y++) {
        if (board[y][potentialHKO.x] === null) {
          platform = false
        }
      }
      if (platform) return potentialHKO
    }
  }
  
  const findVKO = (board) => {
    let vLines = makeVerticals(board)
    let vKO
    vLines.forEach((line, x) => {
      for (let y = 0; y < 3; y++) {
        if (line[y] === 'x' && 
            line[y + 1] === 'x' && 
            line[y + 2] === 'x' &&
            line[y + 3] === null) {
              vKO = {y: 2 - y, x}
        }
      }
    })
    return vKO
  }

  const findDKO = (board) => {
    let CWLines = makeCW(board)
    CWLines[4].unshift('z')
    CWLines[5].unshift('z', 'z')
    let potentialCWKOs = []
    CWLines.forEach((line, y) => {
      for (let x = 0; x < line.length - 2; x++) {
        if (line[x] === 'x' && line[x + 1] === 'x' && line[x + 2] === 'x') {
          if (line[x - 1] === null) {
            potentialCWKOs.push({ y: y - x - 1, x: x - 1 })
          }
          if (line[x + 3] === null) {
            potentialCWKOs.push({ y: y - x - 1, x: x + 4 })
          }
        }
      }
    })
    for (let potentialCWKO of potentialCWKOs) {
      let platform = true
      for (let y = potentialCWKO.y + 1; y < 6; y++) {
        if (board[y][potentialCWKO.x] === null) {
          platform = false
        }
      }
      if (platform) return potentialCWKO
    }
    let CCWLines = makeCCW(board)
    let potentialCCWKOs = []
    CCWLines.forEach((line, y) => {
      for (let x = 0; x < line.length - 2; x++) {
        if (line[x] === 'x' && line[x + 1] === 'x' && line[x + 2] === 'x') {
          if (line[x - 1] === null) {
            potentialCCWKOs.push({ y: y + x - 4, x: x - 1})
          }
          if (line[x + 3] === null) {
            potentialCCWKOs.push({ y: y + x - 4, x: x + 3})
          }
        }
      }
    })

    for (let potentialCCWKO of potentialCCWKOs) {
      let platform = true
      for (let y = potentialCCWKO.y + 1; y < 6; y++) {
        if (board[y][potentialCCWKO.x] === null) {
          platform = false
        }
      }
      if (platform) return potentialCCWKO
    }
  }
  
  export const findKO = (board) => {
    let vKO = findVKO(board)
    if (vKO) {
      return vKO
    }
    let hKO = findHKO(board)
    if (hKO) {
      return hKO
    }
    let dKO = findDKO(board) 
    if (dKO) {
      return dKO
    }
  }