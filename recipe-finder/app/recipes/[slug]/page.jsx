// app/recipes/[slug]/page.js
import { notFound } from 'next/navigation';
import recipes from '@/data/data.json';
import Image from 'next/image';
import CatgoeryUI from '@/app/recipes/catgoeryUI';
import RecipeList from '@/components/RecipeList';

export async function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export default function RecipePage({ params }) {
  const recipe = recipes.find((r) => r.slug === params.slug);

  if (!recipe) {
    notFound();
  }

  const otherRecipes = recipes.filter(recipe => recipe.id !== recipe.id).slice(0, 3);

  return (
    <main className="py-12 px-4 max-w-4xl mx-auto">
      <article>
        {/* Recipe Header with Image */}
        <div className="relative h-64 md:h-96 w-full">
          <Image
            src={`/${recipe.image.large}`}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Recipe Content */}
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-lg text-gray-700 mb-8">{recipe.overview}</p>
          
          {/* Meta Info */}
          <div className='flex flex-wrap gap-4'>
            <CatgoeryUI icon="/assets/images/icon-servings.svg" text="Servings:" value={recipe.servings} />
            <CatgoeryUI icon="/assets/images/icon-prep-time.svg" text="Prep time:" value={recipe.prepMinutes} />
            <CatgoeryUI icon="/assets/images/icon-cook-time.svg" text="Cook time:" value={recipe.cookMinutes} />
          </div>

          {/* Ingredients */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
            <ul className="space-y-2 list-with-arrow">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            <ol className="space-y-4 list-with-arrow">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

        </div>
      </article>

      <article className='space-y-4'>
        <h2 className="text-preset3 text-Neutral900">More recipes</h2>
        <RecipeList displayedRecipes={otherRecipes}/>
      </article>
    </main>
  );
}