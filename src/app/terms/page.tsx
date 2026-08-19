import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);

  return {
    title: `Terms of Service | ${cfg.projectName} by ${cfg.brand}`,
    description: `Terms of Service and legal disclosures for ${cfg.projectName}.`,
    robots: { index: false, follow: false },
  };
}

export default async function TermsOfService() {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '120px', paddingBottom: '4rem', background: '#0D0818', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.8)' }}>
          <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>Terms of Service</h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.8' }}>
            <p>Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
            
            <h2>1. Agreement to Terms</h2>
            <p>By accessing this website, you agree to be bound by these Terms and Conditions of Use, all applicable laws and regulations in India, and agree that you are responsible for compliance with any applicable local laws.</p>
            
            <h2>2. Project Disclaimer &amp; MahaRERA Compliance</h2>
            <p>The materials on this website are provided for informational and reference purposes only. {cfg.projectName} is a Joint Venture development by {cfg.brand} and {cfg.coDevName}.</p>
            <p>This website and its digital collateral do not constitute an offer, sale commitment, or binding contract. All images, architectural renderings, floor plans, specifications, and timelines are indicative and subject to change per MahaRERA approvals.</p>
            
            <h2>3. Limitations of Liability</h2>
            <p>In no event shall {cfg.brand}, {cfg.coDevName}, or their project partners be liable for any damages arising out of the use or inability to use the informational materials on this website.</p>
            
            <h2>4. Governing Law</h2>
            <p>Any claim or dispute relating to this website shall be governed by the laws of Maharashtra, India, with jurisdiction in Pune courts without regard to conflict of law provisions.</p>
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
