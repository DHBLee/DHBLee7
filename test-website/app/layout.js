import Footer from '@/components/Footer';
import { lora } from './fonts'
import "./globals.css";
import Header from "@/components/Header";
import HighlightedEvent from '@/UI/HighlightedEvent';
import { SpeedInsights } from "@vercel/speed-insights/next"


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
       url: "/landmark-bg.png",
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
        <Header />
        <main>
          {children}
        </main>
        <Footer />

        <div id="mobile-nav"></div>
        <div id="highlighted-event"></div>

        <HighlightedEvent />

        <SpeedInsights />
      </body>
    </html>
  );
}
