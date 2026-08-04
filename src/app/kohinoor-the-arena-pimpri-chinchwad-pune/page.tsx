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
  const pageUrl = `${cfg.canonical}/kohinoor-the-arena-pimpri-chinchwad-pune`;

  return {
    title: `Kohinoor The Arena by Kohinoor Group | ${cfg.projectConfig.bhkOptions} Luxury Flats in Pimpri Chinchwad, Pune`,
    description: `Kohinoor The Arena by Kohinoor Group & Mahalaxmi Group — PCMC's premier sports township. Premium ${cfg.projectConfig.bhkOptions} luxury residences across ${cfg.projectConfig.towers} towers with an ${cfg.projectConfig.sportsSqFt} Sq. Ft. sports ecosystem managed by ${cfg.projectConfig.managedBy} in Pimpri Chinchwad, Pune. Starting from ${cfg.projectConfig.startingPrice}. MahaRERA: ${cfg.mahaRera}.`,
    keywords: [
      "Kohinoor The Arena",
      "Kohinoor Group Pimpri",
      "Kohinoor Group developer Pune",
      "Kohinoor Arena PCMC",
      "Kohinoor Arena 2 BHK Pimpri Chinchwad",
      "Kohinoor Arena 3 BHK PCMC",
      "Kohinoor Arena 4 BHK Pune",
      "Kohinoor Pimpri real estate",
      "Pune real estate developer",
      "Pimpri Chinchwad luxury flats",
      "Buy flat Kohinoor The Arena",
      "Kohinoor The Arena price 2024",
      "Luxury flats Pimpri Chinchwad",
      "PCMC real estate developer"
    ],
    authors: [{ name: "Kohinoor Group" }, { name: "Mahalaxmi Group" }],
    creator: "Kohinoor Group",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Kohinoor The Arena by Kohinoor Group | Premium Real Estate PCMC, Pimpri Chinchwad",
      description: `Kohinoor Group's flagship ${cfg.projectConfig.bhkOptions} sports township in Pimpri Chinchwad, Pune. ${cfg.projectConfig.towers} towers, ${cfg.projectConfig.sportsSqFt} Sq. Ft. ecosystem.`,
      url: pageUrl,
      siteName: "Kohinoor The Arena by Kohinoor Group",
      images: [{ url: `${cfg.canonical}/assets/images/hero.jpg`, width: 1200, height: 630, alt: "Kohinoor The Arena by Kohinoor Group — Pimpri Chinchwad, PCMC, Pune" }],
    }
  };
}

export const revalidate = 3600; // Edge Route Caching (1 Hour)

export default async function KohinoorSilo() {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  const pageUrl = `${cfg.canonical}/kohinoor-the-arena-pimpri-chinchwad-pune`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ApartmentComplex",
      "name": "Kohinoor The Arena",
      "description": `Kohinoor The Arena by Kohinoor Group — ${cfg.projectConfig.bhkOptions} luxury residences across ${cfg.projectConfig.towers} towers in Pimpri Chinchwad, PCMC, Pune.`,
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
      "name": "Kohinoor Group",
      "description": `Kohinoor Group — Developer of Kohinoor The Arena, premium sports township in ${cfg.address.locality}, ${cfg.address.city}.`,
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
        { "@type": "ListItem", "position": 2, "name": "Kohinoor The Arena", "item": pageUrl },
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
          Kohinoor The Arena - Premium Real Estate & Luxury Flats in Pimpri, PCMC. Kohinoor Pimpri real estate, top property in Pune real estate market.
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
