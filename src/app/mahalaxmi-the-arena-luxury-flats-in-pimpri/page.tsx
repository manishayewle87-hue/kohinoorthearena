import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Ecosystem from "@/components/Ecosystem";
import Masterplan from "@/components/Masterplan";
import Gallery from "@/components/Gallery";
import Residences from "@/components/Residences";
import Rhythms from "@/components/Rhythms";
import Connectivity from "@/components/Connectivity";
import Specifications from "@/components/Specifications";
import Calculator from "@/components/Calculator";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";

import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  const pageUrl = `${cfg.canonical}/mahalaxmi-the-arena-luxury-flats-in-pimpri`;

  return {
    title: `Mahalaxmi The Arena by Mahalaxmi Group | ${cfg.projectConfig.bhkOptions} Luxury Flats in Pimpri, Pune`,
    description: `Mahalaxmi The Arena by Mahalaxmi Group & Kohinoor Group — Pimpri's ultra-modern sports township. Premium ${cfg.projectConfig.bhkOptions} luxury residences across ${cfg.projectConfig.towers} towers with an ${cfg.projectConfig.sportsSqFt} Sq. Ft. active sports ecosystem managed by ${cfg.projectConfig.managedBy} in Pimpri, Pune. Starting from ${cfg.projectConfig.startingPrice}. MahaRERA: ${cfg.mahaRera}.`,
    keywords: [
      "Mahalaxmi The Arena",
      "Mahalaxmi Group Pimpri",
      "Mahalaxmi Group developer Pune",
      "Mahalaxmi Arena PCMC",
      "Mahalaxmi Arena 2 BHK Pimpri",
      "Mahalaxmi Arena 3 BHK Pune",
      "Mahalaxmi Arena 4 BHK PCMC",
      "Mahalaxmi real estate Pimpri",
      "Pune real estate developer",
      "Mahalaxmi The Arena floor plan",
      "Buy flat Mahalaxmi The Arena",
      "Luxury flats Pimpri Pune",
      "Pimpri Chinchwad real estate developer"
    ],
    authors: [{ name: "Mahalaxmi Group" }, { name: "Kohinoor Group" }],
    creator: "Mahalaxmi Group",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Mahalaxmi The Arena by Mahalaxmi Group | Premium Real Estate Pimpri, Pune",
      description: `Mahalaxmi Group's flagship ${cfg.projectConfig.bhkOptions} sports township in Pimpri, Pune. ${cfg.projectConfig.towers} towers, ${cfg.projectConfig.sportsSqFt} Sq. Ft. active ecosystem.`,
      url: pageUrl,
      siteName: "Mahalaxmi The Arena by Mahalaxmi Group",
      images: [{ url: `${cfg.canonical}/assets/images/hero.jpg`, width: 1200, height: 630, alt: "Mahalaxmi The Arena by Mahalaxmi Group — Pimpri, Pune" }],
    }
  };
}

export const revalidate = 3600; // Edge Route Caching (1 Hour)

export default async function MahalaxmiSilo() {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  const pageUrl = `${cfg.canonical}/mahalaxmi-the-arena-luxury-flats-in-pimpri`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ApartmentComplex",
      "name": "Mahalaxmi The Arena",
      "description": `Mahalaxmi The Arena by Mahalaxmi Group — ${cfg.projectConfig.bhkOptions} luxury residences across ${cfg.projectConfig.towers} towers in Pimpri, Pune.`,
      "url": pageUrl,
      "image": `${cfg.canonical}/assets/images/hero.jpg`,
      "numberOfRooms": cfg.projectConfig.bhkOptions,
      "priceRange": `${cfg.projectConfig.startingPrice} - ${cfg.projectConfig.topPrice}`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": cfg.address.street,
        "addressLocality": cfg.address.locality,
        "addressRegion": cfg.address.region,
        "postalCode": cfg.address.postalCode,
        "addressCountry": cfg.address.country
      },
      "geo": { "@type": "GeoCoordinates", "latitude": "18.6278", "longitude": "73.7997" }
    },
    {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Mahalaxmi Group",
      "description": `Mahalaxmi Group — Developer of Mahalaxmi The Arena, premium sports township in ${cfg.address.locality}, ${cfg.address.city}.`,
      "url": pageUrl,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": cfg.address.street,
        "addressLocality": cfg.address.locality,
        "addressRegion": cfg.address.region,
        "postalCode": cfg.address.postalCode,
        "addressCountry": cfg.address.country
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": cfg.canonical },
        { "@type": "ListItem", "position": 2, "name": "Mahalaxmi The Arena", "item": pageUrl },
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <h1 style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}>
          Mahalaxmi The Arena - Luxury Flats & Sports Township by Mahalaxmi Group in Pimpri, Pune. Mahalaxmi real estate Pimpri, top property in Pune real estate market.
        </h1>
        <Hero />
        <Philosophy />
        <Ecosystem />
        <Masterplan />
        <Gallery />
        <Residences />
        <Rhythms />
        <Connectivity />
        <Specifications />
        <Calculator />
        <Booking />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
