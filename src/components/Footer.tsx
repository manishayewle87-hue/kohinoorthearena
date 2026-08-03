"use client";
import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#hero" className="brand-cluster footer-brand-cluster">
            <div className="jv-partners">
              <img src="assets/images/mahalaxmi-logo.svg" alt="Mahalaxmi Group" className="partner-img"/>
              <div className="jv-divider"></div>
              <img src="assets/images/kohinoor-logo.svg" alt="Kohinoor Group" className="partner-img"/>
            </div>
            <div className="logo-wrapper">
              <div className="logo-icon"><i className="ri-run-line"></i></div>
              <div className="logo-text">
                <div className="logo-title">THE <span>ARENA</span></div>
                <div className="logo-subtitle">PIMPRI'S SPORTS TOWNSHIP</div>
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
          <div className="footer-links">
            <a href="#residences">2 BHK Luxury Residence</a>
            <a href="#residences">3 BHK Premium Residence</a>
            <a href="#residences">3 BHK Grand Corner Suite</a>
            <a href="#residences">4 BHK Sky Penthouse</a>
            <a href="#specifications">Salient Specifications</a>
          </div>
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

      {/*  Disclaimer from Brochure  */}
      <div className="footer-disclaimer">
        <strong>Disclaimer:</strong> This website and brochure content is a draft prepared solely for internal circulation and reference, and does not constitute a sales offer, commitment, or contract of any kind. All information, images, plans, and specifications shown are indicative and subject to change without notice. Any decisions or actions taken based on the contents of this website are at the sole discretion and risk of the reader, and The Arena Pimpri, Mahalaxmi Group, Kohinoor Group, and Agarwal Sukhwani Associates accept no liability for any errors, omissions, or reliance placed on this material. For accurate and binding details, please refer to the official sale agreement and RERA approved project documents.
      </div>

      <div className="footer-bottom">
        <div>&copy; 2026 Mahalaxmi The ARENA. All rights reserved.</div>
        <div>Designed with <span style={{ color: "var(--neon-lime)" }}>Life in Motion</span> • Pimpri, Pune</div>
      </div>
    </div>
  </footer>
  );
}
