import './App.css'
import { generateGrid } from './generate-grid'
import { useState, useEffect } from 'react'
import { findWinner, findDraw } from './winner'
import { emptyY } from './sequences'
import { findMove } from './computer-moves/find-move'

const App = () => {
  const [gridActive, setGridActive] = useState(true)
  const [placed, setPlaced] = useState(-1)
  const [playing, setPlaying] = useState('x')
  const [complete, setComplete] = useState(null)
  const [grid, setGrid] = useState(() => generateGrid())

  const resetGame = () => {
    setGrid(generateGrid())
    setPlaced(-1)
    setComplete(null)
    setPlaying('x')
    setGridActive(true)
  }

  const handleClick = (x) => {
    if (complete) {
      resetGame()
    } else {
      let y = emptyY(grid, x)
      if (y !== undefined) {
        if (placed === -1 || x !== placed) {
          setPlaced(x)
        } else if (placed === x) {
          setGrid(grid => {
            let newGrid = [...grid]
            newGrid[y][x].value = 'x'
            return newGrid
          })
          setPlaced(-1)
          setPlaying('o')
        }
      }
    }
  }

  useEffect(() => { 
    let outcome = findWinner(grid) || findDraw(grid)
    if (outcome) setComplete(outcome)
    if (!outcome && playing === 'o') {
      let move = findMove(grid)
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
        <div className="game-grid">
          { Array.from(Array(7)).map((_, i) => (
            <div
            key={ `${ i }` }
            style={ { width: 50, height: 50, border: "none" } }
            onClick={ () => gridActive && handleClick(i) } 
            >
              <svg viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" 
                  fill={ 
                    i !== placed 
                    ? '#001721' 
                    : playing === 'x' 
                    ? '#FFC300' 
                    : 'red' 
                  }
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
                    fill={ 
                      grid[y][x].value === null 
                      ? '#001721' 
                      : grid[y][x].value === 'x' 
                      ? '#FFC300' 
                      : 'red' 
                    }
                  />
                </svg>
              </div>
            )
          )) }
        </div>
        { complete 
          && complete === 'x' 
          ? <p>Yellow wins!</p> 
          : complete === 'o' 
          ? <p>Red wins!</p> 
          : '' }
        { complete && complete === 'draw' && <p>It's a draw!</p> }
        {complete && <p>click to start again</p>}
      </div>
    </div>
  )
}

export default App;
