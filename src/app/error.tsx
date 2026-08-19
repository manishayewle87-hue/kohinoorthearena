"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[ARENA][APP_ERROR]', error);
  }, [error]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#08050e',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '550px',
        padding: '3rem 2rem',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🏛️</div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#DFFE00', fontWeight: '700' }}>
          Temporary System Refresh
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          We are updating our live property inventory. Please refresh the page or return to the main showcase.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => reset()}
            style={{
              background: '#DFFE00',
              color: '#000',
              border: 'none',
              padding: '0.8rem 1.75rem',
              borderRadius: '30px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            🔄 Refresh Page
          </button>
          <Link
            href="/"
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '0.8rem 1.75rem',
              borderRadius: '30px',
              fontWeight: '600',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}
          >
            🏠 Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
