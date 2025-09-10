import Image from "next/image";
import Ready from "@/UI/Ready";
import Article from "./article";
import { whyweexist, ourfoodphilosophy } from "@/data/data";

export const metadata = {
    title: {
      default: 'About',
      template: 'About | Recipe App', // e.g., "Chicken Curry | Recipe App"
    },
    description: 'Discover what this website is all about.',
    openGraph: {
      title: 'About | Recipe App',
      description: 'Find the reason why this recipe finder was built.',
      images: '/image-about-our-mission-small.webp', // 1200x630px image in /public
      type: 'website',
      url: 'https://your-recipe-app.com',
    },
    twitter: {
      card: 'About_Our_image',
      title: 'Recipe App',
      description: 'Explore recipes with ease.',
      images: '/image-about-our-mission-small.webp',
    },
    robots: {
      index: true,
      follow: true,
    },
  };

export default function About() {
    return (
        <main>
            <section className="relative grid grid-cols-1 lg:grid-cols-2 items-start lg:items-center gap-[64px] py-[64px] md:py-[80px] lg:py-[96px]">
                <div className="space-y-[24px]">
                    <span className="text-preset5 text-Neutral900 bg-Orange500 px-1 rounded-[6px]">Our mission</span>
                    <h1 className="text-preset2 text-Neutral900">Help more people cook nourishing meals, more often.</h1>
                    <p className="text-preset6 text-Neutral800">Healthy Recipe Finder was created to prove that healthy eating can be convenient, affordable, and genuinely delicious.</p>
                    <p className="text-preset6 text-Neutral800">We showcase quick, whole-food dishes that anyone can master—no fancy equipment, no ultra-processed shortcuts—just honest ingredients and straightforward steps.</p>
                </div>
                <picture className="w-full">
                    <source
                    media="(min-width: 1024px)"
                    srcSet="/assets/images/image-about-our-mission-large.webp"
                    />
                    <Image
                    src="/assets/images/image-about-our-mission-small.webp"
                    alt="Mission Image"
                    width={800}
                    height={600}
        
                    className="w-full h-auto rounded-[10px] "
                    quality={100}
                    />
                </picture>
                <Image src="/assets/images/pattern-squiggle-2.svg" alt="Pattern Squiggly" width={100} height={100} className="w-[20%] hidden lg:block absolute bottom-[10rem] right-[-5rem]" />
            </section>
            <section>
                <Article title="Why we exist" articledata={whyweexist} />
                <Article title="Our food philosophy" articledata={ourfoodphilosophy} />
            </section>
            <div className="w-screen relative left-1/2 -translate-x-1/2 border-b border-Neutral300"></div>
            <section className="flex flex-col lg:flex-row items-start lg:items-center gap-[40px] pt-[48px] md:py-[80px] lg:py-[96px]">
                <div className="flex flex-col items-start gap-[20px]">
                    <h2 className="text-preset2 text-Neutral900">Beyond the plate</h2>
                    <p className="text-preset6 text-Neutral800">We believe food is a catalyst for community and well-being. By sharing approachable recipes, we hope to:</p>
                    <ul className="text-preset6 text-Neutral800 !list-style-disc">
                        <li>Encourage family dinners and social cooking.</li>
                        <li>Reduce reliance on single-use packaging and delivery waste.</li>
                        <li>Spark curiosity about seasonal produce and local agriculture.</li>
                    </ul>
                </div>
                <picture className="w-full">
                    <source
                    media="(min-width: 1024px)"
                    srcSet="/assets/images/image-about-beyond-the-plate-large.webp"
                    />
                    <Image
                    src="/assets/images/image-about-beyond-the-plate-small.webp"
                    alt="Beyond the plate Image"
                    width={800}
                    height={600}
        
                    className="w-full h-auto rounded-[10px] "
                    quality={100}
                    />
                </picture>
            </section>
            <Ready />
        </main>
    );
}