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
      template: `%s | ${cfg.arenaName} by ${cfg.brand} | ${cfg.tagline}`
    },
    description: cfg.description,
    keywords: cfg.keywords,
    applicationName: cfg.projectName,
    category: 'Real Estate',
    authors: [{ name: cfg.brand }, { name: cfg.coDevName }],
    creator: cfg.brand,
    publisher: cfg.projectName,
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
      title: cfg.title,
      description: cfg.description,
      url: cfg.canonical,
      siteName: `${cfg.projectName} by ${cfg.brand}`,
      images: [{ url: cfg.ogImage, width: 1200, height: 630, alt: `${cfg.projectName} by ${cfg.brand} — ${cfg.address.locality}, ${cfg.address.city}` }],
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
      name: `${cfg.projectName} by ${cfg.brand}`,
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
      description: `${cfg.projectName} by ${cfg.brand} — Premium ${cfg.projectConfig.bhkOptions} real estate in ${cfg.address.locality}, ${cfg.address.city}.`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ApartmentComplex',
      name: cfg.arenaName,
      alternateName: [
        `${cfg.brand} ${cfg.arenaName}`,
        `${cfg.arenaName} ${cfg.address.locality}`,
        `${cfg.arenaName} ${cfg.address.city}`,
        'Life in Motion Sports Township',
      ],
      image: cfg.ogImage,
      description: cfg.description,
      numberOfRooms: cfg.projectConfig.bhkOptions,
      address: {
        '@type': 'PostalAddress',
        streetAddress: cfg.address.street,
        addressLocality: cfg.address.locality,
        addressRegion: cfg.address.region,
        postalCode: cfg.address.postalCode,
        addressCountry: cfg.address.country,
      },
      geo: { '@type': 'GeoCoordinates', latitude: '18.6278', longitude: '73.7997' },
      containsPlace: [
        { '@type': 'City', name: 'Pimpri Chinchwad', sameAs: 'https://en.wikipedia.org/wiki/Pimpri-Chinchwad' },
        { '@type': 'City', name: 'Pune', sameAs: 'https://en.wikipedia.org/wiki/Pune' },
        { '@type': 'City', name: 'Wakad' },
        { '@type': 'City', name: 'Hinjewadi' },
        { '@type': 'City', name: 'Ravet' }
      ],
      url: siteUrl,
      telephone: cfg.contactPhone,
      priceRange: `${cfg.projectConfig.startingPrice} - ${cfg.projectConfig.topPrice}`,
      openingHours: 'Mo-Su 10:00-19:00',
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Sports Ecosystem', value: `${cfg.projectConfig.sportsSqFt} Sq. Ft.` },
        { '@type': 'LocationFeatureSpecification', name: 'Sports Management', value: cfg.projectConfig.managedBy },
        { '@type': 'LocationFeatureSpecification', name: 'Towers', value: String(cfg.projectConfig.towers) },
        { '@type': 'LocationFeatureSpecification', name: 'MahaRERA', value: cfg.mahaRera },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: cfg.brand,
      url: siteUrl,
      image: cfg.ogImage,
      description: `${cfg.brand} — Developer of ${cfg.arenaName}, premium ${cfg.projectConfig.bhkOptions} sports township in ${cfg.address.locality}, ${cfg.address.city}.`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: cfg.address.street,
        addressLocality: cfg.address.locality,
        addressRegion: cfg.address.region,
        postalCode: cfg.address.postalCode,
        addressCountry: cfg.address.country,
      },
      geo: { '@type': 'GeoCoordinates', latitude: '18.6278', longitude: '73.7997' },
      telephone: cfg.contactPhone,
      priceRange: `${cfg.projectConfig.startingPrice} - ${cfg.projectConfig.topPrice}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `Who is the developer of ${cfg.arenaName}?`,
          acceptedAnswer: { '@type': 'Answer', text: `${cfg.arenaName} is developed by ${cfg.brand} in joint venture with ${cfg.coDevName}.` },
        },
        {
          '@type': 'Question',
          name: `What is the price of a 3 BHK in ${cfg.projectName}?`,
          acceptedAnswer: { '@type': 'Answer', text: `The price of a 3 BHK Smart Residence at ${cfg.arenaName} starts from ₹1.28 Cr onwards. Starting price is ${cfg.projectConfig.startingPrice}.` },
        },
        {
          '@type': 'Question',
          name: `Where is ${cfg.arenaName} located?`,
          acceptedAnswer: { '@type': 'Answer', text: `${cfg.arenaName} by ${cfg.brand} is located at ${cfg.address.street}, ${cfg.address.locality}, ${cfg.address.city}, ${cfg.address.region}. ${cfg.address.landmark}.` },
        },
        {
          '@type': 'Question',
          name: `What configurations are available at ${cfg.arenaName}?`,
          acceptedAnswer: { '@type': 'Answer', text: `${cfg.arenaName} offers ${cfg.projectConfig.bhkOptions} luxury residences across ${cfg.projectConfig.towers} towers. Prices range from ${cfg.projectConfig.startingPrice} to ${cfg.projectConfig.topPrice}.` },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: cfg.arenaName, item: `${siteUrl}${cfg.primarySlug}` },
        { '@type': 'ListItem', position: 3, name: `${cfg.projectConfig.bhkOptions} Flats in ${cfg.address.locality}`, item: `${siteUrl}/flats-in-pune` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'RealEstateAgent'],
      '@id': `${siteUrl}/#business`,
      name: `${cfg.arenaName} by ${cfg.brand}`,
      description: cfg.description,
      url: siteUrl,
      telephone: cfg.contactPhone,
      email: 'info@kohinoorthearena.in',
      priceRange: `${cfg.projectConfig.startingPrice} - ${cfg.projectConfig.topPrice}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: cfg.address.street,
        addressLocality: cfg.address.locality,
        addressRegion: cfg.address.region,
        postalCode: cfg.address.postalCode,
        addressCountry: cfg.address.country,
      },
      geo: { '@type': 'GeoCoordinates', latitude: '18.6278', longitude: '73.7997' },
      hasMap: 'https://maps.google.com/?q=18.6278,73.7997',
      image: cfg.ogImage,
      logo: cfg.schemaOrg.logoUrl,
      sameAs: cfg.sameAs,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: cfg.aggregateRating.ratingValue,
        reviewCount: cfg.aggregateRating.reviewCount,
        bestRating: cfg.aggregateRating.bestRating,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
          opens: '10:00',
          closes: '19:00',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: `VIP Site Visit — ${cfg.arenaName}`,
      description: `Book a VIP site visit to ${cfg.arenaName} by ${cfg.brand} in ${cfg.address.locality}, ${cfg.address.city}.`,
      startDate: new Date().toISOString().split('T')[0],
      endDate: cfg.projectConfig.possessionYear + '-12-31',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: cfg.arenaName,
        address: {
          '@type': 'PostalAddress',
          streetAddress: cfg.address.street,
          addressLocality: cfg.address.locality,
          addressRegion: cfg.address.region,
          postalCode: cfg.address.postalCode,
          addressCountry: cfg.address.country,
        },
        geo: { '@type': 'GeoCoordinates', latitude: '18.6278', longitude: '73.7997' },
      },
      organizer: {
        '@type': 'Organization',
        name: cfg.brand,
        url: siteUrl,
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: siteUrl,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${siteUrl}/#webpage`,
      url: siteUrl,
      name: cfg.title,
      description: cfg.description,
      dateModified: new Date().toISOString(),
      inLanguage: 'en-IN',
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: {
        '@type': 'ApartmentComplex',
        name: cfg.arenaName,
        '@id': `${siteUrl}/#apartment`,
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.hero-title', '.hero-subtitle', '.section-title'],
      },
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
        
        {/* ── Global NRI Targeting (USA, UK, UAE) ── */}
        <link rel="alternate" hrefLang="en-US" href={siteUrl} />
        <link rel="alternate" hrefLang="en-GB" href={siteUrl} />
        <link rel="alternate" hrefLang="en-AE" href={siteUrl} />
        
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <link rel="canonical" href={siteUrl} />

        {/* Core Web Vitals (LCP) Hardening — preload domain-specific hero */}
        <link rel="preload" href={`${siteUrl}/assets/images/hero.jpg`} as="image" fetchPriority="high" />
        
        {/* Organization Schema sameAs links */}
        {cfg.sameAs && cfg.sameAs.map((link, index) => (
          <link key={index} rel="alternate" href={link} />
        ))}

        {/* Performance Hardening: Preconnect to Analytics Domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        
        {/* Google Analytics 4 */}
        <Script 
          src={`https://www.googletagmanager.com/gtag/js?id=${cfg.ga4Id}`} 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${cfg.ga4Id}');
          `}
        </Script>

        {/* Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `}
          </Script>
        )}

        {/* Meta Pixel */}
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
            fbq('init', '${cfg.metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Google reCAPTCHA v3 */}
        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <Script 
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="afterInteractive"
          />
        )}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe 
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0" 
              width="0" 
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        
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
