export const generateGrid = () => {
    return Array.from(Array(6), (_, y) => Array.from(Array(7), (_, x) => {
        return { value: null, y, x }
    }))
}