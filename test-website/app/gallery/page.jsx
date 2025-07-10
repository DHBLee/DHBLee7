import React from 'react'
import Gallery from './Gallery'

export const metadata = {
    title: "Gallery",
    description: "Pictures of what Mezzalira has to offer",
}

const gallery = () => {
  return (
    <div className='bg-black'><Gallery /></div>
  )
}

export default gallery