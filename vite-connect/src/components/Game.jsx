import React from 'react'
import Header from './Header'
import PlayersScores from './UI/PlayersScores'
import Gameboard from './Gameboard'
import { useSelector } from 'react-redux'
import TurnIndicator from './TurnIndicator'

const Game = () => {
  const stateWin = useSelector((state) => state.board.status);
  const winner = useSelector((state) => state.board.winner)


  return (
    <div className='max-w-[630px] h-full mx-auto flex flex-col gap-10 pt-[50px] w-full'>
        <Header />
        <PlayersScores />
        <Gameboard />
        <TurnIndicator />
    </div>
  )
}

export default Game