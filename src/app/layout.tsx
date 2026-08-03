import type { Metadata } from "next";
import Script from "next/script";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import GlobalScripts from "@/components/GlobalScripts";
import Modals from "@/components/Modals";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { AppProvider } from "@/context/AppContext";
import { Suspense } from "react";
import UTMTracker from "@/components/UTMTracker";
import { getDomainConfig } from "@/lib/domain-config";

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

import { headers } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);

  return {
    metadataBase: new URL(cfg.canonical),
    title: {
      default: cfg.title,
      template: `%s | ${cfg.projectName} | ${cfg.tagline}`
    },
    description: cfg.description,
    keywords: cfg.keywords,
    authors: [{ name: `${cfg.brand} & Partner` }],
    creator: cfg.brand,
    publisher: cfg.projectName,
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
      title: cfg.title,
      description: cfg.description,
      url: cfg.canonical,
      siteName: cfg.projectName,
      images: [{ url: cfg.ogImage, width: 1200, height: 630, alt: `${cfg.projectName} Aerial View` }],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: cfg.title,
      description: cfg.description,
      images: [cfg.ogImage],
    },
    alternates: {
      canonical: cfg.canonical,
    },
    verification: {
      google: cfg.googleVerification,
    },
  };
}

// jsonLd is now built dynamically inside RootLayout using domain config

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  const siteUrl = cfg.canonical;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: cfg.projectName,
      url: siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: cfg.schemaOrg.orgName,
      url: siteUrl,
      logo: cfg.schemaOrg.logoUrl,
      description: `${cfg.projectName} — Premium real estate in Pimpri Chinchwad, Pune.`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: cfg.projectName,
      alternateName: ['Kohinoor The Arena', 'Mahalaxmi The Arena', 'Life in Motion Pimpri'],
      image: cfg.ogImage,
      description: cfg.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Pimpri-Chinchwad',
        addressLocality: 'Pune',
        addressRegion: 'Maharashtra',
        postalCode: '411018',
        addressCountry: 'IN',
      },
      geo: { '@type': 'GeoCoordinates', latitude: '18.6278', longitude: '73.7997' },
      url: siteUrl,
      telephone: cfg.contactPhone,
      priceRange: '₹88.5 L - ₹2.15 Cr',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `What is the price of a 3 BHK in ${cfg.projectName}?`,
          acceptedAnswer: { '@type': 'Answer', text: 'The price of a 3 BHK Smart Residence starts from ₹1.28 Cr onwards.' },
        },
        {
          '@type': 'Question',
          name: 'Where is the Arena located in Pimpri?',
          acceptedAnswer: { '@type': 'Answer', text: 'Located in the heart of Pimpri, PCMC, just 2.4 km from the PCMC Metro Station.' },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Residences', item: `${siteUrl}/#residences` },
        { '@type': 'ListItem', position: 3, name: 'Flats in Pimpri', item: `${siteUrl}/#pimpri` },
      ],
    },
  ];

  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <head>
        <meta name="google-site-verification" content={cfg.googleVerification} />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%230D0818'/><text x='50%25' y='55%25' dominant-baseline='central' text-anchor='middle' font-size='50'>🏃</text></svg>" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* ── Google Compliance: hreflang + Canonical Cross-Domain Signals ── */}
        {/* Tells Google these two domains are related, not duplicates */}
        <link rel="alternate" hrefLang="en-IN" href="https://kohinoorthearena.in" />
        <link rel="alternate" hrefLang="en-IN" href="https://mahalaxmithearena.in" />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <link rel="canonical" href={siteUrl} />

        {/* Core Web Vitals (LCP) Hardening — preload domain-specific hero */}
        <link rel="preload" href={`${siteUrl}/assets/images/hero.jpg`} as="image" />

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
        <Suspense fallback={null}>
          <UTMTracker />
        </Suspense>
        <AppProvider>
          <GlobalScripts />
          <Modals />
          <FloatingWhatsApp />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
