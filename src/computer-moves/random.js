import { emptyY } from "../sequences"

export const randomMove = (grid) => {
  let move
  while (!move) {
    let randomX = Math.floor(Math.random() * 7)
    let y = emptyY(grid, randomX)
  if (y !== undefined) move = { y, x: randomX }
  }
  return move
}