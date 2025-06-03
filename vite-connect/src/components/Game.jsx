import React from 'react'
import Header from './Header'
import PlayersScores from './UI/PlayersScores'
import Gameboard from './Gameboard'

const Game = () => {
  return (
    <>
        <Header />
        <PlayersScores />
        <Gameboard />
    </>
  )
}

export default Game