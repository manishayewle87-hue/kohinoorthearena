import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero-section" id="hero" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Hyper-Optimized LCP Image */}
      <Image 
        src="/assets/images/hero.jpg" 
        alt="Mahalaxmi The Arena by Mahalaxmi Group & Kohinoor Group — Luxury Residences, Pimpri Chinchwad, Pune" 
        fill 
        priority 
        fetchPriority="high"
        quality={90}
        sizes="100vw"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
        style={{ objectFit: 'cover', zIndex: 0, opacity: 0.6 }}
        aria-hidden={false}
      />
      
      {/* Floating ambient orbs for depth */}
      <div className="hero-orb hero-orb-1" style={{ zIndex: 1 }} aria-hidden="true"></div>
      <div className="hero-orb hero-orb-2" style={{ zIndex: 1 }} aria-hidden="true"></div>
      <div className="hero-orb hero-orb-3" style={{ zIndex: 1 }} aria-hidden="true"></div>
      <div className="hero-bg-overlay" style={{ zIndex: 2 }}></div>
      
      <div className="container hero-content" style={{ position: 'relative', zIndex: 3 }}>
        <span className="badge-neon">MAHALAXMI THE ARENA &bull; LIFE IN MOTION PIMPRI</span>

        <h1 className="hero-title">
          LIVE WHERE<br />
          <span className="highlight-neon">CHAMPIONS TRAIN.</span>
        </h1>

        <p className="hero-subtitle">
          Discover premium 2, 3 & 4 BHK luxury apartments in Pimpri. Featuring an 80,000 Sq. Ft. Sports Ecosystem, 11 Towers, and managed by Ileseum.
        </p>

        <div className="hero-buttons">
          <button className="btn btn-neon" title="View Luxury Flats in Pimpri" aria-label="Navigate to Residences section" onClick={() => { const el = document.getElementById('residences'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
            <i className="ri-building-4-line"></i> View Residences
          </button>
          <button 
            className="btn btn-glass trigger-schedule" 
            title="Book Mahalaxmi The Arena Site Visit" 
            aria-label="Book a Site Visit to Mahalaxmi The Arena"
          >
            <i className="ri-calendar-event-line"></i> Book Site Visit
          </button>
        </div>

        {/* Quick Stats Bar */}
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-icon neon">
              <i className="ri-run-line"></i>
            </div>
            <div className="stat-content">
              <h4>
                <span className="stat-counter" data-count="80000">80,000</span>{" "}
                <span>SQ. FT.</span>
              </h4>
              <p>Sports Ecosystem</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <i className="ri-building-4-line"></i>
            </div>
            <div className="stat-content">
              <h4>
                <span className="stat-counter" data-count="11">11</span>{" "}
                <span>TOWERS</span>
              </h4>
              <p>34-Storey Residences</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon neon">
              <i className="ri-shield-check-line"></i>
            </div>
            <div className="stat-content">
              <h4>
                2, 3 &amp; 4 <span>BHK</span>
              </h4>
              <p>Luxury Residences</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <i className="ri-trophy-line"></i>
            </div>
            <div className="stat-content">
              <h4>
                <span>ILESEUM</span>
              </h4>
              <p>Sports Management</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
