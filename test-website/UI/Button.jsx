import React from 'react'

const Button = ({children}) => {
  return (
    <button className='rounded-[5px] py-[7px] px-[27px] tracking-[2px] text-[12px] w-max text-[#333333] bg-[#CFAE74] '>
        {children}
    </button>
  )
}

export default Button