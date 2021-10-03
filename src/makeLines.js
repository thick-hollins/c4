export const makeCW = (grid) => {
  let rows = []
  for (let y = 3; y <= 8; y++) {
    let newRow = []
    for (let x = 0; x < 7; x++ ) {
      let shiftedY = y - x
      if (grid[shiftedY]) {
        newRow.push(grid[shiftedY][x])
      }
    }
    rows.push(newRow)
  }
  return rows
}

export const makeCCW = (grid) => {
  let rows = []
  for (let y = -3; y <= 2; y++) {
    let newRow = []
    for (let x = 0; x < 7; x++ ) {
      let shiftedY = y + x
      if (grid[shiftedY]) {
        newRow.push(grid[shiftedY][x])
      }
    }
    rows.push(newRow)
  }
  return rows
}

export const makeVerticals = (grid) => {
  let newGrid = Array.from(Array(7), () => Array(6))
  grid.forEach((row, y) => row.forEach((_, x) => newGrid[x][y] = grid[5 - y][x]))
  return newGrid
}
