import Reservationsiframe from '@/components/Reservationsiframe'
import Image from 'next/image'
import React from 'react'

const h2Styling = 'font-semibold text-[20px] mb-[10px]'
export const metadata = {
    title: "Reservations",
    description: "Book a table at Mezzalira Ristorante",
    alternates: {
    canonical: "https://mezzalira.com.au/reservations",
  },
  openGraph: {
    title: "reservations – Mezzalira Ristorante",
    description: "Book a table at Mezzalira Ristorante",
    images: [
      {
        url: "/images/background/reservations-bg.webp",
        width: 1200,
        height: 630,
        alt: "Interior photo of Mezzalira Ristorante",
      },
    ],
  },
}

const reservations = () => {
  return (
    <section className='w-full relative min-h-screen grid place-items-center'>
      <div className="absolute inset-0">
        <Image 
          src="/images/background/reservations-bg.webp" 
          alt="BG Picture for Reservations Page" 
          priority 
          fill 
          className="object-cover"
          quality={90}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="/images/blur/reservations-bg-blur.webp"
        />
      </div>
      <section className='relative pt-[5rem] pb-[3rem] z-20 flex flex-col lg:flex-row gap-10 items-center px-[24px] md:px-[32px] 1440:px-[86px]'>
            <div>
                <h1 className='HeadingM mb-[2rem]'>RESERVATIONS</h1>
                <div className='Body bg-Black/40 px-[14px] py-[3rem] flex flex-col gap-4'>
                    <p>MEZZALIRA IS OPEN LUNCH 12PM UNTIL 230PM AND DINNER FROM 6PM UNTIL 10PM TUESDAY – FRIDAY AND FROM 6PM UNTIL 10PM SATURDAY. RESERVATIONS ARE RELEASED ON THE 1ST OF THE MONTH FOR THE NEXT 90DAYS, FOR PARTIES UP TO 14 GUESTS.</p>
                    <section>
                      <h2 className={h2Styling}>PRIVATE DINING ROOM</h2>
                      <p>OUR PRIVATE ROOM CAN ACCOMMODATE GROUPS OF 8 to 14 peopleWE HAVE MEDIA FACILITIES AVAILABLE, PLEASE CALL FOR DETAILS. ALL PRIVATE ROOM BOOKINGS WILL BE REQUIRED TO DINE FROM OUR PRIVATE DINING MENU OPTIONS EITHER OUR THREE COURSE A LA CARTE MENU, 4 COURSE SHARING MENU OR 7 COURSE TASTING MENU. FUNCTION MENU</p>
                    </section>
                    <section>
                      <h2 className={h2Styling}>BOOKING TERMS</h2>
                      <p>TO SECURE YOUR RESERVATION WE REQUIRE CREDIT CARD DETAILS, IN AN EFFORT TO DISCOURAGE NO SHOWS. BOOKINGS PRIOR TO 7.30 PM WILL HAVE AN ALLOCATED DINING TIME OF TWO HOURS.</p>
                      <p>WE DO NOT ALLOW BYO WINE AND WE DO NOT ALLOW ANY FOOD OR CAKES TO BE BROUGHT IN FROM OUTSIDE OF OUR KITCHEN</p>
                      <p>IF YOU DO NOT SEE YOUR PREFERRED BOOKING TIME, PLEASE CALL 02 62300025 OR EMAIl mail@mezzalira.com.au   TO CHECK FOR ADDITIONAL AVAILABILITY.</p>
                    </section>
                    <section>
                      <h2 className={h2Styling}>CANCELLATIONS</h2>
                      <p>WE REQUIRE CREDIT CARD DETAILS AS SECURITY ON ALL BOOKINGS. CANCELLATIONS MADE WITHIN LESS THAN 24 HOURS OF YOUR BOOKED TIME, OR FAILURE OF GUESTS TO SHOW UP, WILL RESULT IN AN AUTOMATIC $50 PER PERSON CHARGE.</p>
                      <p>SHOULD WE BE ABLE TO RE-BOOK THE TABLE NO CHARGES WILL BE MADE AGAINST YOUR CARD</p>
                    </section>
                    <section>
                      <h2 className={h2Styling}>THINGS TO CONSIDER</h2>
                      <ul>
                          <li>WE DO NOT OFFER BYD CAKES OR BEVERAGE</li>
                          <li>HIGHCHAIRS ARE NOT AVAILABLE</li>
                          <li>WE DO NOT OFFER A CHILDREN'S MENU</li>
                      </ul>
                    </section>
                    <p>FOR MORE INFORMATION PLEASE SEE OUR FAQ. EMAIL OR CALL OUR TEAM IF YOU REQUIRE ASSISTANCE WITH YOUR BOOKING</p>
                </div>
            </div>
            <Reservationsiframe />
        </section>
    </section>
  )
}

export default reservations