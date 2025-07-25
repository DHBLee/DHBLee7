import React from 'react'

const Button = ({children, ...props}) => {
  return (
    <button {...props} className='hover:text-white hover:bg-Black hover:border-white border-1 transition-colors duration-300 rounded-[5px] py-[7px] px-[27px] tracking-[2px] BodySmall w-max text-Black bg-Yellow '>
        {children}
    </button>
  )
}

export default Button