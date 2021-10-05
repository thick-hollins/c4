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

export const emptyY = (grid, x) => {
  let empty
  for (let i = 0; i < 6; i++) {
    if (!grid[i][x].value) {
        empty = i
    }
  }
  return empty
}

const threeOfFour = (arr, player) => {
  console.log(arr)
  let nullIndex
  let playerCount = 0
  arr.forEach((el, y) => {
    if (el.value === null) nullIndex = y
    if (el.value === player) playerCount++
  })
  if (nullIndex !== undefined && playerCount === 3) return nullIndex
}

export const threeHorizontal = (grid, player) => {
  let horizontals = []
  grid.forEach((line, y) => {
    for (let i = 0; i < 4; i++) {
      let sliceIndex = threeOfFour(line.slice(i, i + 4), player)
      if (sliceIndex !== undefined) horizontals.push({ y, x: sliceIndex + i })
    }
  })
  return horizontals.filter(horizontal => platform(grid, horizontal))
}

export const threeVertical = (grid, player) => {
  let lines = makeVerticals(grid)
  let verticals = []
  lines.forEach((line, x) => {
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
  let lines = makeCW(grid).concat(makeCCW(grid))
  let diagonals = []
  lines.forEach((line, y) => {
    for (let i = 0; i < line.length - 3; i++) {
      let sliceIndex = threeOfFour(line.slice(i, i + 4), player)
      if (sliceIndex !== undefined) diagonals.push(
        { y: line[i + sliceIndex].y, x: line[i + sliceIndex].x }
        )
    }
  })
  return diagonals.filter(diagonal => platform(grid, diagonal))
}