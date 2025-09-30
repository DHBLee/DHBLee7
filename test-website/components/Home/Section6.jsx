'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { rooms } from '@/util/data';
import { workSans } from '@/app/fonts';
import backgroundImg from '@/public/images/background/background-texture.png';

export default function Section6() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [incomingReady, setIncomingReady] = useState(false);

  const curr = rooms[activeIdx]?.img ?? '/images/background/wood-fire.webp';
  const prev = rooms[prevIdx]?.img ?? '/images/background/wood-fire.webp';

  // When a new room is selected, prepare to fade once the new image decodes
  const onSelect = (idx) => {
    if (idx === activeIdx) return;
    setPrevIdx(activeIdx);
    setIncomingReady(false);     // wait for new image decode
    setActiveIdx(idx);
  };

  // Kick off fade when incoming image is ready
  useEffect(() => {
    if (!incomingReady) return;
    setIsFading(true);
    const t = setTimeout(() => setIsFading(false), 500); // match duration-500
    return () => clearTimeout(t);
  }, [incomingReady]);

  return (
    <section className="flex flex-col gap-6 items-center  relative px-[24px] md:px-[32px] 1440:px-[86px] py-[24px] md:py-[32px] 1440:py-[40px]">
      <Image src={backgroundImg} fill  />
      <div role="tablist" aria-label="Room selector" className="relative z-[2] mb-4 flex justify-center gap-3 flex-wrap">
        {rooms.map((room, idx) => (
          <button
            key={room.name}
            role="tab"
            aria-selected={activeIdx === idx}
            aria-controls="room-panel"
            id={`room-tab-${idx}`}
            onClick={() => onSelect(idx)}
            className={`px-5 py-1 border rounded HeadingXS transition ${workSans.className}
              ${activeIdx === idx
                ? 'bg-Yellow text-black border-Yellow'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}
          >
            {room.name}
          </button>
        ))}
      </div>

      <div
        id="room-panel"
        role="tabpanel"
        aria-labelledby={`room-tab-${activeIdx}`}
        className="relative w-full h-full aspect-[1/1] md:aspect-[2/1] overflow-hidden rounded"
      >
        {/* Previous image (fades out) */}
        <Image
          key={prev + '-prev'}
          src={prev}
          alt={rooms[prevIdx]?.name ?? 'Room'}
          fill
          sizes="100vw"
          className={`object-cover absolute inset-0 z-0 transition-opacity duration-500 ease-out
            ${isFading ? 'opacity-0' : 'opacity-100'}`}
          priority
        />

        {/* Current image (waits hidden until decoded, then fades in) */}
        <Image
          key={curr + '-curr'}
          src={curr}
          alt={rooms[activeIdx]?.name ?? 'Room'}
          fill
          sizes="100vw"
          className={`object-cover absolute inset-0 z-10 transition-opacity duration-500 ease-out
            ${incomingReady ? 'opacity-100' : 'opacity-0'}`}
          // When the new image is decoded and ready to paint, start the fade
          onLoadingComplete={() => setIncomingReady(true)}
          priority
        />
      </div>
    </section>
  );
}
