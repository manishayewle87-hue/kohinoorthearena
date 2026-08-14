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

export default async function ExploreSitemap() {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  
  const baseSlug = cfg.primarySlug === '/' ? 'kohinoor-the-arena-pimpri' : cfg.primarySlug.replace('/', '');

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '100px', background: 'var(--bg-dark)', minHeight: '100vh', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3rem" }}>
            <span className="badge-neon">• PROPERTY DIRECTORY •</span>
            <h1 className="section-title">EXPLORE <span className="highlight-neon">PUNE REAL ESTATE</span></h1>
            <p className="section-subtitle">Browse luxury properties across 60+ micro-markets in Pune & PCMC.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {CONFIGS.map(config => (
              <div key={config} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '2rem' }}>
                <h3 style={{ color: 'var(--neon-lime)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                  {config.replace('-', ' ')} Flats in Pune
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {MICRO_MARKETS.map(market => {
                    const marketDisplay = market.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                    const intentSlug = `${config}-flats-in-${market}`;
                    return (
                      <li key={market}>
                        <Link 
                          href={`/${baseSlug}/${intentSlug}`}
                          style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                          className="hover-neon-text"
                        >
                          {config.replace('-', ' ').toUpperCase()} in {marketDisplay}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '3rem', textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Global & NRI Investors</h4>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto' }}>
              We assist Non-Resident Indians (NRIs) from the USA, UK, UAE, and across the globe in securing premium high-yield real estate assets in Pune&apos;s fastest-growing IT corridors.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
