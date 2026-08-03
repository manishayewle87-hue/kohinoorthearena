import type { Metadata } from "next";
import Script from "next/script";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import GlobalScripts from "@/components/GlobalScripts";
import Modals from "@/components/Modals";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kohinoorthearena.vercel.app'),
  title: {
    default: "Mahalaxmi The ARENA | Life in Motion | 2, 3 & 4 BHK in Pimpri",
    template: "%s | Mahalaxmi The ARENA | Life in Motion"
  },
  description: "Discover Mahalaxmi The ARENA in Pimpri, Pune — an ultra-modern 2, 3 & 4 BHK residential sports township featuring an 80,000 sq. ft. sports operating system managed by ILESEUM Sports Management across 11 luxury 34-storey towers.",
  keywords: [
    "Mahalaxmi The Arena",
    "Kohinoor The Arena",
    "Life in Motion Pimpri",
    "Pimpri Real Estate",
    "Pune Real Estate Market",
    "Entire Pune real estate market",
    "Pimpri Chinchwad real estate market",
    "PCMC real estate",
    "Kohinoor Pimpri real estate",
    "Mahalaxmi real estate Pimpri",
    "Flats in Pimpri",
    "Luxury apartments in Pimpri",
    "Buy flat in Pimpri",
    "Property in Pimpri",
    "2 BHK in Pimpri",
    "3 BHK in Pimpri",
    "4 BHK flats in Pimpri",
    "Premium apartments PCMC",
    "Flats near PCMC Metro",
    "Flats in Chinchwad",
    "Luxury apartments Pune",
    "New launch projects Pimpri",
    "Upcoming projects Pimpri",
    "Ready possession flats Pimpri",
    "Best property investment in Pune",
    "Top real estate developers in PCMC"
  ],
  authors: [{ name: "Kohinoor Group & Mahalaxmi Group" }],
  creator: "Kohinoor Group",
  publisher: "Mahalaxmi The ARENA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Mahalaxmi The Arena | Premium Real Estate in Pimpri Chinchwad, Pune",
    description: "Discover the ultimate sports township in PCMC. Premium 2, 3 & 4 BHK luxury residences by Mahalaxmi and Kohinoor Group.",
    url: "https://kohinoorthearena.vercel.app",
    siteName: "Mahalaxmi The Arena",
    images: [
      {
        url: "https://kohinoorthearena.vercel.app/assets/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Mahalaxmi The Arena Aerial View",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahalaxmi The Arena Pimpri | Kohinoor Life in Motion",
    description: "Premium 2, 3 & 4 BHK luxury sports township in PCMC, Pune.",
    images: ["https://kohinoorthearena.vercel.app/assets/images/hero-bg.jpg"],
  },
  alternates: {
    canonical: "https://kohinoorthearena.vercel.app",
  },
  verification: {
    google: "2ra2pGDEk6-2G2LYEGVQG6f5zRnF_3UG_gMJWAwAbE8",
  }
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kohinoor Group & Mahalaxmi Group",
    "url": "https://kohinoorthearena.vercel.app",
    "logo": "https://kohinoorthearena.vercel.app/assets/images/favicon.ico",
    "description": "Mahalaxmi Group and Kohinoor Group joint venture for premium real estate development in Pune."
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "2 BHK Luxury Sports Residence",
    "image": "https://kohinoorthearena.vercel.app/assets/images/hero-bg.jpg",
    "description": "Premium 2 BHK apartment in Mahalaxmi The Arena, Pimpri.",
    "brand": {
      "@type": "Brand",
      "name": "Kohinoor Group"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://kohinoorthearena.vercel.app/#residences",
      "priceCurrency": "INR",
      "price": "8850000",
      "availability": "https://schema.org/PreOrder"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "3 BHK Premium Residence",
    "image": "https://kohinoorthearena.vercel.app/assets/images/hero-bg.jpg",
    "description": "Luxury 3 BHK apartment in Mahalaxmi The Arena, Pimpri.",
    "brand": {
      "@type": "Brand",
      "name": "Mahalaxmi Group"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://kohinoorthearena.vercel.app/#residences",
      "priceCurrency": "INR",
      "price": "12800000",
      "availability": "https://schema.org/PreOrder"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Mahalaxmi The ARENA",
    "alternateName": ["Kohinoor The Arena", "Life in Motion Pimpri", "Life in Motion Pune"],
    "image": "https://kohinoorthearena.vercel.app/assets/images/hero-bg.jpg",
    "description": "Discover Mahalaxmi The ARENA (Codename Life in Motion) in Pimpri, Pune — an ultra-modern 2, 3 & 4 BHK residential sports township featuring an 80,000 sq. ft. sports operating system.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pimpri-Chinchwad",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411018",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.6278",
      "longitude": "73.7997"
    },
    "url": "https://kohinoorthearena.vercel.app",
    "telephone": "+91-0000000000",
    "priceRange": "₹88.5 L - ₹2.15 Cr"
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the price of a 3 BHK in Mahalaxmi The Arena?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The price of a 3 BHK Smart Residence at Mahalaxmi The Arena starts from ₹ 1.28 Cr Onwards, while the 3 BHK Grand Corner Suite starts from ₹ 1.49 Cr Onwards."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Kohinoor The Arena located in Pimpri?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kohinoor The Arena (also known as Life in Motion Pimpri) is strategically located in the heart of Pimpri, PCMC, just 2.4 km from the PCMC Metro Station."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://kohinoorthearena.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Residential Projects in PCMC",
        "item": "https://kohinoorthearena.vercel.app/#projects"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Flats in Pimpri",
        "item": "https://kohinoorthearena.vercel.app/#pimpri"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Mahalaxmi The Arena",
        "item": "https://kohinoorthearena.vercel.app/#hero"
      }
    ]
  }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
        />
        <link 
          rel="icon" 
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%230D0818'/><text x='50%25' y='55%25' dominant-baseline='central' text-anchor='middle' font-size='50'>🏃</text></svg>"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Core Web Vitals (LCP) Hardening */}
        <link rel="preload" href="https://kohinoorthearena.vercel.app/assets/images/hero-bg.jpg" as="image" />

        {/* Performance Hardening: Preconnect to Analytics Domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        
        {/* Google Analytics 4 Stub */}
        <Script 
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>

        {/* Meta Pixel Stub */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'XXXXXXXXXXXXXXX');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body>
        <GlobalScripts />
        <Modals />
        <FloatingWhatsApp />
        {children}
      </body>
    </html>
  );
}
