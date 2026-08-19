import React from 'react';
import Link from 'next/link';
import { generatePSEOMatrix } from '@/lib/pseo-data';

export default function PopularSearches() {
  const matrix = generatePSEOMatrix();
  
  // Curate top high-intent keyword hubs from the master matrix
  const topHubs = matrix.filter(p => 
    p.category === "Master Real Estate Hub" || 
    p.slug.includes("pcmc-metro") || 
    p.slug.includes("kohinoor-world-towers") ||
    p.slug.includes("pimpri-madhe") ||
    p.slug.includes("under-1-crore")
  ).slice(0, 45);

  return (
    <section style={{ padding: '4rem 0', background: '#090514', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <h4 style={{ color: 'var(--neon-lime)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>
          Trending Searches • Mahalaxmi Kohinoor PCMC Real Estate
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.5rem' }}>
          {topHubs.map((page, i) => (
            <Link 
              key={i} 
              href={`/${page.slug}`} 
              className="popular-search-link"
              style={{ fontSize: '0.8rem', color: '#a0a0a0', textDecoration: 'none', transition: 'color 0.2s' }}
            >
              {page.h1}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
