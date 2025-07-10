'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Button from "@/UI/Button";
import Image from "next/image";
import { workSans } from './fonts';
import { lora } from './fonts';
import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const wineImages = [
  '/wine-picture1.png',
  '/wine-picture2.png',
  '/wine-picture3.png',
  '/wine-picture4.png',
]

const testimonials = [
  { name: 'Random Stranger', quote: "Mezzalira never fails to impress. From the moment you step in, the ambiance, service, and food create a truly special experience. It's our go-to place for celebrations — every dish feels thoughtful and refined." },
  { name: 'Gourmet Traveller', quote: " We've been dining at Mezzalira for over a decade, and it remains one of Canberra’s culinary gems. The menu evolves with the seasons, yet always delivers the same warmth and excellence." },
  { name: 'Delicious Magazine', quote: " The kind of place where memories are made. The service is gracious, the wine selection remarkable, and every bite tells a story. A true fine dining experience that still feels personal." },
  { name: 'Local Guest', quote: "My favorite spot for celebrations. Reliable and refined." },
  { name: 'Food Blogger', quote: "Italian dining at its finest. Every visit is memorable." },
  { name: 'Event Organizer', quote: "We hosted an event — it was flawless. The staff are incredible." },
];

const testimonials2 = [
  {
    name: 'Hayley Bird',
    source: 'Google Review',
    text: `" We have been coming here for many years, by far the best Italian restaurant in Canberra. The staff are amazing, and they change their specials each day. they have an extensive wine list, and a beautiful view onto the landscaped gardens across the street. Highly recommend. "`,
    profile: '/hayley-bird.png',
    link: 'https://www.google.com/search?sca_esv=31b5d553926d40b3&sxsrf=AE3TifOEped9Wi4pCExoUQ8Z_up66nqQLQ:1751781939168&si=AMgyJEuzsz2NflaaWzrzdpjxXXRaJ2hfdMsbe_mSWso6src8s_EdowQ2nmygpb1QWsA7NvWFVDHbqAGVEKPeGFjehA2iQUVZK5X3GFgHaCQ5sbOqXtcn7Unu_jpPJh0qTSlaqBFix_zN41FxF_JSb-IxcohbroWXOQ%3D%3D&q=Mezzalira+Italian+Restaurant+Reviews&sa=X&ved=2ahUKEwjx59ShyKeOAxXFslYBHbWPIj8Q0bkNegQIKxAE&biw=1920&bih=911&dpr=1'
  },
  {
    name: 'Higuma 2017',
    source: 'TripAdvisor',
    text: `" Wow! Blown away by an explosion of deliciousness!
I wish there could be a sixth star for these ratings. The Italian food here - AUTHENTIC ITALIAN FOOD - was no less than orgasmic. Perfect is not enough. From the deep fried fiori di zucca to the carpaccio, the pasta, oh my good, we were run over by an unexpected train of gorgeous flavours. This linguine alle vongole with grated bottarga was better than any similar I have had in Italy, or those that my mother and my grandfather used to prepare. I was so allured to it that completely forgot to get that picture taken. Perhaps the best Italian restaurant I have been to in Australia. Cannot say anything else. Perfect is just not enough. "`,
    profile: '/higuma2017.jpg',
    link: 'https://www.tripadvisor.com.au/ShowUserReviews-g255057-d727149-r981766975-Mezzalira_Italian_Restaurant-Canberra_Australian_Capital_Territory.html'
  },
  {
    name: 'Gourmet Traveller',
    source: 'Gourmet Traveller',
    text: `" The tortellini are a standout, the sweetness of pumpkin, buffalo mozzarella and leek complemented by nutty burnt butter and sage. The wood-fired oven, meanwhile, does a smashing job with the likes of suckling pig, served with fennel and mustard fruits. "`,
    profile: '/gourmet-traveller.png',
    link: 'https://www.gourmettraveller.com.au/dining-out/food-news/hot-plates-20-november-2014-3406/'
  },
  {
    name: 'Delicious Magazine',
    source: 'Delicious Magazine',
    text: `" Mezzalira is a shining example of premium dining with emphasis on stellar service, meandering through Southern Italy with style and finesse. "`,
    profile: '/delicious-magazine.png',
    link: 'https://www.delicious.com.au/eat-out/restaurants/business/mezzalira-canberra/upmtkeaf'
  },
];

const slideshowImages = [
  '/tiramisu-single.png',
  '/fish.JPG',
  '/bread.JPG',
  '/pasta.JPG',
  '/beef.JPG',
]

const sentence = "Celebrating 30 Years of Refined Italian Dining";

const container = {
  hidden: { },
  visible: {
    transition: {
      staggerChildren: 0.035, 
      delayChildren: 1.5,
    },
  },
};

