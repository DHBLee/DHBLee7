import React from 'react'
import { useSelector } from "react-redux";
import youIcon from '../../assets/images/you.svg';
import cpuIcon from '../../assets/images/cpu.svg';
import player1Icon from '../../assets/images/player-one.svg';
import player2Icon from '../../assets/images/player-two.svg';
import PlayerScoreboard from './PlayerScoreboard';

const PlayersScores = () => {
  const gameMode = useSelector((state) => state.session?.gameMode);
  const players = useSelector((state) => state.session?.players);

  const icon1 = gameMode === "cpu" ? youIcon : player1Icon;
  const icon2 = gameMode === "cpu" ? cpuIcon : player2Icon;



  return (
    <div className='flex gap-5 md:gap-8 1440:hidden'>
        <PlayerScoreboard icon={icon1} name={players[0].name} score={players[0].score} extraStyles="ml-4 md:flex-row" imgStyles="left-[-1.5rem]" />
        <PlayerScoreboard icon={icon2} name={players[1].name} score={players[1].score} extraStyles="mr-4 md:flex-row-reverse" imgStyles="right-[-1.5rem]" />
    </div>
  )
}

export default PlayersScores