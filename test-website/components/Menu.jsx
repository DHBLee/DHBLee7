'use client'

import React, { useState, useEffect, useMemo } from 'react'

const Menu = ({ initialMenu }) => {
  const [menu, setMenu] = useState(initialMenu)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Client side fetch to get fresh data, fallback to initialMenu
  useEffect(() => {
    fetch('https://sheet.best/api/sheets/973889e9-f9ea-418e-87fd-9dc1e5781673')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data[0]?.name) {
          setMenu(data)
        }
      })
      .catch(err => console.error('Client fetch failed:', err))
  }, [])

  // Extract unique categories from all menu items, split and normalize
  const allCategories = useMemo(() => {
    const cats = new Set()
    menu.forEach(item => {
      if (item.category) {
        item.category
          .split(',')
          .map(c => c.trim().toLowerCase())
          .forEach(c => cats.add(c))
      }
    })
    return Array.from(cats).sort()
  }, [menu])

  // Group menu items by each category
  const groupedMenu = useMemo(() => {
    const groups = {}
    menu.forEach(item => {
      if (!item.category) {
        groups['uncategorized'] = groups['uncategorized'] || []
        groups['uncategorized'].push(item)
        return
      }
      const categories = item.category
        .split(',')
        .map(c => c.trim().toLowerCase())
      categories.forEach(cat => {
        if (!groups[cat]) groups[cat] = []
        groups[cat].push(item)
      })
    })
    return groups
  }, [menu])

  // Decide which categories to show based on filter
  const visibleCategories = selectedCategory === 'all' ? allCategories : [selectedCategory]

  return (
    <div className="bg-black p-8 space-y-12">

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setSelectedCategory('all')}
          className={selectedCategory === 'all' ? 'underline' : ''}
        >
          All
        </button>
        {allCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? 'uppercase  underline' : 'uppercase'}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Items Grouped by Category */}
      {visibleCategories.map(cat => (
        <div key={cat}>
          <h3 className="uppercase text-xl font-semibold mb-4">{cat}</h3>
          <ul className="space-y-4">
            {(groupedMenu[cat] || []).map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between border-b border-gray-300 pb-2"
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

export default Menu
