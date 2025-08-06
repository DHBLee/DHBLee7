import React from 'react'
import { icons } from '../util/data'

const Socials = ({padding}) => {
  return (
    <ul className='flex items-center gap-3'>
        {icons.map((icon, index) => (
        <li key={index} className={padding ? 'p-2 border-1 border-Neutral200 dark:border-Neutral700 rounded-xl bg-Neutral0 dark:bg-Neutral800' : ''}>
            <a href={icon.url}>
            <img src={icon.icon} alt={icon.name} />
            </a>
        </li>
        ))}
    </ul>
  )
}

export default Socials