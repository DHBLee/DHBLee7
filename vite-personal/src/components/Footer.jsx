import React from 'react'
import Socials from '../UI/Socials'

const Footer = () => {
  return (
    <footer className='flex items-center justify-between border-x-1 border-Neutral200 dark:border-Neutral700 px-5'>
      
      <h1>
        Made with <span aria-label="love">❤️</span> and <span aria-label="coffee">☕</span> 
      </h1>
      <nav>
        <Socials />
      </nav>
    </footer>
  )
}

export default Footer