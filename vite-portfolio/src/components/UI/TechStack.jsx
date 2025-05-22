import React from 'react'

const TechStack = ({icon, name}) => {
  return (
    <img src={icon} alt={name} className='w-[10%] hover:scale-105 transition-transform duration-300' loading='lazy' />
  )
}

export default TechStack