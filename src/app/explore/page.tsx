import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExploreDirectory from "@/components/ExploreDirectory";
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  
  const title = `Explore Properties in Pune | 75+ Micro-Markets | ${cfg.brand}`;
  const description = "Browse our comprehensive interactive directory of premium real estate, luxury 2, 3 & 4 BHK flats, and sports township properties across Pune and Pimpri Chinchwad.";

  return {
    title,
    description,
    alternates: { canonical: `${cfg.canonical}/explore` },
    openGraph: {
      title,
      description,
      url: `${cfg.canonical}/explore`,
      siteName: `${cfg.arenaName} by ${cfg.brand}`,
      images: [{ url: cfg.ogImage, width: 1200, height: 630, alt: title }],
      type: 'website',
      locale: 'en_IN',
    },
  };
}

const MICRO_MARKETS = [
  // Core PCMC
  "pimpri", "chinchwad", "akurdi", "nigdi", "pradhikaran", "ravet", "punawale", 
  "tathawade", "wakad", "moshi", "dudulgaon", "talawade", "thergaon", 
  "pimple-saudagar", "pimple-nilakh", "sangvi", "bhosari", "charholi", "dehu-road", 
  "mamurdi", "pcmc", "hinjewadi", "hinjewadi-phase-1", "hinjewadi-phase-2", 
  "hinjewadi-phase-3", "baner", "balewadi", "aundh", "pashan", "sus", "bavdhan", 
  "kiwale", "marunji", "nerhe", "kasarsai", "chakan", "talegaon", "vadgaon-maval", 
  "khed-shivapur", "shirgaon", "gahunje", "bhumkar-chowk", "dange-chowk", 
  "kalewadi", "pimple-gurav", "nashik-phata", "ksb-chowk", "chikhali", "chinchwad-station", 
  "pimpri-station", "finolex-chowk", "nehrunagar", "sant-tukaram-nagar", 
  "vallabhnagar", "kasarwadi", "dapodi", "bopkhel", "dighi", "alandi", "markal",
  // Extended Pune Corridor
  "hadapsar", "kharadi", "magarpatta", "viman-nagar", "koregaon-park",
  "kalyani-nagar", "undri", "kondhwa", "wanowrie", "bibwewadi",
  "warje", "kothrud", "deccan", "erandwane", "pune-cantonment"
];

const INTENTS = ["2-bhk", "3-bhk", "4-bhk", "luxury", "sports-township"];

export default async function Explore() {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);

  return (
    <>
      <Navbar />
      <main style={{ padding: '8rem 0 4rem 0', minHeight: '80vh' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <span className="badge-purple">• PROPERTY DIRECTORY •</span>
            <h1 className="section-title" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
              EXPLORE <span className="highlight-neon">PUNE REAL ESTATE</span>
            </h1>
            <p className="section-subtitle" style={{ maxWidth: '700px', margin: '0 auto' }}>
              Discover luxury 2, 3 &amp; 4 BHK flats, premium residences, and sports township developments across every prime micro-market in Pimpri Chinchwad and Pune.
            </p>
          </div>

          <ExploreDirectory microMarkets={MICRO_MARKETS} intents={INTENTS} />

          <div style={{ marginTop: '3.5rem', textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Global &amp; NRI Investors</h4>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto' }}>
              We assist Non-Resident Indians (NRIs) from the USA, UK, UAE, and across the globe in securing premium high-yield real estate assets in Pune&apos;s fastest-growing IT corridors.
            </p>
          </div>
        </div>
      </main>
      <Footer
        mahaRera={cfg.mahaRera}
        primarySlug={cfg.primarySlug}
        coDevSlug={cfg.primarySlug === '/kohinoor-the-arena-pimpri'
          ? '/mahalaxmi-the-arena-pimpri'
          : '/kohinoor-the-arena-pimpri'}
        projectName={cfg.projectName}
      />
    </>
  );
}
