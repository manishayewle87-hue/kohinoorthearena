"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';

type ExploreDirectoryProps = {
  microMarkets: string[];
  intents: string[];
};

export default function ExploreDirectory({ microMarkets, intents }: ExploreDirectoryProps) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | '2-bhk' | '3-bhk' | 'metro' | 'pcmc'>('all');

  const filteredMarkets = useMemo(() => {
    return microMarkets.filter((loc) => {
      const locDisplay = loc.replace(/-/g, ' ').toLowerCase();
      const matchesSearch = !search || locDisplay.includes(search.toLowerCase().trim());
      
      if (!matchesSearch) return false;

      if (activeFilter === 'metro') {
        return ['pimpri', 'chinchwad', 'pcmc', 'wakad', 'hinjewadi', 'nashik-phata', 'sant-tukaram-nagar', 'vallabhnagar', 'kasarwadi', 'dapodi', 'bhumkar-chowk'].includes(loc);
      }
      if (activeFilter === 'pcmc') {
        return !['hadapsar', 'kharadi', 'magarpatta', 'viman-nagar', 'koregaon-park', 'kalyani-nagar', 'undri', 'kondhwa', 'wanowrie', 'bibwewadi', 'warje', 'kothrud', 'deccan', 'erandwane', 'pune-cantonment'].includes(loc);
      }
      return true;
    });
  }, [microMarkets, search, activeFilter]);

  const activeIntents = useMemo(() => {
    if (activeFilter === '2-bhk') return ['2-bhk'];
    if (activeFilter === '3-bhk') return ['3-bhk'];
    return intents;
  }, [intents, activeFilter]);

  return (
    <div>
      {/* ── Search & Filter Controls ── */}
      <div style={{ maxWidth: '650px', margin: '0 auto 2.5rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type="text"
            placeholder="Search by location (e.g. Wakad, PCMC Metro, Hinjewadi)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 1.25rem 1rem 3rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
          />
          <i
            className="ri-search-line"
            style={{
              position: 'absolute',
              left: '1.25rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--neon-lime)',
              fontSize: '1.2rem',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                fontSize: '1.1rem',
              }}
              aria-label="Clear search"
            >
              <i className="ri-close-circle-line" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { id: 'all', label: 'All Micro-Markets' },
            { id: '2-bhk', label: '2 BHK Flats' },
            { id: '3-bhk', label: '3 BHK Flats' },
            { id: 'metro', label: 'Metro Corridor' },
            { id: 'pcmc', label: 'PCMC Core' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setActiveFilter(pill.id as typeof activeFilter)}
              style={{
                padding: '0.4rem 0.9rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontWeight: activeFilter === pill.id ? '600' : '400',
                background: activeFilter === pill.id ? 'var(--neon-lime)' : 'rgba(255,255,255,0.05)',
                color: activeFilter === pill.id ? '#000' : 'rgba(255,255,255,0.7)',
                border: '1px solid',
                borderColor: activeFilter === pill.id ? 'var(--neon-lime)' : 'rgba(255,255,255,0.1)',
                transition: 'all 0.2s',
              }}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results Count ── */}
      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1.5rem' }}>
        Showing {filteredMarkets.length} micro-markets across PCMC &amp; Pune
      </div>

      {/* ── Micro-Market Directory Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {filteredMarkets.map((loc) => {
          const locDisplay = loc.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          return (
            <div key={loc} className="glass-card" style={{ padding: '1.5rem', transition: 'transform 0.2s ease, border-color 0.2s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <i className="ri-map-pin-2-fill" style={{ color: 'var(--neon-lime)', fontSize: '1rem' }}></i>
                <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>{locDisplay}</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {activeIntents.map((intent) => {
                  const intentDisplay = intent.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                  return (
                    <li key={intent}>
                      <Link
                        href={`/${intent}-flats-${loc}`}
                        style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        className="hover-neon-text"
                      >
                        <span>{intentDisplay} Flats in {locDisplay}</span>
                        <span style={{ color: 'var(--neon-lime)', fontSize: '0.75rem' }}>&rarr;</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