const letter = {
  hidden: { opacity: 0,  },
  visible: { opacity: 1,},
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const nextTestimonial = () =>
    setTestimonialIndex((prev) => (prev + 1) % testimonials2.length);

  const prevTestimonial = () =>
    setTestimonialIndex((prev) => (prev - 1 + testimonials2.length) % testimonials2.length);

  // Autoplay slideshow images every 5 seconds
  useEffect(() => {
    if (slideshowImages.length === 0) return;

    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slideshowImages.length]);
  useEffect(() => {
    if (imageIndex === slideshowImages.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setImageIndex(0);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 600)
    }
  },[imageIndex, slideshowImages.length])

  const currentTestimonial = testimonials2[testimonialIndex];
  const currentImage = slideshowImages[imageIndex];

  const scrollRef = useRef();

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 340;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % wineImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])
  return (
    <>
    
      <div className="relative max-h-[780px]">
        <video
          src="/mezzalira-video.mp4"
          autoPlay
          muted
          loop 
          playsInline
          poster="/mezzalira-video-cover.jpg"
          className="w-full h-auto-object-cover"
        > 
        
        </video>
        <div className="z-50 flex flex-col gap-4 items-center text-center absolute top-[50%] left-[50%] translate-[-50%] w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[64px] leading-[50px]"
          >
            MEZZALIRA RISTORANTE
          </motion.h1>
          
          <motion.h2
            className="text-[16px] flex flex-wrap"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {sentence.split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[154px] bg-gradient-to-t from-black/100 to-transparent pointer-events-none" />
      </div>


      <div className="px-[86px] py-[58px] relative grid place-items-center w-full h-[855px] aspect-[2/1]">
        <Image src="/variety-meets-craft-bg.png" fill alt="A background picture of the kitchen" quality={100} className="object-cover"/>

        <div className="flex flex-col items-center justify-center gap-[30px] absolute ">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`${lora.className} text-[76px] text-center leading-[70px]`}
          >
              <span className='text-[20px]'>WHERE</span><br /> VARIETY<br /> <span className='text-[20px]'>MEETS</span><br /> CRAFT
          </motion.h3>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='flex flex-col gap-10 items-center'
          >
            <p className={`text-[20px] leading-[36px] max-w-[46ch] ${workSans.className}`}>
              Experience modern Italian dining with a focus on - 
            </p>
            <div className={`flex gap-[31px] ${workSans.className}`}>
              <div className='flex flex-col gap-3 justify-center text-center rounded-2xl border-[1px] border-white/30 bg-white/15 backdrop-blur-[2px] w-[364px] h-[239px] p-[24px]'>
                <h4 className='font-bold text-[20px]'>Handmade Pastas</h4>
                <p className='text-[14px]'>Fresh pasta made daily with premium ingredients</p>
              </div>
              <div className='flex flex-col gap-3 justify-center text-center rounded-2xl border-[1px] border-white/30 bg-white/15 backdrop-blur-[2px] w-[364px] h-[239px] p-[24px]'>
                <h4 className='font-bold text-[20px]'>Wood-Fired Flavors</h4>
                <p className='text-[14px]'>Authentic taste from our traditional wood-fired oven</p>
              </div>
              <div className='flex flex-col gap-3 justify-center text-center rounded-2xl border-[1px] border-white/30 bg-white/15 backdrop-blur-[2px] w-[364px] h-[239px] p-[24px]'>
                <h4 className='font-bold text-[20px]'>Seasonal Produce</h4>
                <p className='text-[14px]'>Locally sourced, seasonal ingredients in every dish</p>
              </div>
            </div>
            <Button>
              <Link href="/menu">
                View Our Menu
              </Link>
              
            </Button>

          </motion.div>
        </div>
      </div>

      <div className="relative w-full h-[755px] aspect-[2/1]">
        <Image src="/landmark-bg.png" fill  alt="Picture of Mezzalira outside" className="object-cover"/>
         
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='absolute w-[705px] px-[96px] right-0 h-full flex items-center gap-[74px] backdrop-blur-xs rounded-[5px]'
        >

            <div className="flex flex-col gap-7">
              <p className='text-[16px] leading-[36px]'>Located in the landmark 1920s Melbourne Building on leafy west row, Mezzalira brings classic italian charisma to the heart of Canberra's CBD.</p>
              <p className='text-[16px] leading-[36px]'>Since 1996, Mezzalira has established itself as Canberra’s iconic Italian restaurant. It’s a space for all seasons and reasons, from casual catch-ups at the bar to the ‘cognoscenti’ business lunch crowd.</p>
              <p className='text-[16px] leading-[36px]'>At night it is an elegant dining stage framed by the art deco architecture overlooking the city streets. The menu, like the space, suits any occasion, from aperitivi and snacks to premium wood-fired meats and seafood.</p>
              <Button>
                View Our Location
              </Button>
            </div>
        </motion.div>
      </div>

      {/* <div className="px-[86px] py-[78px] relative w-full h-[700px] aspect-[2/1]">
        <Image src="/tiramisus-bg.png" fill alt="A collage picture of Tiramisu" className="object-cover"/>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`right-[86px] absolute ${michroma.className} text-[48px]`}
        >
            CLASSIC TIRAMISU
        </motion.h3>
      </div>

      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='bg-[#333333] py-[41px] grid gap-8 px-[241px] text-center'
      >
        <p className={`text-[20px] ${workSans.className} leading-[32px]`}>Indulge in our handmade Classic Italian Tiramisu — a rich and velvety dessert layered with house-brewed coffee-soaked ladyfingers, a silky mascarpone cream infused with Marsala wine, and a traditional zabaione for added depth and warmth. Each bite offers a perfect balance of bold coffee, smooth sweetness, and delicate cocoa, capturing the heart of Italy in every spoonful.</p>
        <div className="flex gap-4 justify-center">
          <p className={`text-[20px] ${workSans.className} leading-[32px]`}>
            See more of our dolce - 
          </p>
          <Button>
            Dolce Menu
          </Button>
        </div>

      </motion.div> */}
      

      <div className="px-[86px] py-[78px] relative w-full h-[700px] aspect-[2/1]">
        <div className="absolute inset-0">
          <Image
            src={wineImages[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
        </div>

      {/* Animated overlay image */}
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={wineImages[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
 

        <div className=' flex items-end absolute bottom-[53px]'>
          <p className={`text-[20px] ${workSans.className} max-w-[36ch] leading-[32px]`}>Proudly recognised for our diverse wine list, featuring over 100 handpicked labels. -</p>
          <Button>Wine Menu</Button>
        </div>
      </div>

      <div className="h-[700px] flex relative">
      {/* Left Side: Testimonial */}
        <div className="grid place-items-center relative w-1/2 h-full">
          <button
            onClick={prevTestimonial}
            className="absolute z-20 left-[3.5rem] bg-white/30 hover:bg-white/50 backdrop-blur-md p-2 rounded-full"
          >
            <ChevronLeft />
          </button>

          <div className="flex flex-col gap-4 border-white/20 backdrop-blur-sm rounded-lg justify-center items-center border-[1px] w-[535px] h-[503px] px-[71px] py-[26px] text-justify absolute z-20">
            <img
              src={currentTestimonial.profile}
              alt="Reviewer"
              className="absolute top-[-3rem] w-[100px] h-auto rounded-full border-2 border-white"
            />
            <div className='relative h-[200px] overflow-y-auto scrollbar-none'>
              <p className="text-[16px] leading-[33px] my-auto align-middle">{currentTestimonial.text}</p>
            </div>
            <div className="flex items-end gap-2">
              <h5>{currentTestimonial.name}, </h5>
              <a href={currentTestimonial.link} target='_blank' >
                <span className="text-[12px] underline">{currentTestimonial.source}</span>
              </a>
            </div>
          </div>

          <Image
            src="/testimonials-bgi.png"
            fill
            alt="Kitchen Background"
            className="object-cover"
          />

          <button
            onClick={nextTestimonial}
            className="absolute z-20 right-[3.5rem] bg-white/30 hover:bg-white/50 backdrop-blur-md p-2 rounded-full"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Right Side: Autoplay Image */}
       <div className="relative w-1/2 h-full overflow-hidden">
          <motion.div
            animate={{ x: `-${imageIndex * (100 / (slideshowImages.length + 1))}%` }}
            transition={isTransitioning ? { duration: 0.6, ease: 'easeInOut' } : { duration: 0 }}
            className="flex h-full"
            style={{ width: `${(slideshowImages.length + 1) * 100}%` }}
          >
            {slideshowImages.map((img, i) => (
              <div 
                key={i} 
                className="relative h-full flex-shrink-0"
                style={{ width: `${100 / (slideshowImages.length + 1)}%` }}
              >
                <Image src={img} fill alt={`Slide ${i}`} className="object-cover" />
              </div>
            ))}
            {/* Duplicate first image at the end */}
            <div 
              className="relative h-full flex-shrink-0"
              style={{ width: `${100 / (slideshowImages.length + 1)}%` }}
            >
              <Image src={slideshowImages[0]} fill alt="Slide duplicate" className="object-cover" />
            </div>
          </motion.div>
      </div>

      </div>

      <div className="px-[86px] py-[78px] relative w-full aspect-[2/1]">
        <Image src="/fire-wood.png" fill alt="A Background Picure of a Fire-wood Oven" className="object-cover"/>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='relative z-20'
        >
            <img src="/brighter-images-of-places.png" alt="Images of the interior of Mezzalira Ristorante" />
        </motion.div>
      </div>
      
      <div className='bg-[#333333]'>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className=' py-[41px] grid place-items-center gap-6 px-[241px] text-center'
        >
          <h3 className={`${lora.className} text-[42px]`}>Memorable Meals, Together</h3>
          <p className={`text-[20px] ${workSans.className} leading-[32px]`}>Our function menu, perfect for private events and group dining, our curated function menus feature seasonal produce and a choice of set, shared, or tasting experiences—crafted for memorable celebrations.</p>
          <Button>
            Function Menu
          </Button>
        </motion.div>
      </div>


       {/* <div className="overflow-hidden px-[86px] py-[78px] grid place-content-center relative w-full h-[755px] aspect-[2/1]">
          <Image 
            src="/testimonials-bgi.png" 
            fill 
            alt="A candid picture of chefs in the kitchen" 
            quality={100} 
            className="object-cover"
          />
          
          <div className="absolute inset-0 bg-black/40 z-10" />

          <div className="relative z-20 flex flex-col h-full">
       
            <button onClick={() => scroll('left')} className="absolute left-[440px] top-[50%] translate-y-[-50%] bg-black/80 p-2 rounded-full hover:bg-white z-30">
              <ChevronLeft />
            </button>
            <button onClick={() => scroll('right')} className="absolute right-[440px] top-[50%] translate-y-[-50%] bg-black/80 p-2 rounded-full hover:bg-white z-30">
              <ChevronRight />
            </button>

        
            <div
              ref={scrollRef}
              className="flex gap-6   overflow-y-visible pb-6 scrollbar-none scroll-smooth"

            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  className="overflow-visible relative min-w-[320px] max-w-[450px] text-center h-[375px] flex flex-col gap-[2rem] justify-center items-center bg-[#F5F0E1]/90 p-6 rounded-xl shadow-lg backdrop-blur-sm flex-shrink-0"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
              
                  <div className="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[120px] h-[120px] rounded-full border-2 border-black overflow-hidden z-40">
                    <Image 
                      src="/landmark-bg.png" 
                      width={120} 
                      height={120}
                      className="w-full h-full object-cover"
                      alt="Circular landmark image"
                    />
                  </div>
                  
                  <p className="italic text-gray-800 mt-12">“{t.quote}”</p>
                  <p className="mt-4 font-semibold text-right text-sm text-black">{t.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>  */}

        {/* <div className='flex flex-col items-center gap-[5rem] bg-black px-[86px] py-[86px]'>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='text-[40px]'
              >
                  PREMI E RICONOSCIMENTI
              </motion.h3>
              <img src="/testimonials-picture.png" alt="A picture of all the awards of Mezzalira" />
        </div> */}

        {/* <div className="px-[86px] py-[78px] relative w-full h-[700px] aspect-[2/1]">
        <Image src="/gallery-preview-bg.png" fill alt="A collage picture of Tiramisu" className="object-cover"/>

        <h3 className={`right-[86px] absolute underline underline-offset-8 text-[40px] text-right bottom-[53px]`}>
              See More
        </h3>
      </div> */}


      <div className="px-[86px] py-[78px] grid place-content-center relative w-full h-[755px] aspect-[2/1]">
        <Image src="/newsletter-bg.png" fill alt="A collage picture of Tiramisu" className="object-cover"/>
        
         <motion.div
           initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='absolute w-[740px] top-[50%] left-[50%] translate-[-50%] flex flex-col items-center text-center gap-[4rem]'
        >
          <div>
              <h2 className='text-[48px]'>SIGN UP TO OUR NEWSLETTER</h2>
              <p>To receive regular updates on exciting news, mouth-watering food, award-winning wines and events from Mezzalira and Italian and Sons.</p>
          </div>
          <form action="" className='w-full flex flex-col gap-[1.7rem] items-start'>
                <fieldset className='flex flex-col items-start w-full gap-2'>
                  <label htmlFor="">First Name*</label>
                  <input type="text"  className='text-black px-3 bg-white rounded-lg w-full py-1'/>
                </fieldset>
                <fieldset className='flex flex-col items-start w-full gap-2'>
                  <label htmlFor="">Email*</label>
                  <input type="email"  className='text-black px-3 bg-white rounded-lg w-full py-1'/>
                </fieldset>
                <Button>
                  Subscribe
                </Button>
          </form>
          <span className='mt-[-3rem] text-[10px]'>Your data is safe with us. View our full privacy policy here.</span>
        </motion.div>
       
      </div>
            
    </>
  );
}
