
import Image from "next/image";

const socialLinks = [
    {
        name: "Instagram",
        href: "https://www.instagram.com/", // Replace with your actual Instagram URL
        icon: "/assets/images/icon-instagram.svg",
    },
    {
        name: "Bluesky",
        href: "https://www.bluesky.com/", // Replace with your actual Bluesky URL
        icon: "/assets/images/icon-bluesky.svg",
    },
    {
        name: "Tiktok",
        href: "https://www.tiktok.com/", // Replace with your actual Tiktok URL
        icon: "/assets/images/icon-tiktok.svg",
    },
];


export default function Footer() {
    return (
        <>
            <div className="hidden lg:block w-screen relative left-1/2 -translate-x-1/2 border-b border-Neutral300"></div>
            <footer className="py-[32px] md:py-[40px] flex flex-col md:flex-row-reverse md:justify-between items-center gap-[16px]">
                <ul className="flex gap-[16px]">
                    {socialLinks.map((link) => (
                        <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity duration-300">
                            <Image src={link.icon} alt={link.name} width={24} height={24} />
                        </a>
                    ))}
                </ul>
                <p>Made with ❤️ and 🥑</p>
            </footer>
        </>
    );
}