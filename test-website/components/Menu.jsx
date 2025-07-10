'use client'

import Button from '@/UI/Button';
import React, { useEffect, useState } from 'react'


const Menu = ({ initialMenu }) => {
  const [allMenu, setAllMenu] = useState(initialMenu);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
  fetch('http://test-react-integration-with-wordpress.local/wp-json/wp/v2/menu_item?per_page=100&_embed')
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setAllMenu(data);
        console.log("Fetched menu:", data);
      } else {
        console.error("Unexpected data structure:", data);
      }
    })
    .catch(err => console.warn("Using fallback menu from build time:", err));
    }, []);

  const allCategories = Array.from(
    new Set(
        (Array.isArray(allMenu) ? allMenu : [])
        .flatMap(item =>
            item._embedded?.['wp:term']?.[0]?.map(cat => cat.slug)
        )
        .filter(Boolean)
    )
    )

  console.log(allCategories)

  const categoryNameMap = Object.fromEntries(
  allMenu
    .flatMap(item =>
      item._embedded?.['wp:term']?.[0]?.map(cat => [cat.slug, cat.name])
    )
    .filter(Boolean)
    )

  const groupedMenu = {}
  allMenu.forEach((item) => {
      const categories = item._embedded?.['wp:term']?.[0] || []
      categories.forEach((cat) => {
          if (!groupedMenu[cat.slug]) {
              groupedMenu[cat.slug] = []
          }
          groupedMenu[cat.slug].push(item)
      })
  })

  return (
     !allMenu ? (<p>There was an error fetching the menu.. </p>)

      : (
            <div className='flex flex-col gap-10 min-h-[600px] bg-black px-[86px] py-[43px]'>
              <div className='flex justify-center gap-8'>
                  <Button>
                      <a href="http://test-react-integration-with-wordpress.local/wp-content/uploads/2025/07/Mezzalira-Dolci-May-2025.1.pdf" target='_blank'>
                          DOLCE.pdf
                      </a>
                  </Button>
                  <Button>
                      FOOD.pdf
                  </Button>
                  <Button>
                      FUNCTION.pdf
                  </Button>
              </div>
              <div className="flex flex-wrap justify-center  gap-x-10 gap-y-2 mb-8">
                  <button onClick={() => setSelectedCategory('all')} className={selectedCategory === 'all' ? 'font-bold' : ''}>
                      All
                  </button>
                  {allCategories.map(slug => (
                      <button
                      key={slug}
                      onClick={() => setSelectedCategory(slug)}
                      className={selectedCategory === slug ? 'uppercase underline' : 'uppercase'}
                      >
                          {categoryNameMap[slug] || slug}
                      </button>
                  ))}
              </div>

            <div className="space-y-12">
              {(selectedCategory === 'all' ? allCategories : [selectedCategory]).map((slug) => (
                <div key={slug}>
                  <h3 className="text-xl font-semibold mb-4 uppercase">{categoryNameMap[slug]}</h3>
                  <ul className="space-y-4">
                    {(groupedMenu[slug] || []).map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between border-b border-white/20 pb-2"
                      >
                        <span>{item.title.rendered}</span>
                        <span>${item.acf?.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
      )
  )
}


export default Menu