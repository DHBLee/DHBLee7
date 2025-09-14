'use client';
import { useState } from 'react';
import Image from 'next/image';
import { rooms } from '@/util/data';
import { workSans } from '@/app/fonts';

export default function Section6() {
  const [activeIdx, setActiveIdx] = useState(0);
  const bgSrc = rooms[activeIdx]?.img ?? '/images/background/wood-fire.webp';

  return (
    <>
      <section className="flex flex-col gap-6 items-center bg-[#333333] relative  px-[24px] md:px-[32px] 1440:px-[86px] py-[24px] md:py-[32px] 1440:py-[40px]">
        {/* Button group (tabs) */}
        <div role="tablist" aria-label="Room selector" className="mb-4 flex justify-center gap-3 flex-wrap">
          {rooms.map((room, idx) => (
            <button
              key={room.name}
              role="tab"
              aria-selected={activeIdx === idx}
              aria-controls="room-panel"
              id={`room-tab-${idx}`}
              onClick={() => setActiveIdx(idx)}
              className={`px-5 py-1 border rounded HeadingXS transition ${workSans.className}
                ${activeIdx === idx
                  ? 'bg-Yellow text-black border-Yellow'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}
            >
              {room.name}
            </button>
          ))}
        </div>

        {/* Full-size selected room image */}
        <div
          id="room-panel"
          role="tabpanel"
          aria-labelledby={`room-tab-${activeIdx}`}
          className="relative w-full h-full aspect-[1/1] md:aspect-[2/1]"
        >
          <Image
            src={bgSrc}
            alt={rooms[activeIdx]?.name ?? 'Room'}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-[opacity,transform] duration-500 ease-out rounded"
          />
        </div>
      </section>
    </>
  );
}
