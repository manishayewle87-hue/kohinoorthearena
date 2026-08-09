import React from 'react';
import Link from 'next/link';
import { generatePSEOMatrix } from '@/lib/pseo-data';

export default function PopularSearches() {
  const matrix = generatePSEOMatrix();
  
  // Select a mix of highly targeted links to flow PageRank effectively
  // We'll take the first 40 to keep the footer clean but effective
  const topPages = matrix.slice(0, 40);

  return (
    <section style={{ padding: '4rem 0', background: '#090514', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <h4 style={{ color: 'var(--neon-lime)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>
          Explore PCMC Premium Real Estate
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.5rem' }}>
          {topPages.map((page, i) => (
            <Link 
              key={i} 
              href={`/${page.slug}`} 
              style={{ fontSize: '0.8rem', color: '#a0a0a0', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
              onMouseOut={(e) => e.currentTarget.style.color = '#a0a0a0'}
            >
              {page.h1}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
