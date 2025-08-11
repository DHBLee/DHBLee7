import Footer from '@/components/Footer';
import { lora } from './fonts'
import "./globals.css";
import HighlightedEvent from '@/UI/HighlightedEvent';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';
import OrderPickupButton from '@/components/OrderPickupButton';
import Header from '@/components/Header';
export const metadata = {
  title: {
    default: "Mezzalira Ristorante | Best State List Winner in Canberra",
    template: "%s | Mezzalira Ristorante",
  },
  description: "Award-winning Italian restaurant in Canberra. Experience authentic cuisine, fine dining, and exceptional service at Mezzalira Ristorante.",
  keywords: ["Italian restaurant", "Canberra dining", "fine dining", "authentic Italian", "Mezzalira"],
  authors: [{ name: "Mezzalira Ristorante" }],
  openGraph: {
    title: "Mezzalira Ristorante | Best State List Winner in Canberra",
    description: "Award-winning Italian restaurant in Canberra",
    url: "https://mezzalira.com.au",
    siteName: "Mezzalira Ristorante",
    images: [
      { 
       url: "/landmark-bg.webp",
       width: 1200,
       height: 630,
       alt: "Mezzalira ristorante interior"
      }
    ],
    locale: "en_AU",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: 'https://mezzalira.com.au',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mezzalira Ristorante | Best State List Winner in Canberra',
    description: 'Award-winning Italian restaurant in Canberra',
    images: ['/landmark-bg.webp'],
  },
  themeColor: '#ffffff',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Resource Hints */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        
        {/* Preload critical assets */}
        <link 
          rel="preload" 
          href={lora.url} 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        
        {/* Preload above-the-fold images */}
        <link 
          rel="preload" 
          href="/landmark-bg.webp" 
          as="image" 
          imageSrcSet="/landmark-bg.webp 1x, /landmark-bg@2x.webp 2x"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Mezzalira Ristorante",
              "description": "Award-winning Italian restaurant in Canberra",
              "url": "https://your-domain.com",
              "telephone": "+(02)-6230-0025",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "55 London Circuit",
                "addressLocality": "Canberra",
                "addressRegion": "ACT",
                "postalCode": "2061",
                "addressCountry": "AU"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -35.2792501, // Your actual coordinates
                "longitude": 149.1253277
              },
              "openingHours": [
                "Tu-Fr 12:00-14:30",
                "Tu-Sa 18:00-22:00", // Adjust to your actual hours
    
              ],
              "priceRange": "$$-$$$",
              "cuisineType": "Italian",
              "servesCuisine": "Italian",
              "acceptsReservations": true,
              "hasMenu": "https://mezzalira.com.au/menu",
              "image": "https://mezzalira.com.au/restaurant-image.jpg"
            })
          }}
        />
      </head>
      <body
        className={lora.className}
      >
        {/* Skip to main content link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:shadow-lg"
        >
          Skip to main content
        </a>
        
        <Header />
        <main id="main-content" tabIndex="-1">
          {children}
        </main>
        <Footer />

        <div id="mobile-nav"></div>
        <div id="highlighted-event"></div>

        <HighlightedEvent />

        <SpeedInsights />
        <Analytics />
        <OrderPickupButton />
      </body>
    </html>
  );
}
