import { threeHorizontal, threeDiagonal, threeVertical } from './sequences'

export const findKO = (grid) => {
  let hKOs = threeHorizontal(grid, 'x')
  if (hKOs.length) return hKOs[0]
  let vKOs = threeVertical(grid, 'x')
  if (vKOs.length) return vKOs[0]
  let dKOs = threeDiagonal(grid, 'x')
  if (dKOs.length) return dKOs[0]
}
