import { makeCCW, makeCW, makeVerticals } from "./findLines"


export const findWinner = (board) => {
    const CW = makeCW(board)
    const CCW = makeCCW(board)
    const verticals = makeVerticals(board)
    const allLines = board.concat(CW, CCW, verticals)
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