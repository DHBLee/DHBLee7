'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileNav from "./MobileNav";
import { links } from "../data/data";
import Button from "@/UI/Button";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
        
            <header className="py-[20px]  flex items-center justify-between lg:justify-between">
                <Image src="/assets/images/logo.svg" alt="Logo" width={100} height={100} className="w-[240px]" />
                <nav className="hidden lg:block">
                    <ul className="flex gap-[32px] text-preset7 text-Neutral900">
                        {links.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <button className="lg:hidden rounded-[4px] bg-Neutral200 p-[12px]" aria-label="Toggle menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Image src="/assets/images/icon-hamburger-menu.svg" alt="Switch" width={24} height={24} />
                </button>

                <Button extraStyles={'hidden lg:block px-[16px] py-[12px] ml-[2rem]'} href="/recipes">
                    Browse recipes
                </Button>
            </header>
            <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}