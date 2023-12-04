import { useState } from 'react'
import { TURNS } from '../constants'
import { Square } from './Square'
import { WinnerModal } from './WinnerModal'
import { checkEndGame, checkWinnerFrom } from '../logic/board'
import confetti from 'canvas-confetti'
import { resetGameStorage, saveGameToStorage } from '../logic/storage'

export function Board () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? JSON.parse(turnFromStorage)
  })

  // null no hay ganador, false empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    // no actualiza si la posicion contiene algo
    if (board[index] || winner) return
    // actualizacion del tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambio de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardar partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }
  return (
    <>
      <div className='board'>
        <h1>Tres en raya</h1>
        <button onClick={resetGame}>Reset del juego</button>
        <section className='game'>
          {board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })}
        </section>
      </div>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />

    </>
  )
}
