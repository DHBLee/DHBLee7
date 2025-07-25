'use client'

import { useSheetData } from '@/util/useSheetData';
import React from 'react';

const Events = ({ initialEvents = [] }) => {
  const [events, loadingEvents] = useSheetData('events', initialEvents);


  console.log(initialEvents);
  function isEventActive(dateRangeStr) {
        if (!dateRangeStr || !dateRangeStr.includes(' - ')) return false;

        const [_, endStr] = dateRangeStr.split(' - ');
        const [endYear, endDay, endMonth] = endStr.split('-').map(Number);
        const endDate = new Date(endYear, endMonth - 1, endDay);
        const today = new Date();

        return today <= endDate;
  }


  return (
    <section className='w-full max-w-[1000px] flex flex-col items-center gap-10 relative z-20 p-4  mx-auto'>
      <h1 className='HeadingM tracking-[3px] font-bold'>EVENTS</h1>

      {loadingEvents ? (<p className="text-gray-500">Loading events...</p>) : 
          <div className="w-full flex flex-col gap-8 mt-8">
            {events.map((event, idx) => {
              console.log(event.image)
              return isEventActive(event.duration) ? (
                <article key={idx} className="w-full flex flex-col md:flex-row items-center gap-[1rem] md:gap-[3rem] p-4 border border-Yellow rounded-2xl shadow-md bg-maroon">
                  <img
                    src={event.image}
                    alt={`Image of ${event.name}`}
                    className="min-w-[100px] w-full max-w-[350px] h-auto max-h-[14rem] object-cover rounded-2xl my-2"
                    onError={(e) => (e.target.src = '/images/ui/placeholder-img.jpg')}
                  />
                  <div className='flex flex-col text-center gap-2 md:text-left'>
                    <h2 className={`HeadingS font-semibold`}>{event.name}</h2>
                    <p className='Body'>{event.description}</p>
                    <p className='BodySmall text-gray-500'>Until {event.duration}</p>
                  </div>
                </article>
              ) : null;
            })}
          </div>
      }
    </section>
  );
};

export default Events;
