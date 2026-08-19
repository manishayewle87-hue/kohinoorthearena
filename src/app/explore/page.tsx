import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  
  const title = `Explore Properties in Pune | ${cfg.brand}`;
  const description = "Browse our comprehensive directory of premium real estate, luxury flats, and residential properties across Pune and Pimpri Chinchwad.";

  return {
    title,
    description,
    alternates: { canonical: `${cfg.canonical}/explore` },
    openGraph: {
      title,
      description,
      url: `${cfg.canonical}/explore`,
      siteName: `${cfg.arenaName} by ${cfg.brand}`,
      type: 'website',
      locale: 'en_IN',
    },
  };
}

const MICRO_MARKETS = [
  "pimpri", "chinchwad", "akurdi", "nigdi", "pradhikaran", "ravet", "punawale", 
  "tathawade", "wakad", "moshi", "dudulgaon", "talawade", "thergaon", 
  "pimple-saudagar", "pimple-nilakh", "sangvi", "bhosari", "charholi", "dehu-road", 
  "mamurdi", "pcmc", "hinjewadi", "hinjewadi-phase-1", "hinjewadi-phase-2", 
  "hinjewadi-phase-3", "baner", "balewadi", "aundh", "pashan", "sus", "bavdhan", 
  "kiwale", "marunji", "nerhe", "kasarsai", "chakan", "talegaon", "vadgaon-maval",
  "khed-shivapur", "shirgaon", "gahunje", "bhumkar-chowk", "dange-chowk", 
  "kalewadi", "pimple-gurav", "nashik-phata", "ksb-chowk", "chikhali", "chinchwad-station",
  "pimpri-station", "finolex-chowk", "nehrunagar", "sant-tukaram-nagar", 
  "vallabhnagar", "kasarwadi", "dapodi", "bopkhel", "dighi", "alandi", "markal"
];

const CONFIGS = ["2-bhk", "3-bhk", "4-bhk"];
const INTENTS = ["2-bhk", "3-bhk", "4-bhk"];

export default async function Explore() {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);

  return (
    <>
      <Navbar />
      <main style={{ padding: '8rem 0 4rem 0', minHeight: '80vh' }}>
        <div className="container">
          <h1 className="section-title text-center" style={{ marginBottom: '1rem' }}>Explore Properties in Pune</h1>
          <p className="text-center" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            Discover luxury 2, 3 &amp; 4 BHK flats, premium residences, and sports township developments across every prime micro-market in Pimpri Chinchwad and Pune.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {MICRO_MARKETS.map((loc) => {
              const locDisplay = loc.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
              return (
                <div key={loc} className="glass-card" style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--neon-lime)', marginBottom: '1rem' }}>{locDisplay}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {INTENTS.map((intent) => {
                      const intentDisplay = intent.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                      return (
                        <li key={intent}>
                          <Link href={`/${intent}-flats-${loc}`} style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.85rem' }}>
                            {intentDisplay} Flats in {locDisplay} &rarr;
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          
          <div style={{ marginTop: '3rem', textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
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
