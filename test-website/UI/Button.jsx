import React from 'react'

const Button = ({children}) => {
  return (
    <button className='hover:text-white hover:bg-Black hover:border-white border-1 transition-colors duration-300 rounded-[5px] py-[7px] px-[27px] tracking-[2px] BodySmall w-max text-[#333333] bg-[#CFAE74] '>
        {children}
    </button>
  )
}

export default Button