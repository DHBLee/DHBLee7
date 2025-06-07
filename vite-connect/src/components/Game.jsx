import React from 'react'
import Header from './Header'
import PlayersScores from './UI/PlayersScores'
import Gameboard from './Gameboard'
import TurnIndicator from './TurnIndicator'
import youIcon from '../assets/images/you.svg';
import cpuIcon from '../assets/images/cpu.svg';
import player1Icon from '../assets/images/player-one.svg';
import player2Icon from '../assets/images/player-two.svg';
import { useSelector } from 'react-redux'
import PlayerScoreboard from './UI/PlayerScoreboard'

const Game = () => {
  const gameMode = useSelector((state) => state.session?.gameMode);
  const players = useSelector((state) => state.session?.players);

  const icon1 = gameMode === "cpu" ? youIcon : player1Icon;
  const icon2 = gameMode === "cpu" ? cpuIcon : player2Icon;

  return (
    <div className='1440:flex items-center gap-10 justify-between mx-auto'>
      <div className='hidden 1440:block'>
        <PlayerScoreboard icon={icon1} name={players[0].name} score={players[0].score}  imgStyles="top-[-2rem]" />
      </div>
      <div className='max-w-[630px] h-full mx-auto flex flex-col gap-10 pt-[50px] w-full'>
          <Header />
          <PlayersScores />
          <Gameboard />
      </div>
      <div className='hidden 1440:block'>
        <PlayerScoreboard icon={icon2} name={players[1].name} score={players[1].score}  imgStyles="top-[-2rem]" />
      </div>
    </div>
  )
}

export default Game