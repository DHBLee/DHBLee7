import React from 'react'
import backgroundRed from '../assets/images/turn-background-red.svg';
import Timer from './Timer';

import counterRedSmall from '../assets/images/counter-red-small.svg';
const TurnIndicator = () => {
  return (
    <div>
        <img src={backgroundRed} alt="" className=' w-full' />
        <div>
            <h3>{} TURN</h3>
            <Timer />
        </div>
        <img src={counterRedSmall} alt="" />
    </div>
  )
}

export default TurnIndicator