'use client'

import React, { useState, useEffect, useMemo } from 'react'
import PDFlists from './pdfLists'
import { useSheetData } from '@/util/useSheetData';

const Menu = ({ initialMenu }) => {
  const [menu, loadingMenu] = useSheetData('menu', initialMenu);
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Fetch fresh data client-side

  // Get all categories
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

  // Group menu by category
  const groupedMenu = useMemo(() => {
    const groups = {}
    menu.forEach(item => {
      const categories = item.category?.split(',').map(c => c.trim().toLowerCase()) || ['uncategorized']
      categories.forEach(cat => {
        if (!groups[cat]) groups[cat] = []
        groups[cat].push(item)
      })
    })
    return groups
  }, [menu])

  const visibleCategories = selectedCategory === 'all' ? allCategories : [selectedCategory]

  // Inject structured data (Menu schema)
  useEffect(() => {
    const structured = {
      "@context": "https://schema.org",
      "@type": "Menu",
      "hasMenuSection": visibleCategories.map(cat => ({
        "@type": "MenuSection",
        "name": cat,
        "hasMenuItem": (groupedMenu[cat] || []).map(item => ({
          "@type": "MenuItem",
          "name": item.name,
          "offers": {
            "@type": "Offer",
            "price": item.price,
            "priceCurrency": "AUD"
          }
        }))
      }))
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.innerHTML = JSON.stringify(structured)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [groupedMenu, visibleCategories])

  return (
    <section className="bg-black px-[24px] md:px-[32px] 1440:px-[86px] py-8 text-white space-y-12">

       <PDFlists />
      {/* Category Filter */}
      
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setSelectedCategory('all')}
          aria-pressed={selectedCategory === 'all'}
          className={selectedCategory === 'all' ? 'underline' : ''}
        >
          All
        </button>
        {allCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            aria-pressed={selectedCategory === cat}
            className={selectedCategory === cat ? 'uppercase underline' : 'uppercase'}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading Indicator */}
      {loadingMenu && <p className="Body text-center italic text-gray-400">Refreshing menu...</p>}

      {/* Menu Sections */}
      {visibleCategories.map(cat => (
        <section key={cat} aria-labelledby={`heading-${cat}`}>
          <h4 id={`heading-${cat}`} className="uppercase HeadingXS font-semibold mb-4">{cat}</h4>
          <ul className="space-y-4 Body">
            {(groupedMenu[cat] || []).map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between border-b border-gray-600 pb-2"
              >
                <p>{item.name}</p>
                {!cat.toLowerCase().startsWith('tasting') && <p>${item.price}</p>}

              </li>
            ))}
          </ul>
        </section>
      ))}

    </section>
  )
}

export default Menu
