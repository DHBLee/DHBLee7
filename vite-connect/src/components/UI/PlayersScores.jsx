import React from 'react'
import { useSelector } from "react-redux";
import youIcon from '../../assets/images/you.svg';
import cpuIcon from '../../assets/images/cpu.svg';
import player1Icon from '../../assets/images/player-one.svg';
import player2Icon from '../../assets/images/player-one.svg';

const PlayersScores = () => {
  const gameMode = useSelector((state) => state.session?.gameMode);
  const players = useSelector((state) => state.session?.players);

  const icon1 = gameMode === "cpu" ? youIcon : player1Icon;
  const icon2 = gameMode === "cpu" ? cpuIcon : player2Icon;



  return (
    <div>
        <div>
            <span>
                {players[0].name}
            </span>
            <span>{players[0].score}</span>
            <img src={icon1} alt="Face Icon" />
        </div>

        <div>
            <span>
                {players[1].name}
            </span>
            <span>{players[1].score}</span>
            <img src={icon2} alt="Face Icon" />
        </div>
    </div>
  )
}

export default PlayersScores