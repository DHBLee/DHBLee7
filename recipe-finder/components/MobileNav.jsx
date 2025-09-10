'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { links } from '../data/data';

const MobileNav = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div 
  className={`absolute top-[6rem] w-[calc(100%-32px)] md:w-[calc(100%-64px)] rounded-[6px] bg-Neutral0 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}
>

      <nav className="p-4">
        <ul className="space-y-6">
          {links.map((link) => (
            <li key={link.name}>
              <Link href={link.href} onClick={onClose}>{link.name}</Link>
            </li>
          ))}
          <li>
            <button 
              className="w-full rounded-[4px] bg-Neutral900 px-[16px] py-[12px] text-Neutral100"
              onClick={onClose}
            >
              Browse recipes
            </button>
          </li>
        </ul>
      </nav>
    </div>,
    document.getElementById('mobile-nav')
  );
};

export default MobileNav;