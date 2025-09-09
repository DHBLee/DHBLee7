
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export const metadata = {
  title: {
    default: 'Recipe App',
    template: '%s | Recipe App', // e.g., "Chicken Curry | Recipe App"
  },
  description: 'Discover delicious recipes with prep and cook time filters.',
  openGraph: {
    title: 'Recipe App',
    description: 'Find and filter recipes easily.',
    images: '/image-about-beyond-the-plate-large.webp', // 1200x630px image in /public
    type: 'website',
    url: 'https://your-recipe-app.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recipe App',
    description: 'Explore recipes with ease.',
    images: '/image-about-beyond-the-plate-large.webp',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="relative antialiased px-[16px] md:px-[32px] lg:px-[60px] bg-Neutral100"
      >
        <Header />
        {children}
        <Footer />
        <div id="mobile-nav"></div>
      </body>
    </html>
  );
}
