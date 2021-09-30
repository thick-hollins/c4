const makeDiagonals = (board) => {
  let rows = []
  for (let y = -3; y <= 8; y++) {
    let newRowCW = []; let newRowCCW = []
    for (let x = 0; x < 7; x++ ) {
      let yCW = y - x
      if (board[yCW]) if (board[yCW][x]) {
        newRowCW.push(board[yCW][x])
      }
      let yCCW = y + x
      if (board[yCCW]) if (board[yCCW][x]) {
        newRowCCW.push(board[yCCW][x])
      }
    }
    rows.push(newRowCW, newRowCCW)
  }
  return rows
}

const makeVerticals = (board) => {
  let newBoard = Array(7).fill(null).map(el => Array(6))
  board.forEach((row, y) => row.forEach((col, x) => newBoard[x][y] = board[5 - y][x]))
  return newBoard
}

const findWinner = (board) => {
  const diagonals = makeDiagonals(board)
  const verticals = makeVerticals(board)
  const allLines = board.concat(diagonals, verticals)
  for (let line of allLines) {
    let joined = line.join('')
    if (joined.includes('xxxx')) {
      return 'x'
    }
    if (joined.includes('oooo')) {
      return 'o'
    }
  }
  return false
}

export default findWinner