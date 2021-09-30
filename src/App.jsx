import './App.css';
import { useState, useEffect } from 'react'
import findWinner from './findWinner';

const App = () => {
  const [grid, setGrid] = useState(() => {
    return Array.from(Array(8), () => Array.from(Array(7), () => null))
  })
  const [placed, setPlaced] = useState(-1)
  const [playing, setPlaying] = useState('x')
  const [winner, setWinner] = useState(null)

  const handleClick = (x) => {
    if (winner) {
      setGrid(Array.from(Array(8), () => Array.from(Array(7), () => null)))
      setPlaced(-1)
      setWinner(null)
      setPlaying('x')
    } else {
      if (playing === 'x') {
        let emptyY
        for (let i = 2; i < 8; i++) {
            if (!grid[i][x]) {
                emptyY = i
            }
        }
        if (placed >= 0 && placed !== x) {
          for (let i = 2; i < 8; i++) {
            if (!grid[i][x]) {
                emptyY = i
            }
          }
          setGrid(grid => {
            let firstRow = Array.from(Array(7), () => null)
            firstRow[x] = 'x'
            return [firstRow, ...grid.slice(1)]
          })
          setPlaced(x)
        } else if (placed === x) {
          setGrid(grid => {
            let newGrid = grid.slice(1)
            newGrid[emptyY - 1][x] = 'x'
            return [Array.from(Array(7), () => null), ...newGrid]
          })
          setPlaced(-1)
          setPlaying('o')
        }
        if (placed === -1) {
          if (emptyY) {
            setGrid(grid => {
              let firstRow = Array.from(Array(7), () => null)
              firstRow[x] = 'x'
              return [firstRow, ...grid.slice(1)]
            })
            setPlaced(x)
          }
        }
      }
    }
  }

  useEffect(() => {
    let result = findWinner(grid.slice(2))
    if (result) setWinner(result)
    if (!result && playing === 'o') {
      setTimeout(() => {
        let move
        while (!move) {
          let randomMove = Math.floor(Math.random() * 7)
          let emptyY
          for (let i = 2; i < 8; i++) {
              if (!grid[i][randomMove]) {
                  emptyY = i
              }
          }
        if (emptyY) move = [emptyY, randomMove]
        }
        setGrid(grid => {
          let firstRow = Array.from(Array(7), () => null)
          firstRow[move[1]] = 'o'
          return [firstRow, ...grid.slice(1)]
        })
        setTimeout(() => {
          setGrid(grid => {
            let newGrid = grid.slice(1)
            newGrid[move[0] - 1][move[1]] = 'o'
            return [Array.from(Array(7), () => null), ...newGrid]
          })
        }, 800)
      }, 1000)
      setPlaying('x')
    }
  }, [grid, playing])

  return (
    <>
      <div style={ {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 50px)',
        gridTemplateRows: '50px 10px repeat(6, 50px)',
        gridGap: '1px'
      } }>
        { grid.map((_, y) => _.map((_, x) => (
          <div 
            key={ `${ y }-${ x }` }
            style={ {
              width: 50,
              height: y === 1 ? 10 : 50, 
              border: y > 1 ? "solid darkgrey" : "none"
            } }
            onClick={ () => {
              handleClick(x)
            } } 
            >
              <svg viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" 
                  fill={ grid[y][x] === null ? 'white' : grid[y][x] === 'x' ? '#FFC300' : 'red' }
                />
              </svg>
            </div>
          )
        )) }
      </div>
      { winner ? winner === 'x' ? <p>Yellow wins!</p> : <p>Red wins!</p> : '' }
      {winner && <p>click to start again</p>}
    </>
  )
}

export default App;
