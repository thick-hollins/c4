import { makeVerticals, makeCW, makeCCW } from './findLines'
import { threeOfFour, platform } from './sequences'

const findHKO = (board) => {
  let potentialHKOs = []
  board.forEach((line, y) => {
    for (let i = 0; i < 4; i++) {
      let x = threeOfFour(line.slice(i, i + 4), 'x')
      if (x !== undefined) potentialHKOs.push({ y, x: x + i })
    }
  })
  for (let potentialHKO of potentialHKOs) {
    if (platform(board, potentialHKO)) return potentialHKO
  }
}

const findVKO = (board) => {
  let vLines = makeVerticals(board)
  let vKO
  vLines.forEach((line, x) => {
    for (let y = 0; y < 3; y++) {
      if (line[y].value === 'x' && 
          line[y + 1].value === 'x' && 
          line[y + 2].value === 'x' &&
          line[y + 3].value === null) {
            vKO = { y: 2 - y, x }
      }
    }
  })
  return vKO
}

const findDKO = (board) => {
  let CWLines = makeCW(board)
  let potentialCWKOs = []
  CWLines.forEach((line, y) => {
    for (let i = 0; i < line.length - 3; i++) {
      let x = threeOfFour(line.slice(i, i + 4), 'x')
      if (x !== undefined) potentialCWKOs.push({ y: line[i + x].y, x: line[i + x].x })
    }
  })
  for (let potentialCWKO of potentialCWKOs) {
    if (platform(board, potentialCWKO)) return potentialCWKO
  }
  let CCWLines = makeCCW(board)
  let potentialCCWKOs = []
  CCWLines.forEach((line, y) => {
    for (let i = 0; i < line.length - 3; i++) {
      let x = threeOfFour(line.slice(i, i + 4), 'x')
      if (x !== undefined) {
        potentialCCWKOs.push({ y: line[i + x].y, x: line[i + x].x})
    }
    }
  })
  for (let potentialCCWKO of potentialCCWKOs) {
    if (platform(board, potentialCCWKO)) return potentialCCWKO
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
