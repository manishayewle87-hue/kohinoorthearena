import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service | Mahalaxmi The Arena',
  description: 'Terms of Service for Mahalaxmi The Arena.',
  robots: 'noindex, nofollow'
};

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '120px', paddingBottom: '4rem', background: '#0D0818', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.8)' }}>
          <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>Terms of Service</h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.8' }}>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2>1. Agreement to Terms</h2>
            <p>By accessing this website, you agree to be bound by these Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
            
            <h2>2. Disclaimer</h2>
            <p>The materials on this website are provided on an &apos;as is&apos; basis. Mahalaxmi Group and Kohinoor Group make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            <p>This website and its content are a draft prepared solely for internal circulation and reference, and do not constitute a sales offer, commitment, or contract of any kind. All images, plans, and specifications are indicative and subject to change without notice.</p>
            
            <h2>3. Limitations</h2>
            <p>In no event shall Mahalaxmi Group, Kohinoor Group, or its suppliers be liable for any damages arising out of the use or inability to use the materials on this website.</p>
            
            <h2>4. Revisions and Errata</h2>
            <p>The materials appearing on this website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete or current.</p>
            
            <h2>5. Governing Law</h2>
            <p>Any claim relating to this website shall be governed by the laws of Pune, Maharashtra without regard to its conflict of law provisions.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
