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

export const makeVerticals = (board) => {
  let newBoard = Array(7).fill(null).map(el => Array(6))
  board.forEach((row, y) => row.forEach((col, x) => newBoard[x][y] = board[5 - y][x]))
  return newBoard
}