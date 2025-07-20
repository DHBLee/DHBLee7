
import Section1 from '@/components/Home/Section1';
import Section2 from '@/components/Home/Section2';
import Section3 from '@/components/Home/Section3';
import Section4 from '@/components/Home/Section4';
import Section5 from '@/components/Home/Section5';
import Section6 from '@/components/Home/Section6';
import Section7 from '@/components/Home/Section7';




export default function Home() {

  return (
    <>

      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />

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
      


        {/* Right Side: Autoplay Image */}
       


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



            
    </>
  );
}
