
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="py-[32px] md:py-[40px] flex flex-col md:flex-row-reverse md:justify-between items-center gap-[16px]">
            <ul className="flex gap-[16px]">
                <a href=""><Image src="/assets/images/icon-instagram.svg" alt="Instagram" target="_blank" width={24} height={24} /></a>
                <a href=""><Image src="/assets/images/icon-bluesky.svg" alt="Bluesky" target="_blank" width={24} height={24} /></a>
                <a href=""><Image src="/assets/images/icon-tiktok.svg" alt="Tiktok" target="_blank" width={24} height={24} /></a>
            </ul>
            <p>Made with ❤️ and 🥑</p>
        </footer>
    );
}