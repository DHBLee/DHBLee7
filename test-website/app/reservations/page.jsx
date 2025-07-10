import Image from 'next/image'
import React from 'react'

export const metadata = {
    title: "Reservations",
    description: "Book a table in Mezzalira Ristorante",
}

const reservations = () => {
  return (
    <div className='relative min-h-screen'>
        <Image src="/DSC02024.JPG" alt="Mezzalira Restaurant" fill className="absolute object-cover" /> 

        <div className='relative pt-[5rem] pb-[3rem] z-20 flex gap-10 items-center px-[86px]'>
            <div>
                <h2 className='text-[48px] mb-[2rem]'>RESERVATIONS</h2>
                <div className='text-[16px] bg-[#333333]/40 px-[14px] py-[3rem] flex flex-col gap-4'>
                    <p>MEZZALIRA IS OPEN LUNCH 12PM UNTIL 230PM AND DINNER FROM 6PM UNTIL 10PM TUESDAY – FRIDAY AND FROM 6PM UNTIL 10PM SATURDAY. RESERVATIONS ARE RELEASED ON THE 1ST OF THE MONTH FOR THE NEXT 90DAYS, FOR PARTIES UP TO 14 GUESTS.</p>
                    <h5 className='font-semibold text-[20px] mb-[10px]'>PRIVATE DINING ROOM</h5>
                    <p>OUR PRIVATE ROOM CAN ACCOMMODATE GROUPS OF 8 to 14 peopleWE HAVE MEDIA FACILITIES AVAILABLE, PLEASE CALL FOR DETAILS. ALL PRIVATE ROOM BOOKINGS WILL BE REQUIRED TO DINE FROM OUR PRIVATE DINING MENU OPTIONS EITHER OUR THREE COURSE A LA CARTE MENU, 4 COURSE SHARING MENU OR 7 COURSE TASTING MENU. FUNCTION MENU</p>
                    <h5 className='font-semibold text-[20px] mb-[10px]'>BOOKING TERMS</h5>
                    <p>TO SECURE YOUR RESERVATION WE REQUIRE CREDIT CARD DETAILS, IN AN EFFORT TO DISCOURAGE NO SHOWS. BOOKINGS PRIOR TO 7.30 PM WILL HAVE AN ALLOCATED DINING TIME OF TWO HOURS.</p>
                    <p>WE DO NOT ALLOW BYO WINE AND WE DO NOT ALLOW ANY FOOD OR CAKES TO BE BROUGHT IN FROM OUTSIDE OF OUR KITCHEN</p>
                    <p>IF YOU DO NOT SEE YOUR PREFERRED BOOKING TIME, PLEASE CALL 02 62300025 OR EMAIl mail@mezzalira.com.au   TO CHECK FOR ADDITIONAL AVAILABILITY.</p>
                    <h5 className='font-semibold text-[20px] mb-[10px]'>CANCELLATIONS</h5>
                    <p>WE REQUIRE CREDIT CARD DETAILS AS SECURITY ON ALL BOOKINGS. CANCELLATIONS MADE WITHIN LESS THAN 24 HOURS OF YOUR BOOKED TIME, OR FAILURE OF GUESTS TO SHOW UP, WILL RESULT IN AN AUTOMATIC $50 PER PERSON CHARGE.</p>
                    <p>SHOULD WE BE ABLE TO RE-BOOK THE TABLE NO CHARGES WILL BE MADE AGAINST YOUR CARD</p>
                    <h5 className='font-semibold text-[20px] mb-[10px]'>THINGS TO CONSIDER</h5>
                    <ul>
                        <li>WE DO NOT OFFER BYD CAKES OR BEVERAGE</li>
                        <li>HIGHCHAIRS ARE NOT AVAILABLE</li>
                        <li>WE DO NOT OFFER A CHILDREN'S MENU</li>
                    </ul>
                    <p>FOR MORE INFORMATION PLEASE SEE OUR FAQ. EMAIL OR CALL OUR TEAM IF YOU REQUIRE ASSISTANCE WITH YOUR BOOKING</p>
                </div>
            </div>
            <iframe
                src="https://obee.com.au/mezzalira"
                frameBorder="0"
                width="100%"
                height="700px"
                scrolling="no"
                allowtransparency="true"
                style={{ minHeight: '450px', height: '697px' }}
                className="obee-iframe-widget bg-white"
                title="Mezzalira Booking"
            >
                Your browser cannot load the Online Booking Widget.{' '}
                <a href="https://obee.com.au/mezzalira">Click here to make a booking instead.</a>
            </iframe>
        </div>
    </div>
  )
}

export default reservations