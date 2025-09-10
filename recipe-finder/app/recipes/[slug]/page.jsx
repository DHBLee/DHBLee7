// app/recipes/[slug]/page.js
import { notFound } from 'next/navigation';
import recipes from '@/data/data.json';
import Image from 'next/image';
import CatgoeryUI from '@/app/recipes/catgoeryUI';
import RecipeList from '@/components/RecipeList';
import Link from 'next/link';

export async function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({ params }) {
  const recipe = recipes.find((r) => r.slug === params.slug);
  
  if (!recipe) {
    return {
      title: 'Recipe Not Found',
    };
  }

  return {
    title: recipe.title,
    description: recipe.overview,
  };
}

export default async function RecipePage({ params }) {
  const recipe = recipes.find((r) => r.slug === params.slug);

  if (!recipe) {
    notFound();
  }

  const otherRecipes = recipes.filter(r => r.id !== recipe.id).slice(0, 3);

  return (
    <main className="py-12 space-y-6">
      <h1 className="text-preset7 text-Neutral900"><Link href="/recipes" className='text-Neutral300'>Recipes /</Link> {recipe.title}</h1>
      <article className='grid grid-cols-1 lg:grid-cols-2 items-start gap-[32px] lg:gap-[80px]'>
        {/* Recipe Header with Image */}
          <Image
            src={`/${recipe.image.large}`}
            alt={recipe.title}
            width={800}
            height={600}
            className="w-full h-auto rounded-[10px]"
            priority
          />

        {/* Recipe Content */}
        <div className='grid gap-4'>
          <h1 className="text-preset2 text-Neutral900 ">{recipe.title}</h1>
          <p className="text-preset6 text-Neutral800">{recipe.overview}</p>
          
          {/* Meta Info */}
          <div className='flex flex-wrap gap-4'>
            <CatgoeryUI icon="/assets/images/icon-servings.svg" text="Servings:" value={recipe.servings} />
            <CatgoeryUI icon="/assets/images/icon-prep-time.svg" text="Prep time:" value={recipe.prepMinutes} />
            <CatgoeryUI icon="/assets/images/icon-cook-time.svg" text="Cook time:" value={recipe.cookMinutes} />
          </div>

          {/* Ingredients */}
          <div className='space-y-4'>
            <h2 className="text-preset4 text-Neutral900">Ingredients</h2>
            <ul className="space-y-2 list-with-arrow">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className='text-preset6 text-Neutral800'>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className='space-y-4'>
            <h2 className="text-preset4 text-Neutral900">Instructions</h2>
            <ol className="space-y-4 list-with-arrow">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className='text-preset6 text-Neutral800'>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

        </div>
      </article>

      
      <article className='space-y-4 py-[48px] lg:pt-[68px] lg:pb-[96px]'>
        <div className="w-screen relative left-1/2 -translate-x-1/2 border-b border-Neutral300"></div>
        <h2 className="text-preset3 text-Neutral900">More recipes</h2>
        <RecipeList displayedRecipes={otherRecipes}/>
      </article>
    </main>
  );
}