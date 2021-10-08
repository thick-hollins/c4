import { findWinningMove } from "./attacking"
import { findKO } from "./blocking"
import { randomMove } from './random'

export const findMove = (grid) => {
  return findWinningMove(grid) || findKO(grid) || randomMove(grid)
}

