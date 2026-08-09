import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PromoVideo from "@/components/PromoVideo";
import Philosophy from "@/components/Philosophy";
import FloorPlans from "@/components/FloorPlans";
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
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  return {
    title: cfg.title,
    description: cfg.description,
    alternates: { canonical: cfg.canonical },
    openGraph: {
      title: cfg.title,
      description: cfg.description,
      url: cfg.canonical,
      siteName: `${cfg.arenaName} by ${cfg.brand}`,
      images: [{ url: cfg.ogImage, width: 1200, height: 630, alt: `${cfg.arenaName} by ${cfg.brand} — ${cfg.address.locality}, ${cfg.address.city}` }],
      type: 'website',
      locale: 'en_IN',
    },
  };
}

export const revalidate = 3600; // Edge Route Caching (1 Hour)

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <h1 style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}>
          Mahalaxmi The Arena - Kohinoor The Arena - Life in Motion Pimpri | Premium Real Estate PCMC, Pune. Buy flats in Pimpri Chinchwad. Kohinoor Pimpri real estate, Mahalaxmi real estate Pimpri, entire Pune real estate market dominance.
        </h1>
        <Hero />
        <PromoVideo />
        <Philosophy />
        <FloorPlans />
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
