'use client'
import React from 'react'

const Event = ({ initialMenu }) => {
  const groupedMenu = initialMenu.reduce((acc, item) => {
    const cat = item.category?.toLowerCase() || 'uncategorized'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})

  console.log('initial menu', initialMenu)

  return (
    <div className="text-black p-8 space-y-12">
      {Object.entries(groupedMenu).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-xl font-semibold mb-4 uppercase">{category}</h3>
          <ul className="space-y-4">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between border-b border-white/20 pb-2"
              >
                <span>{item.name}</span>
                <span>${item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Event
