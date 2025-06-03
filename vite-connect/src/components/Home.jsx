import React from 'react'
import Logo from './UI/Logo'
import Button from './UI/Button'
import pvpIcon from '../assets/images/player-vs-player.svg';
import pvcIcon from '../assets/images/player-vs-cpu.svg';

import { useDispatch } from 'react-redux';
import { sessionActions } from '../store/gameSessionSlice';
import { uiActions } from '../store/ui-slice';


const Home = () => {
  const dispatch = useDispatch

  const toggleGameMode = (action) => {
    dispatch(sessionActions.initializeGame(action))
  }
  const toggleRules = () => {
    dispatch(uiActions.toggle("rules"))
  }

  return (
    <div className='flex flex-col justify-center items-center gap-[79px]'>
        <Logo />
        <div className='flex flex-col gap-6'>
            <Button onClick={() => toggleGameMode("cpu")} textOnly={false} extraStyles="flex items-center justify-between text-left bg-Pink text-white" >
                <span>PLAY VS CPU</span>
                <img src={pvcIcon} alt="Player vs CPU face icon" />
            </Button>
            <Button onClick={() => toggleGameMode("pvp")} textOnly={false} extraStyles="flex items-center justify-between text-left text-black bg-Yellow">
                <span>PLAY VS PLAYER</span>
                <img src={pvpIcon} alt="Player vs Player face icon" />
            </Button>
            <Button onClick={toggleRules} extraStyles='text-left bg-white text-black'>
                <span>GAME RULES</span>
            </Button>
        </div>
    </div>
  )
}

export default Home