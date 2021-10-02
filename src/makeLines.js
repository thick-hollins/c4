export const makeCW = (grid) => {
  let rows = []
  for (let y = 3; y <= 8; y++) {
    let newRowCW = []
    for (let x = 0; x < 7; x++ ) {
      let yCW = y - x
      if (grid[yCW]) {
        newRowCW.push(grid[yCW][x])
      }
    }
    rows.push(newRowCW)
  }
  return rows
}

export const makeCCW = (grid) => {
  let rows = []
  for (let y = -3; y <= 2; y++) {
    let newRowCCW = []
    for (let x = 0; x < 7; x++ ) {
      let yCCW = y + x
      if (grid[yCCW]) {
        newRowCCW.push(grid[yCCW][x])
      }
    }
    rows.push(newRowCCW)
  }
  return rows
}

export const makeVerticals = (grid) => {
  let newGrid = Array(7).fill(null).map(el => Array(6))
  grid.forEach((row, y) => row.forEach((col, x) => newGrid[x][y] = grid[5 - y][x]))
  return newGrid
}
