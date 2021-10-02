import { threeHorizontal, threeDiagonal, threeVertical } from './sequences'

export const findWinningMove = (grid) => {
  let hWMs = threeHorizontal(grid, 'o')
  if (hWMs.length) return hWMs[0]
  let vWMs = threeVertical(grid, 'o')
  if (vWMs.length) return vWMs[0]
  let dWMs = threeDiagonal(grid, 'o')
  if (dWMs.length) return dWMs[0]
}
