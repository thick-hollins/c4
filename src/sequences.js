export const platform = (grid, position) => {
    let platform = true
      for (let y = position.y + 1; y < 6; y++) {
        if (grid[y][position.x].value === null) {
          platform = false
        }
    }
    return platform
}

export const threeOfFour = (arr, player) => {
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
