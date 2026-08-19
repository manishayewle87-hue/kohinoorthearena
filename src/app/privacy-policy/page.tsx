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
    title: `Privacy Policy | ${cfg.projectName} by ${cfg.brand}`,
    description: `Privacy Policy and data protection guidelines for ${cfg.projectName}.`,
    robots: { index: false, follow: false },
  };
}

export default async function PrivacyPolicy() {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  const supportEmail = `info@${cfg.canonical.replace('https://www.', '')}`;

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '120px', paddingBottom: '4rem', background: '#0D0818', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.8)' }}>
          <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>Privacy Policy</h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.8' }}>
            <p>Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
            
            <h2>1. Information We Collect</h2>
            <p>When you interact with our website, we may collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about {cfg.projectName}. This includes your name, phone number, and email address.</p>
            
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect or receive to communicate with you, send you digital brochures, schedule site visits, and provide project updates regarding {cfg.projectName} via WhatsApp, Phone, SMS, and Email.</p>
            
            <h2>3. Third-Party Tracking &amp; Advertising</h2>
            <p>We use tracking technologies, including Google Analytics 4 and Meta Pixel, to measure website engagement and optimize ad delivery. These technologies collect anonymized device and browser telemetry.</p>
            
            <h2>4. WhatsApp Communication</h2>
            <p>By opting in to receive communications via WhatsApp, you consent to receive digital brochures, floor plans, and sales inquiries directly to your provided mobile number via verified messaging channels.</p>
            
            <h2>5. Contact Us</h2>
            <p>If you have questions or comments about this privacy policy, you may reach our compliance team at <a href={`mailto:${supportEmail}`} style={{ color: 'var(--neon-lime)' }}>{supportEmail}</a> or call <a href={`tel:${cfg.contactPhone}`} style={{ color: 'var(--neon-lime)' }}>{cfg.contactPhone}</a>.</p>
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
