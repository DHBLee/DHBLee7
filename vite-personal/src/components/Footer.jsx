import React from 'react'
import Socials from '../UI/Socials'

const Footer = () => {
  return (
    <footer className='grid gap-5 border-x-1 border-Neutral200 dark:border-Neutral700 px-5'>
      <hr />
      <div className='flex items-center justify-between'>
        <h1 className='H8 text-Neutral600 dark:text-Neutral400'>
          Made with <span aria-label="love">❤️</span> and <span aria-label="coffee">☕</span> 
        </h1>
        <nav>
          <Socials />
        </nav>
      </div>
    </footer>
  )
}

export default Footer