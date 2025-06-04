import React from 'react'
import Logo from './UI/Logo'
import Button from './UI/Button'
import { useDispatch } from 'react-redux'
import { uiActions } from '../store/ui-slice'
import { boardActions } from '../store/gameBoardSlice'
const Header = () => {
  const dispatch = useDispatch();

  const toggleMenu = () => {
    dispatch(uiActions.toggle("menu"))  
  };
  const restartGame = () => {
    dispatch(boardActions.resetBoard())
  };

  return (
    <header className='flex justify-between items-center'>
        <Button textOnly={true} onClick={toggleMenu}>
            MENU
        </Button>
        <Logo />
        <Button textOnly={true} onClick={restartGame} >
            RESTART
        </Button>
    </header>
  )
}

export default Header