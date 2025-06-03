import React from 'react'
import Logo from './UI/Logo'
import Button from './UI/Button'


const Header = () => {
  return (
    <header className='flex justify-between items-center'>
        <Button textOnly={true}>
            MENU
        </Button>
        <Logo />
        <Button textOnly={true} >
            RESTART
        </Button>
    </header>
  )
}

export default Header