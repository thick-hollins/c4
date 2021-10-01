export const platform = (grid, position) => {
    let platform = true
      for (let y = position.y + 1; y < 6; y++) {
        if (grid[y][position.x] === null) {
          platform = false
        }
    }
    return platform
}

export const threeOfFour = (arr, player) => {
    if (arr[0] === null && arr[1] === player && arr[2] === player && arr[3] === player) {
      return 0
    }
    if (arr[0] === player && arr[1] === null && arr[2] === player && arr[3] === player) {
      return 1
    }
    if (arr[0] === player && arr[1] === player && arr[2] === null && arr[3] === player) {
      return 2
    }
    if (arr[0] === player && arr[1] === player && arr[2] === player && arr[3] === null) {
      return 3
    }
}
