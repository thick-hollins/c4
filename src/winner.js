import { makeCCW, makeCW, makeVerticals } from "./makeLines"


export const findWinner = (grid) => {
    const CW = makeCW(grid)
    const CCW = makeCCW(grid)
    const verticals = makeVerticals(grid)
    const allLines = grid.concat(CW, CCW, verticals)
    for (let line of allLines) {
        for (let i = 0; i < line.length - 3; i++) {
        let sequence = line.slice(i, i + 4)
        if (sequence.every(j => j.value === 'x')) {
            return 'x'
        }
        if (sequence.every(j => j.value === 'o')) {
            return 'o'
        }
        }
    }
    return false
}

export const findDraw = (grid) => {
    return grid.every(y => y.every(x => x.value !== null))
}