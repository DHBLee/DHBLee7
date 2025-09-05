import React from 'react'
import Link from 'next/link'

const Button = ({children, extraStyles = "", href, ...props}) => {
    const styles = `
        hover:opacity-[0.5] border-2  active:ring-2 
        active:ring-Neutral900 
        active:border-2 
        active:border-Neutral0 
        transition-opacity text-preset5 w-max text-Neutral0 bg-Neutral900 rounded-[10px] ${extraStyles}
    `;

    if (href) {
      return <Link href={href} className={styles} {...props}>
        {children}
    </Link> 
    }
    
    return  <button className={styles} {...props}>
        {children}
    </button>
}

export default Button