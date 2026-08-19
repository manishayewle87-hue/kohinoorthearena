import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  
  const title = `Pimpri Chinchwad Real Estate Price Index & Trends 2026 | ${cfg.brand}`;
  const description = "Live data dashboard tracking property appreciation, rental yields, and IT corridor growth metrics in Pimpri Chinchwad (PCMC), Pune.";

  return {
    title,
    description,
    alternates: { canonical: `${cfg.canonical}/market-trends` },
    openGraph: {
      title,
      description,
      url: `${cfg.canonical}/market-trends`,
      siteName: `${cfg.arenaName} by ${cfg.brand}`,
      images: [{ url: cfg.ogImage, width: 1200, height: 630, alt: title }],
      type: 'website',
      locale: 'en_IN',
    },
  };
}

export default async function MarketTrends() {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      "name": "Pimpri Chinchwad Real Estate Price Index",
      "description": "Comprehensive tracking of property appreciation, rental yields, and IT corridor growth metrics in Pimpri Chinchwad (PCMC), Pune.",
      "url": `${cfg.canonical}/market-trends`,
      "keywords": ["Real Estate", "Pune", "PCMC", "Property Rates", "Appreciation", "Market Trends"],
      "creator": {
        "@type": "Organization",
        "name": cfg.brand,
        "url": cfg.canonical
      },
      "license": "https://creativecommons.org/licenses/by/4.0/",
      "isAccessibleForFree": true
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": cfg.canonical },
        { "@type": "ListItem", "position": 2, "name": "Market Trends & Price Index", "item": `${cfg.canonical}/market-trends` },
      ]
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main style={{ paddingTop: '100px', background: 'var(--bg-dark)', minHeight: '100vh', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3rem" }}>
            <span className="badge-neon">• DATA DASHBOARD •</span>
            <h1 className="section-title">PCMC REAL ESTATE <span className="highlight-neon">PRICE INDEX</span></h1>
            <p className="section-subtitle">Live tracking of property appreciation and infrastructure impact in Pimpri Chinchwad.</p>
          </div>

          {/* Simple CSS Data Visualization */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            
            {/* Stat Box 1 */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '2rem' }}>
              <h3 style={{ color: 'var(--neon-lime)', marginBottom: '0.5rem', fontSize: '2.5rem' }}>14.2%</h3>
              <p style={{ color: '#fff', fontWeight: 600, marginBottom: '1rem' }}>YOY Capital Appreciation</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Properties within 2km of PCMC Metro stations have seen a 14.2% price surge in the last 12 months, outperforming the Pune average.</p>
            </div>

            {/* Stat Box 2 */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '2rem' }}>
              <h3 style={{ color: 'var(--neon-purple)', marginBottom: '0.5rem', fontSize: '2.5rem' }}>4.8%</h3>
              <p style={{ color: '#fff', fontWeight: 600, marginBottom: '1rem' }}>Average Rental Yield</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Due to the influx of IT professionals from Hinjewadi and Talawade, premium gated communities in Pimpri are securing high rental yields.</p>
            </div>

            {/* Stat Box 3 */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '2rem' }}>
              <h3 style={{ color: '#00F0FF', marginBottom: '0.5rem', fontSize: '2.5rem' }}>₹9,500+</h3>
              <p style={{ color: '#fff', fontWeight: 600, marginBottom: '1rem' }}>Avg Price Per Sq.Ft. (Premium)</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>The luxury segment (lifestyle townships with massive amenities) has officially crossed the ₹9,500 psf threshold in central Pimpri.</p>
            </div>

          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '2rem' }}>
            <h3 style={{ color: '#fff', marginBottom: '1.5rem' }}>Infrastructure Impact Timeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>PCMC Metro Line Completion</span>
                <span style={{ color: 'var(--neon-lime)', fontWeight: 600 }}>+8% Price Surge</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Hinjewadi-Shivajinagar Metro (Upcoming)</span>
                <span style={{ color: '#00F0FF', fontWeight: 600 }}>Projected +12%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>Phoenix Mall of the Millennium Launch</span>
                <span style={{ color: 'var(--neon-purple)', fontWeight: 600 }}>+5% Retail Gravity Shift</span>
              </div>
            </div>
            <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
              Source: Internal Research & Local Registration Data. This data is provided for informational and PR purposes. Journalists and researchers may cite this data under CC BY 4.0 license by attributing {cfg.brand}.
            </div>
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
