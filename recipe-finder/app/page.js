import Image from "next/image";
import Button from "@/UI/Button";
import { whatyoullget } from "@/data/data";
import Ready from "@/UI/Ready";

export const metadata = {
  title: 'Home',
  description: 'Discover quick, whole-food recipes that you can cook tonight—no processed junk, no guesswork.',
};

export default function Home() {
  return (
    <>
      <main>
          <section className="pt-[48px] lg:py-[96px] flex flex-col items-start lg:items-center gap-[32px] lg:gap-[80px]">
            <div className="flex flex-col items-start lg:items-center gap-[32px]"> 
              <h1 className="text-preset1 text-Neutral900"><span className="highlighter">Healthy</span> meals, zero fuss</h1>
              <p className="text-preset6 text-Neutral800 lg:text-center max-w-[60ch]">Discover eight quick, whole-food recipes that you can cook tonight—no processed junk, no guesswork.</p> 
              <Button extraStyles="px-[32px] py-[16px]" href="/recipes">
                Start exploring
              </Button>
            </div>
            <picture className="w-full">
              <source
                media="(min-width: 1024px)"
                srcSet="/assets/images/image-home-hero-large.webp"
              />
              <Image
                src="/assets/images/image-home-hero-small.webp"
                alt="Hero Image"
                width={800}
                height={600}
    
                className="w-full h-auto"
                quality={100}
              />
            </picture>
          </section>

          <section className="pt-[64px] md:py-[80px] lg:pt-0 lg:pb-[96px] flex flex-col items-start lg:items-center gap-[32px] md:gap-[48px]">
            <h2 className="text-preset2 text-Neutral900">What you'll get</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-[16px] lg:gap-[32px]">
              {whatyoullget.map((item) => (
                <div key={item.title} className="flex flex-col items-start gap-[16px]">
                  <div className="rounded-[10px] bg-Neutral0 w-[50px] h-[50px] flex items-center justify-center">
                    <Image src={item.image} alt={item.title} width={100} height={100} className="w-[1.7rem]" />
                  </div>
                  <h3 className="text-preset3 text-Neutral900">{item.title}</h3>
                  <p className="text-preset6 text-Neutral800">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="hidden md:block w-screen relative left-1/2 -translate-x-1/2 border-b border-Neutral300"></div>
          <section className="pt-[64px] md:pt-[80px] lg:py-[96px] flex flex-col lg:flex-row items-start lg:items-center gap-[32px] md:gap-[40px]">
            <div className="flex flex-col items-start gap-[16px] max-w-[60ch]">
              <h2 className="text-preset2 text-Neutral900">Built for real life</h2>
              <p className="text-preset6 text-Neutral800">Cooking shouldn’t be complicated. These recipes come in under <span className="highlighter">30 minutes</span> of active time, fit busy schedules, and taste good enough to repeat. </p>
              <p className="text-preset6 text-Neutral800">Whether you're new to the kitchen or just need fresh ideas, we've got you covered.</p>
            </div>
            <Image src="/assets/images/image-home-real-life-small.webp" alt="Built for real life" width={100} height={100} quality={100} sizes="100vw" className="rounded-[10px] w-full" />
          </section>

          <Ready />
      </main>
    </>
  );
}
