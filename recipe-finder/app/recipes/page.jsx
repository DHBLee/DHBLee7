

import Recipes from "@/components/Recipes";

export default function RecipesPage() {
    return (
        <main className="py-[48px] md:py-[64px] lg:py-[80px]">
            <section className="mb-[48px] md:mb-[64px] max-w-3xl mx-auto px-4 text-left lg:text-center ">
                <h1 className="text-preset2 text-Neutral900 mb-6">
                    Explore our simple, healthy recipes
                </h1>
                <p className="text-preset6 text-Neutral800">
                    Discover eight quick, whole-food dishes that fit real-life schedules and taste amazing. 
                    Use the search bar to find a recipe by name or ingredient, or simply scroll the list 
                    and let something delicious catch your eye.
                </p>
            </section>

           <Recipes />
        </main>
    );
}