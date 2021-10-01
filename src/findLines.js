export const makeCW = (board) => {
  let rows = []
  for (let y = 3; y <= 8; y++) {
    let newRowCW = []
    for (let x = 0; x < 7; x++ ) {
      let yCW = y - x
      if (board[yCW]) {
        newRowCW.push(board[yCW][x])
      }
    }
    rows.push(newRowCW)
  }
  return rows
}

export const makeCCW = (board) => {
  let rows = []
  for (let y = -3; y <= 2; y++) {
    let newRowCCW = []
    for (let x = 0; x < 7; x++ ) {
      let yCCW = y + x
      if (board[yCCW]) {
        newRowCCW.push(board[yCCW][x])
      }
    }
    rows.push(newRowCCW)
  }
  return rows
}

export const reverseCWshift = (shifted) => {
  let newGrid = Array.from(Array(12), () => Array.from(Array(12), () => null))
  shifted.forEach((line, y) => line.forEach((_, x) => {
    newGrid[x - y][x + 3] = shifted[y][x]
  }))
  console.log(newGrid)
  return newGrid
}

export const reverseCCWshift = (shifted) => {
  let newGrid = Array.from(Array(6), () => Array.from(Array(7), () => null))
  shifted.forEach((line, y) => line.forEach((_, x) => {
    if (newGrid[y + x - 3]) newGrid[y + x - 3][x] = shifted[y][x]
  }))
  return newGrid
}

export const makeVerticals = (board) => {
  let newBoard = Array(7).fill(null).map(el => Array(6))
  board.forEach((row, y) => row.forEach((col, x) => newBoard[x][y] = board[5 - y][x]))
  return newBoard
}

const makeLines = (board) => {
  const CW = makeCW(board)
  const CCW = makeCCW(board)
  const verticals = makeVerticals(board)
  return board.concat(CW, CCW, verticals)
}

export const findWinner = (board) => {
  const allLines = makeLines(board)
  for (let line of allLines) {
    for (let i = 0; i < line.length - 3; i++) {
      let sequence = line.slice(i, i + 4)
      if (sequence.every(j => j === 'x')) {
        return 'x'
      }
      if (sequence.every(j => j === 'o')) {
        return 'o'
      }
    }
  }
  return false
}