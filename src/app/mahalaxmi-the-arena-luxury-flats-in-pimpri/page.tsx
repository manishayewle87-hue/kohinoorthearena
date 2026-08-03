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
    title: "Mahalaxmi The Arena | 80,000 Sq.Ft. Sports Township in Pimpri",
    description: "Mahalaxmi The Arena by Mahalaxmi Group. Experience premium 2, 3 & 4 BHK residences in Pune's finest active ecosystem.",
    keywords: [
      "Mahalaxmi The Arena",
      "Mahalaxmi Group Pimpri",
      "Mahalaxmi Group Pune",
      "Mahalaxmi The Arena PCMC",
      "Mahalaxmi real estate Pimpri",
      "Pune real estate market",
      "Pimpri Chinchwad real estate",
      "Mahalaxmi The Arena floor plan",
      "Buy flat in Mahalaxmi The Arena",
      "Pune real estate"
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Mahalaxmi The Arena | Premium Real Estate PCMC",
      description: "Mahalaxmi Group's flagship sports township in Pimpri.",
      url: pageUrl,
      images: [{ url: `${cfg.canonical}/assets/images/hero.jpg`, width: 1200, height: 630, alt: "Mahalaxmi The Arena Pimpri" }],
    }
  };
}

export const revalidate = 3600; // Edge Route Caching (1 Hour)

export default async function MahalaxmiSilo() {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  const pageUrl = `${cfg.canonical}/mahalaxmi-the-arena-luxury-flats-in-pimpri`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    "name": "Mahalaxmi The Arena",
    "description": "Mahalaxmi Group flagship sports township offering 2, 3 & 4 BHK luxury residences in Pimpri, Pune.",
    "url": pageUrl,
    "image": `${cfg.canonical}/assets/images/hero.jpg`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pimpri-Chinchwad",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    }
  };

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
