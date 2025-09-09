import React from 'react'
import Image from 'next/image';
import CatgoeryUI from '@/app/recipes/catgoeryUI';
import Button from '@/UI/Button';


const RecipeList = ({displayedRecipes = [] }) => {
  return (
    <section>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
    {displayedRecipes.length > 0 ? (
        displayedRecipes.map((recipe) => (
            <div key={recipe.id} className="p-2 space-y-4 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <picture className="w-full">
                        <source
                        media="(min-width: 1024px)"
                        srcSet={`/${recipe.image.large}`}
                        />
                        <Image
                        src={`/${recipe.image.small}`}
                        alt={recipe.title}
                        width={800}
                        height={600}
            
                        className="w-full h-auto rounded-[10px] "
                        />
                    </picture>
                    <div className="flex-1 flex flex-col gap-3">
                        <h2 className="text-preset5 text-Neutral900 truncate">
                            {recipe.title}
                        </h2>
                        <p className="text-preset9 text-Neutral800 flex-1">
                            {recipe.overview}
                        </p>
                        <div className="flex flex-wrap gap-4 ">
                            <CatgoeryUI icon="/assets/images/icon-servings.svg" text="Servings:" value={recipe.servings} />
                            <CatgoeryUI icon="/assets/images/icon-prep-time.svg" text="Prep time:" value={recipe.prepMinutes} />
                            <CatgoeryUI icon="/assets/images/icon-cook-time.svg" text="Cook time:" value={recipe.cookMinutes} />
                        </div>
                        <Button
                            aria-label="View recipe"
                            href={`/recipes/${recipe.slug}`}
                            extraStyles="!w-full text-center !rounded-[50px] py-[12px]"
                        >
                            View Recipe
                        </Button>
                    </div>
                        </div>
                    ))
                ) : (
                    <p>No recipes match your filters. Try clearing them!</p>
                )}

        </div>
        </section>
  )
}

export default RecipeList