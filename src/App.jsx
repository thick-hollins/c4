import './App.css'
import { generateGrid } from './generate-grid'
import { useState, useEffect } from 'react'
import { findKO } from './blocking'
import { findWinner } from './winner'
import { findWinningMove } from './attacking'

const App = () => {
  const [gridActive, setGridActive] = useState(true)
  const [placed, setPlaced] = useState(-1)
  const [playing, setPlaying] = useState('x')
  const [winner, setWinner] = useState(null)
  const [grid, setGrid] = useState(() => generateGrid())

  const resetGame = () => {
    setGrid(generateGrid())
    setPlaced(-1)
    setWinner(null)
    setPlaying('x')
    setGridActive(true)
  }

  const handleClick = (col) => {
    if (winner) {
      resetGame()
    } else {
      let emptyY
      for (let i = 0; i < 6; i++) {
          if (!grid[i][col].value) {
              emptyY = i
          }
      }
      if (emptyY) {
        if (placed === -1 || col !== placed) {
          setPlaced(col)
        } else if (placed === col) {
          setGrid(grid => {
            let newGrid = [...grid]
            newGrid[emptyY][col].value = 'x'
            return newGrid
          })
          setPlaced(-1)
          setPlaying('o')
        }
      }
    }
  }

  useEffect(() => { 
    let result = findWinner(grid)
    if (result) setWinner(result)
    if (!result && playing === 'o') {
      let move
      let winningMove = findWinningMove(grid)
      if (winningMove) move = winningMove
      let block = findKO(grid)
      if (block && !winningMove) move = block
      else {
        while (!move) {
          let randomX = Math.floor(Math.random() * 7)
          let emptyY
          for (let i = 0; i < 6; i++) {
              if (!grid[i][randomX].value) {
                  emptyY = i
              }
          }
        if (emptyY) move = { y: emptyY, x: randomX }
        }
      }
      setTimeout(() => {
        setPlaced(move.x)
        setTimeout(() => {
          setPlaying('x')
          setPlaced(-1)
          setGrid(grid => {
            let newGrid = [...grid]
            newGrid[move.y][move.x].value = 'o'
            return newGrid
          })
          setGridActive(true)
        }, 800)
      }, 1000)
      setGridActive(false)
    }
  }, [grid, playing])

  return (
    <div className="wrapper">
      <div className="game">
        <div style={ {
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 50px)',
          gridTemplateRows: '50px 10px repeat(6, 50px)',
          gridGap: '1px' } }>
          { Array.from(Array(7)).map((_, i) => (
            <div
            key={ `${ i }` }
            style={ { width: 50, height: 50, border: "none" } }
            onClick={ () => gridActive && handleClick(i) } 
            >
              <svg viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" 
                  fill={ i !== placed ? '#001721' : playing === 'x' ? '#FFC300' : 'red' }
                />
              </svg>
            </div>
          )) }
          { Array.from(Array(7), () => null).map((_, j) => (
            <div
            key={ `${ j }divider` }
            style={ { width: 50, height: 20, border: "none" } }
            >
            </div>
          )) }
          { grid.map((_, y) => _.map((_, x) => (
            <div 
              key={ `${ y }-${ x }` }
              style={ { width: 50, height: 50, border: "dotted darkgrey" } }
              onClick={ () => gridActive && handleClick(x) } 
              >
                <svg viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="20" 
                    fill={ grid[y][x].value === null ? '#001721' : grid[y][x].value === 'x' ? '#FFC300' : 'red' }
                  />
                </svg>
              </div>
            )
          )) }
        </div>
        { winner ? winner === 'x' ? <p>Yellow wins!</p> : <p>Red wins!</p> : '' }
        {winner && <p>click to start again</p>}
      </div>
    </div>
  )
}

export default App;
