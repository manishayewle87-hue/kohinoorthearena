import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy | Mahalaxmi The Arena',
  description: 'Privacy Policy and data collection guidelines for Mahalaxmi The Arena.',
  robots: 'noindex, nofollow' // Standard practice for policy pages to save crawl budget
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '120px', paddingBottom: '4rem', background: '#0D0818', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.8)' }}>
          <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>Privacy Policy</h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.8' }}>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2>1. Information We Collect</h2>
            <p>When you interact with our website, we may collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services. This includes your name, phone number, and email address.</p>
            
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect or receive to communicate with you, send you marketing and promotional communications (including via WhatsApp, SMS, and Email), and to respond to your inquiries regarding Mahalaxmi The Arena.</p>
            
            <h2>3. Third-Party Tracking & Advertising</h2>
            <p>We use third-party tracking technologies, including Google Analytics and Meta (Facebook) Pixel, to track user interactions on our website and serve targeted advertisements. These technologies may collect information about your browser, device, and IP address.</p>
            
            <h2>4. WhatsApp Communication</h2>
            <p>By opting in to receive communications via WhatsApp, you consent to receive digital brochures, project updates, and sales inquiries directly to your provided mobile number via the Meta WhatsApp Cloud API.</p>
            
            <h2>5. Contact Us</h2>
            <p>If you have questions or comments about this notice, you may email us at propsmartrealty@gmail.com.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
