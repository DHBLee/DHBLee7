import React from 'react'

const PlayerScoreboard = ({icon, name, score, extraStyles, imgStyles}) => {
  return (
     <div className={`relative flex flex-col md:justify-between px-12 gap-2  text-center border-[3px] border-black shadow-[0px_10px_0px_0px_black] rounded-3xl bg-white w-full items-center py-3 md:py-6 ${extraStyles}`}>
            <span className='PlayerName'>
                {name}
            </span>
            <span className='text-[32px] font-bold leading-none md:text-[56px] '>{score}</span>
            <img src={icon} alt="Face Icon" className={`absolute ${imgStyles}`}/>
        </div>
  )
}

export default PlayerScoreboard