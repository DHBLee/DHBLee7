import React from 'react'
import leftArrow from '../../assets/shared/icon-back-button.svg';
import rightArrow from '../../assets/shared/icon-next-button.svg';
import { useArtwork } from '../context/ArtworkContext';

const NextandPrevous = ({ data }) => {
  const { currentIndex, setCurrentIndex } = useArtwork()
  return (
    <div className='flex gap-7'>
        <button onClick={() => setCurrentIndex(prev => prev - 1)} aria-label="Previous Artwork" disabled={currentIndex === 0} className='disabled:opacity-50 disabled:cursor-not-allowed'>
        <img src={leftArrow} alt="Back Button" />
        </button>
        <button onClick={() => setCurrentIndex(prev =>  prev + 1 )} aria-label="Next Artwork" disabled={currentIndex === data.length - 1} className='disabled:opacity-50 disabled:cursor-not-allowed'>
        <img src={rightArrow} alt="Next Button" />
        </button>
    </div>
  )
}

export default NextandPrevous