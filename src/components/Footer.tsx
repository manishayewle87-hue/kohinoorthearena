"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#hero" className="brand-cluster footer-brand-cluster">
            <div className="jv-partners">
              <Image src="/assets/images/mahalaxmi-logo.svg" alt="Mahalaxmi Group Developer Pimpri" width={150} height={40} className="partner-img"/>
              <div className="jv-divider"></div>
              <Image src="/assets/images/kohinoor-logo.svg" alt="Kohinoor Group Real Estate Developer PCMC" width={150} height={40} className="partner-img"/>
            </div>
            <div className="logo-wrapper">
              <div className="logo-icon"><i className="ri-run-line"></i></div>
              <div className="logo-text">
                <div className="logo-title">THE <span>ARENA</span></div>
                <div className="logo-subtitle">PIMPRI&apos;S SPORTS TOWNSHIP</div>
              </div>
            </div>
          </a>
          <p>
            A Joint Venture development by Mahalaxmi Group, Kohinoor Group (A Glorious Real Estate Enterprise), and Agarwal Sukhwani Associates. Operated by ILESEUM Sports Management across an 80,000 Sq. Ft. active ecosystem.
          </p>
        </div>

        <div className="footer-col">
          <h5>The 5 Pillars</h5>
          <div className="footer-links">
            <a href="#operating-system">1. Space (80,000 Sq.Ft.)</a>
            <a href="#operating-system">2. Management (Ileseum)</a>
            <a href="#operating-system">3. Programs (Coaching)</a>
            <a href="#operating-system">4. Partnerships (Global)</a>
            <a href="#operating-system">5. Progression (Tracking)</a>
          </div>
        </div>

        <div className="footer-col">
          <h5>Residences</h5>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/kohinoor-the-arena-pimpri-chinchwad-pune">Kohinoor The Arena</Link></li>
            <li><Link href="/mahalaxmi-the-arena-luxury-flats-in-pimpri">Mahalaxmi The Arena</Link></li>
            <li><Link href="/life-in-motion-pimpri-sports-township-pcmc">Life in Motion</Link></li>
            <li><Link href="#residences">Residences</Link></li>
            <li><a href="#specifications">Salient Specifications</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Pimpri Connectivity</h5>
          <div className="footer-links">
            <a href="#connectivity">Kohinoor World Towers (2 km)</a>
            <a href="#connectivity">PCMC Metro Station (2.4 km)</a>
            <a href="#connectivity">Podar Int. School (3.8 km)</a>
            <a href="#connectivity">Aditya Birla Hospital (4.1 km)</a>
            <a href="#connectivity">Hinjewadi IT Park (9.9 km)</a>
          </div>
        </div>
      </div>

      <div className="footer-seo-block" style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
        <h6 style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1rem", letterSpacing: "1px", textTransform: "uppercase", fontSize: "0.8rem" }}>Explore Premium Properties Across PCMC & Pune</h6>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", lineHeight: "1.6" }}>
          {/* Brands & Projects Silos */}
          <a href="/mahalaxmi-the-arena-luxury-flats-in-pimpri" className="seo-link">Mahalaxmi The Arena Pimpri</a> &bull;
          <a href="/kohinoor-the-arena-pimpri-chinchwad-pune" className="seo-link">Kohinoor The Arena</a> &bull;
          <a href="/life-in-motion-pimpri-sports-township-pcmc" className="seo-link">Life in Motion Pimpri</a> &bull;
          <span className="seo-link">Life in Motion Pune</span> &bull;
          <span className="seo-link">Kohinoor Arena Pimpri</span> &bull;
          <span className="seo-link">The Arena PCMC</span> &bull;
          {/* Pimpri & PCMC Core */}
          <span className="seo-link">Flats in Pimpri</span> &bull;
          <span className="seo-link">Luxury apartments in Pimpri</span> &bull;
          <span className="seo-link">Residential projects in Pimpri</span> &bull;
          <span className="seo-link">Buy flat in Pimpri</span> &bull;
          <span className="seo-link">2 BHK flats in Pimpri</span> &bull;
          <span className="seo-link">3 BHK luxury apartments Pimpri</span> &bull;
          <span className="seo-link">4 BHK flats in Pimpri</span> &bull;
          <span className="seo-link">PCMC real estate</span> &bull;
          <span className="seo-link">Premium apartments PCMC</span> &bull;
          <span className="seo-link">Best residential projects PCMC</span> &bull;
          {/* Chinchwad, Akurdi, Nigdi */}
          <span className="seo-link">Flats in Chinchwad</span> &bull;
          <span className="seo-link">Luxury apartments Chinchwad</span> &bull;
          <span className="seo-link">Ready possession Chinchwad</span> &bull;
          <span className="seo-link">Flats in Akurdi</span> &bull;
          <span className="seo-link">Premium homes Akurdi</span> &bull;
          <span className="seo-link">Flats in Nigdi</span> &bull;
          <span className="seo-link">2 BHK Nigdi</span> &bull;
          {/* Wakad, Hinjewadi, Tathawade */}
          <span className="seo-link">Flats in Wakad</span> &bull;
          <span className="seo-link">Buy apartment Wakad</span> &bull;
          <span className="seo-link">Flats near Hinjewadi IT Park</span> &bull;
          <span className="seo-link">Luxury apartments near Hinjewadi</span> &bull;
          <span className="seo-link">Investment near Hinjewadi</span> &bull;
          <span className="seo-link">Flats in Tathawade</span> &bull;
          <span className="seo-link">2 BHK Tathawade</span> &bull;
          {/* Ravet, Punawale */}
          <span className="seo-link">Flats in Ravet</span> &bull;
          <span className="seo-link">Premium homes Ravet</span> &bull;
          <span className="seo-link">3 BHK Ravet</span> &bull;
          <span className="seo-link">Flats in Punawale</span> &bull;
          <span className="seo-link">New launch Punawale</span> &bull;
          {/* Moshi, Bhosari */}
          <span className="seo-link">Flats in Moshi</span> &bull;
          <span className="seo-link">Luxury apartments Moshi</span> &bull;
          <span className="seo-link">Ready possession Moshi</span> &bull;
          <span className="seo-link">Flats in Bhosari</span> &bull;
          <span className="seo-link">Investment property Bhosari</span> &bull;
          {/* Baner, Balewadi */}
          <span className="seo-link">Luxury apartments Baner</span> &bull;
          <span className="seo-link">Flats in Baner</span> &bull;
          <span className="seo-link">Ready possession Baner</span> &bull;
          <span className="seo-link">Flats in Balewadi</span> &bull;
          <span className="seo-link">New launch Balewadi</span> &bull;
          {/* Landmarks */}
          <span className="seo-link">Flats near Pimpri Metro Station</span> &bull;
          <span className="seo-link">Flats near PCMC Metro</span> &bull;
          <span className="seo-link">Apartments near MIDC Pimpri</span> &bull;
          <span className="seo-link">Homes near Bhosari MIDC</span> &bull;
          <span className="seo-link">Flats near Chakan MIDC</span> &bull;
          <span className="seo-link">Flats near Aditya Birla Hospital</span> &bull;
          <span className="seo-link">Flats near DY Patil College</span>
        </div>
      </div>

      {/*  RERA & Legal Compliance */}
      <div className="footer-legal" style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image src="/assets/images/maharera-logo.png" alt="MahaRERA Logo" width={40} height={40} style={{ filter: 'grayscale(1) brightness(1.5)' }} />
            <span style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--neon-lime)' }}>MahaRERA No: P5210005XXXX</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
            The project has been registered via MahaRERA registration number and is available on the website <a href="https://maharera.mahaonline.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>maharera.mahaonline.gov.in</a> under registered projects.
          </p>
        </div>
      </div>

      {/*  Disclaimer from Brochure  */}
      <div className="footer-disclaimer">
        <strong>Disclaimer:</strong> This website and brochure content is a draft prepared solely for internal circulation and reference, and does not constitute a sales offer, commitment, or contract of any kind. All information, images, plans, and specifications shown are indicative and subject to change without notice. Any decisions or actions taken based on the contents of this website are at the sole discretion and risk of the reader, and The Arena Pimpri, Mahalaxmi Group, Kohinoor Group, and Agarwal Sukhwani Associates accept no liability for any errors, omissions, or reliance placed on this material. For accurate and binding details, please refer to the official sale agreement and RERA approved project documents.
      </div>

      <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>&copy; 2026 Mahalaxmi The ARENA. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="/privacy-policy" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</a>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <a href="/terms" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem' }}>Terms of Service</a>
        </div>
        <div>Designed with <span style={{ color: "var(--neon-lime)" }}>Life in Motion</span> • Pimpri, Pune</div>
      </div>
    </div>
  </footer>
  );
}
