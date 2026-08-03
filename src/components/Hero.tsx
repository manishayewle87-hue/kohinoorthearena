import React from "react";

export default function Hero() {
  return (
    <section
      className="hero-section"
      id="hero"
      style={{ backgroundImage: "url('/assets/images/hero.jpg')" }}
    >
      {/* Floating ambient orbs for depth */}
      <div className="hero-orb hero-orb-1"></div>
      <div className="hero-orb hero-orb-2"></div>
      <div className="hero-orb hero-orb-3"></div>
      <div className="hero-bg-overlay"></div>
      
      <div className="container hero-content">
        <span className="badge-neon">PIMPRI &bull; SPORTS TOWNSHIP</span>

        <h1 className="hero-title">
          LIVE WHERE<br />
          <span className="highlight-neon">CHAMPIONS TRAIN.</span>
        </h1>

        <p className="hero-subtitle">
          80,000 Sq. Ft. Sports Ecosystem. 11 Towers. Managed by Ileseum.
        </p>

        <div className="hero-buttons">
          <a href="#residences" className="btn btn-neon">
            <i className="ri-building-4-line"></i> View Residences
          </a>
          <button className="btn btn-glass trigger-schedule">
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
