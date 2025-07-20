'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import Link from 'next/link';

const API_URL = 'https://api.sheetbest.com/sheets/6b54a76a-271c-4df0-9126-5c7481bcd075/tabs/events';


const isValidEvent = (event) => {
  // Check that all required fields exist and are non-empty strings
  const requiredFields = ['image', 'name', 'description', 'duration'];
  return requiredFields.every(
    (field) =>
      event[field] !== undefined &&
      event[field] !== null &&
      String(event[field]).trim() !== ''
  );
};

const HighlightedEvent = () => {
  const [event, setEvent] = useState(null);
  const [show, setShow] = useState(false);

   useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((events) => {
        const highlightedEvents = events.filter((e) => e.highlight === 'YES');

        if (highlightedEvents.length === 1 && isValidEvent(highlightedEvents[0])) {
          setEvent(highlightedEvents[0]);
          setTimeout(() => setShow(true), 5000);
        } else {
          console.log('Skipping pop-ad due to invalid highlight count or invalid event data');
        }
      })
      .catch((error) => {
        console.error('Failed to fetch events:', error);
      });
  }, []);

  if (!event || !show) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 grid place-items-center z-[9999]">
      <div className="grid gap-4 text-center bg-Black rounded-xl p-6 max-w-md w-full relative">
        <button onClick={() => setShow(false)} className="absolute top-2 right-2 text-gray-500 hover:text-black" aria-label='an icon letter X'><X /></button>
        <img src={event.image} alt={event.name} className="rounded-md  w-full h-auto object-cover" />
        <h2 className="HeadingS font-semibold">{event.name}</h2>
        <p className="Body text-white">{event.description}</p>
        <p className="BodySmall">{event.duration}</p>
        <Link href="/events">
            <Button>
                See Events
            </Button>
        </Link>
      </div>
    </div>,
    document.getElementById('highlighted-event')
  );
};

export default HighlightedEvent;
