import React from 'react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export default async function NotFound() {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  
  const baseSlug = cfg.primarySlug === '/' ? '/' : cfg.primarySlug;

  return (
    <>
      <Navbar />
      <main style={{ 
        paddingTop: '120px', 
        paddingBottom: '80px', 
        background: 'var(--bg-dark)', 
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div className="container">
          <span className="badge-neon" style={{ marginBottom: '1rem', display: 'inline-block' }}>• ERROR 404 •</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', marginBottom: '1rem' }}>
            PAGE NOT <span className="highlight-neon">FOUND</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            The exclusive residence or page you are looking for does not exist or has been moved. 
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={baseSlug} className="btn btn-neon">
              <i className="ri-home-4-line"></i> Return Home
            </Link>
            <Link href="/explore" className="btn btn-glass">
              <i className="ri-compass-3-line"></i> Explore Properties
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
