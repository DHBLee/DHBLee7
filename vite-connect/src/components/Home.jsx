import React from 'react'
import Logo from './UI/Logo'
import Button from './UI/Button'
import pvpIcon from '../assets/images/player-vs-player.svg';
import pvcIcon from '../assets/images/player-vs-cpu.svg';

import { useDispatch } from 'react-redux';
import { sessionActions } from '../store/gameSessionSlice';
import { uiActions } from '../store/ui-slice';


const Home = () => {
  const dispatch = useDispatch();

  const toggleGameMode = (action) => {
    dispatch(sessionActions.initializeGame(action))
  }
  const toggleRules = () => {
    dispatch(uiActions.toggle("rules"))
  }

  return (
    <div className='min-w-[335px] w-full max-w-[480px] max-h-[565px] mx-auto md:px-[40px] md:py-[60px] md:border-3 md:rounded-4xl md:shadow-[0px_7px_0px_0px_black] my-auto flex flex-col justify-center items-center gap-[79px]'>
        <Logo />
        <div className='flex flex-col gap-6 w-full'>
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