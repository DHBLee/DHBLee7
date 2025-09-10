'use client'
import React from 'react'
import recipes from '@/data/data.json';
import { useState } from 'react';
import FilterControls from '@/app/recipes/FilterControls';
import RecipeList from './RecipeList';

const Recipes = () => {
     const [searchTerm, setSearchTerm] = useState('');
      const [maxPrepTime, setMaxPrepTime] = useState('');
      const [maxCookTime, setMaxCookTime] = useState('');
    
      // 5. Filter the recipes based on the current state
      const displayedRecipes = recipes.filter((recipe) => {
        const searchMatch =
          searchTerm === '' ||
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.overview.toLowerCase().includes(searchTerm.toLowerCase());
    
        const prepTimeMatch =
          maxPrepTime === '' || recipe.prepMinutes <= parseInt(maxPrepTime);
        
        const cookTimeMatch =
          maxCookTime === '' || recipe.cookMinutes <= parseInt(maxCookTime);
    
        return searchMatch && prepTimeMatch && cookTimeMatch;
      });
    

  return (
    <>
         <FilterControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            maxPrepTime={maxPrepTime}
            setMaxPrepTime={setMaxPrepTime}
            maxCookTime={maxCookTime}
            setMaxCookTime={setMaxCookTime}
        />

        <RecipeList displayedRecipes={displayedRecipes} />
    </>
  )
}

export default Recipes