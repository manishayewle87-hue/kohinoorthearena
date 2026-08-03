"use client";
import React from 'react';

export default function Specifications() {
  return (
    <section className="specs-section section-padding" id="specifications">
      <div className="container">
        <div className="text-center">
          <span className="badge-purple">• SALIENT SPECIFICATIONS •</span>
          <h2 className="section-title">ENGINEERED FOR <span className="highlight-neon">ENDURING LIVING</span></h2>
          <p className="section-subtitle">Earthquake-resistant RCC frame, 3000 mm slab-to-slab height, and international brand partnerships.</p>
        </div>

        <div className="specs-grid">
          {/*  1. Structure  */}
          <div className="spec-card">
            <div className="spec-card-header">
              <div className="spec-icon"><i className="ri-building-line"></i></div>
              <h4>Structure & Build</h4>
            </div>
            <ul className="spec-list">
              <li>Earthquake-resistant RCC frame</li>
              <li>Aluminium formwork shear-wall construction</li>
              <li>Slab-to-slab height: 3,000 mm</li>
            </ul>
          </div>

          {/*  2. Flooring  */}
          <div className="spec-card">
            <div className="spec-card-header">
              <div className="spec-icon"><i className="ri-layout-grid-line"></i></div>
              <h4>Flooring & Tiles</h4>
            </div>
            <ul className="spec-list">
              <li>Large format vitrified tiles (1800 x 1200 mm) in living, dining & bedrooms</li>
              <li>Anti-skid vitrified tiles in all balconies & terraces</li>
              <li>Dado tiles (1200 x 600 mm) full height on bathroom walls</li>
            </ul>
          </div>

          {/*  3. Kitchen  */}
          <div className="spec-card">
            <div className="spec-card-header">
              <div className="spec-icon"><i className="ri-restaurant-line"></i></div>
              <h4>Kitchen & Utility</h4>
            </div>
            <ul className="spec-list">
              <li>15mm stone tile platform with SS under-mount sink</li>
              <li>Dado tiles (300 x 450 mm) above cooking platform</li>
              <li>Wet & dry kitchen zoning with separate washing machine provision</li>
            </ul>
          </div>

          {/*  4. Doors  */}
          <div className="spec-card">
            <div className="spec-card-header">
              <div className="spec-icon"><i className="ri-door-lock-line"></i></div>
              <h4>Doors & Smart Access</h4>
            </div>
            <ul className="spec-list">
              <li>Main door with high-security digital smart lock</li>
              <li>Engineered wood doors with profile-wrapped architrave</li>
              <li>IP-based video door phone with 7&quot; display screen</li>
            </ul>
          </div>

          {/*  5. Windows  */}
          <div className="spec-card">
            <div className="spec-card-header">
              <div className="spec-icon"><i className="ri-window-line"></i></div>
              <h4>Windows & Glazing</h4>
            </div>
            <ul className="spec-list">
              <li>Three-track UPVC sliding windows with mosquito mesh</li>
              <li>Double-glazed acoustic & thermal insulation glass</li>
              <li>High-rise compatible, international-grade quality</li>
            </ul>
          </div>

          {/*  6. Electrification  */}
          <div className="spec-card">
            <div className="spec-card-header">
              <div className="spec-icon"><i className="ri-flashlight-line"></i></div>
              <h4>Electrification</h4>
            </div>
            <ul className="spec-list">
              <li>Concealed copper wiring with ISI-grade MCBs</li>
              <li>Modular switches throughout by Legrand/Schneider</li>
              <li>Smart home automation in living room & master bedroom</li>
            </ul>
          </div>

          {/*  7. Sanitary Fittings  */}
          <div className="spec-card">
            <div className="spec-card-header">
              <div className="spec-icon"><i className="ri-drop-line"></i></div>
              <h4>Sanitary & CP Fittings</h4>
            </div>
            <ul className="spec-list">
              <li>Premium CP & sanitary fittings throughout (Motto/Kohler)</li>
              <li>Wall-hung commodes with quiet-close seats</li>
              <li>Single-lever shower diverters & exhaust fans in all toilets</li>
            </ul>
          </div>

          {/*  8. Elevators  */}
          <div className="spec-card">
            <div className="spec-card-header">
              <div className="spec-icon"><i className="ri-arrow-up-down-line"></i></div>
              <h4>Elevators & Backup</h4>
            </div>
            <ul className="spec-list">
              <li>3 high-speed passenger lifts per wing (2.5 meters/sec)</li>
              <li>1 dedicated service/fire elevator per wing</li>
              <li>100% DG generator backup on all elevators & common areas</li>
            </ul>
          </div>

          {/*  9. Safety & Fire  */}
          <div className="spec-card">
            <div className="spec-card-header">
              <div className="spec-icon"><i className="ri-shield-check-line"></i></div>
              <h4>Safety & Fire Fighting</h4>
            </div>
            <ul className="spec-list">
              <li>Fire hydrant system with dedicated fire pump</li>
              <li>Ceiling-mounted smoke detectors on each floor & apartment</li>
              <li>8-zone smart security alarm panel & fire-rated doors</li>
            </ul>
          </div>
        </div>
      </div>

      {/*  Global Brand Partners Ticker  */}
      <div className="brand-ticker-section">
        <div className="container">
          <div className="ticker-title">PARTNERED WITH THE BEST BRANDS GLOBALLY</div>
          <div className="brands-grid">
            <div className="brand-item">MOTTO</div>
            <div className="brand-item">KOHLER</div>
            <div className="brand-item">YALE</div>
            <div className="brand-item">LINEA DESIGNS</div>
            <div className="brand-item">KEC</div>
            <div className="brand-item">LEGRAND</div>
            <div className="brand-item">SCHNEIDER ELECTRIC</div>
            <div className="brand-item">HESEOS</div>
            <div className="brand-item">ONETOUCH</div>
            <div className="brand-item">HULETT</div>
            <div className="brand-item">KITEC</div>
            <div className="brand-item">ASIAN PAINTS</div>
          </div>
        </div>
      </div>
    </section>
  );
}
