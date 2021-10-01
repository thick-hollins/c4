import './App.css'
import { useState, useEffect } from 'react'
import { findKO } from './blocking'
import { findWinningMove, findWinner } from './winning'

const App = () => {
  const [gridActive, setGridActive] = useState(true)
  const [placed, setPlaced] = useState(-1)
  const [playing, setPlaying] = useState('x')
  const [winner, setWinner] = useState(null)
  const [grid, setGrid] = useState(() => Array.from(Array(8), () => Array.from(Array(7), () => null)))

  const resetGame = () => {
    setGrid(Array.from(Array(8), () => Array.from(Array(7), () => null)))
    setPlaced(-1)
    setWinner(null)
    setPlaying('x')
    setGridActive(true)
  }

  const handleClick = (x) => {
    if (winner) {
      resetGame()
    } else {
      let emptyY
      for (let i = 2; i < 8; i++) {
          if (!grid[i][x]) {
              emptyY = i
          }
      }
      if (emptyY) {
        // if column is not full
        if (placed === -1) {
          // place cursor if not yet placed
          setGrid(grid => {
            let firstRow = Array.from(Array(7), () => null)
            firstRow[x] = 'x'
            return [firstRow, ...grid.slice(1)]
          })
          setPlaced(x)
        }
        if (placed >= 0 && x !== placed) {
          // move cursor
          setGrid(grid => {
            let firstRow = Array.from(Array(7), () => null)
            firstRow[x] = 'x'
            return [firstRow, ...grid.slice(1)]
          })
          setPlaced(x)
        } else if (placed === x) {
          // play move if confirmed
          setGrid(grid => {
            let newGrid = grid.slice(1)
            newGrid[emptyY - 1][x] = 'x'
            return [Array.from(Array(7), () => null), ...newGrid]
          })
          setPlaced(-1)
          setPlaying('o')
        }
      }
    }
  }

  useEffect(() => {    
    let game = grid.slice(2)
    let result = findWinner(game)
    if (result) setWinner(result)
    if (!result && playing === 'o') {
      // computer chooses move
      let move
      let winningMove = findWinningMove(game)
      let block = findKO(game)
      if (winningMove) move = winningMove
      else if (block) move = block
      else {
        // random move
        while (!move) {
          let randomX = Math.floor(Math.random() * 7)
          let emptyY
          for (let i = 2; i < 8; i++) {
              if (!grid[i][randomX]) {
                  emptyY = i
              }
          }
        if (emptyY) move = { y: emptyY - 2, x: randomX }
        }
      }
      setTimeout(() => {
        setGrid(grid => {
          // computer places cursor
          let firstRow = Array.from(Array(7), () => null)
          firstRow[move.x] = 'o'
          return [firstRow, ...grid.slice(1)]
        })
        setTimeout(() => {
          // computer moves
          setGrid(grid => {
            let newGrid = grid.slice(1)
            newGrid[move.y + 1][move.x] = 'o'
            return [Array.from(Array(7), () => null), ...newGrid]
          })
          setGridActive(true)
        }, 800)
      }, 1000)
      setPlaying('x')
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
          { grid.map((_, y) => _.map((_, x) => (
            <div 
              key={ `${ y }-${ x }` }
              style={ {
                width: 50,
                height: y === 1 ? 10 : 50, 
                border: y > 1 ? "dotted darkgrey" : "none"
              } }
              onClick={ () => {
                gridActive && handleClick(x)
              } } 
              >
                <svg viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="20" 
                    fill={ grid[y][x] === null ? '#001721' : grid[y][x] === 'x' ? '#FFC300' : 'red' }
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
