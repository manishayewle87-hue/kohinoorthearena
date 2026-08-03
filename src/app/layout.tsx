import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import GlobalScripts from "@/components/GlobalScripts";
import Modals from "@/components/Modals";

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
    "buy flat in Pimpri", "luxury apartments PCMC", "Life in Motion Pimpri", 
    "Kohinoor The Arena price", "flats for sale in Pimpri", "premium apartments in Pimpri", 
    "upcoming projects in Pimpri", "ready possession flats in Pimpri", 
    "Mahalaxmi The Arena", "Kohinoor Arena Pimpri", "2 BHK flats in Pimpri", 
    "3 BHK luxury apartments Pimpri", "4 BHK flats in Pimpri", 
    "best residential projects in PCMC", "investment property PCMC",
    "flats near Pimpri Metro", "buy luxury apartment in Pimpri", "Life in Motion floor plan",
    "Mahalaxmi The Arena brochure", "Kohinoor Group projects Pimpri"
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
    title: "Mahalaxmi The ARENA | 2, 3 & 4 BHK Sports Township in Pimpri, Pune",
    description: "Discover Mahalaxmi The ARENA in Pimpri, Pune — an ultra-modern residential sports township featuring an 80,000 sq. ft. sports OS across 11 luxury towers.",
    url: "https://kohinoorthearena.vercel.app",
    siteName: "Mahalaxmi The ARENA",
    images: [
      {
        url: "/assets/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Mahalaxmi The ARENA - Sports Township in Pimpri",
      }
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahalaxmi The ARENA | 2, 3 & 4 BHK Sports Township in Pimpri, Pune",
    description: "Discover Mahalaxmi The ARENA in Pimpri, Pune — an ultra-modern residential sports township featuring an 80,000 sq. ft. sports OS across 11 luxury towers.",
    images: ["/assets/images/hero-bg.jpg"],
  },
  alternates: {
    canonical: "https://kohinoorthearena.vercel.app",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Mahalaxmi The ARENA",
    "alternateName": ["Kohinoor The Arena", "Life in Motion Pimpri", "Life in Motion Pune"],
    "image": "https://kohinoorthearena.vercel.app/assets/images/hero-bg.jpg",
    "description": "Discover Mahalaxmi The ARENA (Codename Life in Motion) in Pimpri, Pune — an ultra-modern 2, 3 & 4 BHK residential sports township featuring an 80,000 sq. ft. sports operating system.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pimpri",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "url": "https://kohinoorthearena.vercel.app",
    "telephone": "+91-0000000000"
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
      </head>
      <body>
        <GlobalScripts />
        <Modals />
        {children}
      </body>
    </html>
  );
}
