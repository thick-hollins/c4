import { makeVerticals, makeCW, makeCCW } from "./makeLines"

const platform = (grid, position) => {
  let platform = true
    for (let y = position.y + 1; y < 6; y++) {
      if (grid[y][position.x].value === null) {
        platform = false
      }
  }
  return platform
}

const threeOfFour = (arr, player) => {
  if (arr[0].value === null && arr[1].value === player && arr[2].value === player && arr[3].value === player) {
    return 0
  }
  if (arr[0].value === player && arr[1].value === null && arr[2].value === player && arr[3].value === player) {
    return 1
  }
  if (arr[0].value === player && arr[1].value === player && arr[2].value === null && arr[3].value === player) {
    return 2
  }
  if (arr[0].value === player && arr[1].value === player && arr[2].value === player && arr[3].value === null) {
    return 3
  }
}

export const threeHorizontal = (grid, player) => {
  let horizontals = []
  grid.forEach((line, y) => {
    for (let i = 0; i < 4; i++) {
      let sliceIndex = threeOfFour(line.slice(i, i + 4), player)
      if (sliceIndex !== undefined) horizontals.push({ y, x: sliceIndex + i })
    }
  })
  return horizontals.filter(horizontal => {
    return platform(grid, horizontal)
  })
}

export const threeVertical = (grid, player) => {
  let vLines = makeVerticals(grid)
  let verticals = []
  vLines.forEach((line, x) => {
    for (let y = 0; y < 3; y++) {
      if (line[y].value === player && 
          line[y + 1].value === player && 
          line[y + 2].value === player &&
          line[y + 3].value === null) {
            verticals.push({ y: 2 - y, x })
      }
    }
  })
  return verticals
}

export const threeDiagonal = (grid, player) => {
  let diagonalLines = makeCW(grid).concat(makeCCW(grid))
  let diagonals = []
  diagonalLines.forEach((line, y) => {
    for (let i = 0; i < line.length - 3; i++) {
      let sliceIndex = threeOfFour(line.slice(i, i + 4), player)
      if (sliceIndex !== undefined) diagonals.push(
        { y: line[i + sliceIndex].y, x: line[i + sliceIndex].x }
        )
    }
  })
  return diagonals.filter(diagonal => {
    return platform(grid, diagonal)
  })
}