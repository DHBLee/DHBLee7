import React from 'react'

const buttonStyle1 = "HeadingXS text-white bg-Purple rounded-3xl px-5 py-2 w-[108px] md:w-max";
const buttonStyle2 = "border-[3px] border-black shadow-[0px_10px_0px_0px_black] rounded-3xl HeadingM py-5 px-4";

const Button = ({children, textOnly, extraStyles="", ...props}) => {
  return (
    <button className={`${textOnly ? buttonStyle1 : buttonStyle2} ${extraStyles} `} {...props}>
        {children}
    </button>
  )
}

export default Button