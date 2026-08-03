"use client";

import React, { useState } from "react";

export default function Ecosystem() {
  const [activePillar, setActivePillar] = useState("space");

  return (
    <section className="os-section section-padding" id="operating-system">
      <div className="container">
        <div className="text-center">
          <span className="badge-neon">&bull; THE 5 INTEGRATED PILLARS &bull;</span>
          <h2 className="section-title">
            NOT AN AMENITY PLAN.<br />
            <span className="highlight-neon">IT IS AN OPERATING SYSTEM.</span>
          </h2>
          <p className="section-subtitle">
            How Mahalaxmi The ARENA creates an effortless flow of living, play,
            and personal progress across all age groups.
          </p>
        </div>

        {/* Pillar Interactive Tabs */}
        <div className="os-tabs-nav">
          <button
            className={`os-tab-btn ${activePillar === "space" ? "active" : ""}`}
            onClick={() => setActivePillar("space")}
          >
            <i className="ri-layout-masonry-line"></i> <span>1. SPACE</span>{" "}
            (80,000 Sq.Ft.)
          </button>
          <button
            className={`os-tab-btn ${activePillar === "management" ? "active" : ""}`}
            onClick={() => setActivePillar("management")}
          >
            <i className="ri-shield-user-line"></i> <span>2. MANAGEMENT</span>{" "}
            (ILESEUM)
          </button>
          <button
            className={`os-tab-btn ${activePillar === "programs" ? "active" : ""}`}
            onClick={() => setActivePillar("programs")}
          >
            <i className="ri-calendar-event-line"></i> <span>3. PROGRAMS</span>{" "}
            (Coaching)
          </button>
          <button
            className={`os-tab-btn ${activePillar === "partnerships" ? "active" : ""}`}
            onClick={() => setActivePillar("partnerships")}
          >
            <i className="ri-global-line"></i> <span>4. PARTNERSHIPS</span>{" "}
            (Academies)
          </button>
          <button
            className={`os-tab-btn ${activePillar === "progression" ? "active" : ""}`}
            onClick={() => setActivePillar("progression")}
          >
            <i className="ri-line-chart-line"></i> <span>5. PROGRESSION</span>{" "}
            (Journeys)
          </button>
        </div>

        {/* Pillar 1: SPACE */}
        {activePillar === "space" && (
          <div className="os-pillar-content active" id="pillar-space" data-reveal>
            <div className="pillar-text-box">
              <div className="pillar-number">
                PILLAR 01 // 80,000 SQ. FT. ECOSYSTEM
              </div>
              <h3 className="pillar-title">
                An Expansive World Where Movement Flows Through The Day
              </h3>
              <p className="pillar-desc">
                Built into the heart of Pimpri, our 80,000 sq. ft. sports and
                recreation ecosystem surrounds your home with championship-grade
                facilities. Designed to create a seamless rhythm of activity and
                energy across all 11 luxury residential towers.
              </p>
              <div className="pillar-features-grid">
                <div className="feature-pill">
                  <i className="ri-football-line"></i>{" "}
                  <span>FIFA-Grade Football Turf with Floodlights (10000 x 20000 mm)</span>
                </div>
                <div className="feature-pill">
                  <i className="ri-ping-pong-line"></i>{" "}
                  <span>Dual Championship Tennis Courts &amp; International Padel Court</span>
                </div>
                <div className="feature-pill">
                  <i className="ri-trophy-line"></i>{" "}
                  <span>1,787 Sq. Ft. High-Performance Gym &amp; Cardio Floor</span>
                </div>
                <div className="feature-pill">
                  <i className="ri-water-flash-line"></i>{" "}
                  <span>Elevated Infinity Pool, Jacuzzi &amp; Wet Leisure Deck</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <a href="#masterplan" className="btn btn-neon">
                  <i className="ri-map-pin-line"></i> View All 30+ Amenities
                </a>
                <button className="btn btn-glass trigger-brochure">
                  <i className="ri-file-download-line"></i> Download Brochure
                </button>
              </div>
            </div>
            <div
              className="pillar-media-box"
              style={{ backgroundImage: "url('/assets/images/sports_complex.jpg')" }}
            >
              <div className="pillar-media-overlay">
                <div className="partner-badge-box">
                  <h5>
                    <i className="ri-run-line"></i> Dedicated Sports Infrastructure
                  </h5>
                  <p>
                    Thoughtfully planned around a simple idea: everyday life
                    should keep you moving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pillar 2: MANAGEMENT */}
        {activePillar === "management" && (
          <div className="os-pillar-content active" id="pillar-management">
            <div className="pillar-text-box">
              <div className="pillar-number">
                PILLAR 02 // ILESEUM SPORTS MANAGEMENT
              </div>
              <h3 className="pillar-title">
                Professional Operations Across 126+ Premier Clubs
              </h3>
              <p className="pillar-desc">
                An amenity plan is static; an operating system is actively
                managed. We have partnered with <strong>ILESEUM Sports Management</strong>{" "}
                &mdash; India&rsquo;s premier club operator with experience across 126+ clubs
                &mdash; to ensure world-class consistency, safety, and upkeep.
              </p>
              <div className="pillar-features-grid">
                <div className="feature-pill">
                  <i className="ri-shield-star-line"></i>{" "}
                  <span>Professional Club Managers On-Site 365 Days</span>
                </div>
                <div className="feature-pill">
                  <i className="ri-calendar-check-line"></i>{" "}
                  <span>Automated App-Based Court &amp; Turf Booking System</span>
                </div>
                <div className="feature-pill">
                  <i className="ri-service-line"></i>{" "}
                  <span>Daily Upkeep, Hygienic Facility Maintenance &amp; Gear Care</span>
                </div>
                <div className="feature-pill">
                  <i className="ri-first-aid-kit-line"></i>{" "}
                  <span>Certified Sports Safety &amp; First-Aid Personnel On Duty</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <button className="btn btn-neon trigger-schedule">
                  <i className="ri-vip-crown-line"></i> Book VIP Site Visit
                </button>
              </div>
            </div>
            <div
              className="pillar-media-box"
              style={{ backgroundImage: "url('/assets/images/gym.jpg')" }}
            >
              <div className="pillar-media-overlay">
                <div className="partner-badge-box">
                  <h5>
                    <i className="ri-award-fill"></i> Operated by Ileseum Sports Management
                  </h5>
                  <p>
                    A professional partner bringing Life in Motion into everyday
                    living with reliability and pride.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pillar 3: PROGRAMS */}
        {activePillar === "programs" && (
          <div className="os-pillar-content active" id="pillar-programs">
            <div className="pillar-text-box">
              <div className="pillar-number">
                PILLAR 03 // COACHING BATCHES &amp; LEAGUES
              </div>
              <h3 className="pillar-title">
                Structured Routines For Children, Adults &amp; Seniors
              </h3>
              <p className="pillar-desc">
                Whether your child is learning their first backhand or you are
                competing in a weekend padel tournament, our structured coaching
                batches bring discipline and social joy to activity.
              </p>
              <div className="pillar-features-grid">
                <div className="feature-pill">
                  <i className="ri-team-line"></i>{" "}
                  <span>After-School Football, Tennis &amp; Racquet Academies for Kids</span>
                </div>
                <div className="feature-pill">
                  <i className="ri-medal-line"></i>{" "}
                  <span>Weekend Resident Leagues &amp; Inter-Tower Tournaments</span>
                </div>
                <div className="feature-pill">
                  <i className="ri-sun-line"></i>{" "}
                  <span>Morning Yoga, Aerobics &amp; High-Performance Group Fitness</span>
                </div>
                <div className="feature-pill">
                  <i className="ri-heart-pulse-line"></i>{" "}
                  <span>Senior Citizens Low-Impact Mobility &amp; Flexibility Batches</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <a href="#rhythms" className="btn btn-neon">
                  <i className="ri-user-heart-line"></i> Discover Your Rhythm of Life
                </a>
              </div>
            </div>
            <div
              className="pillar-media-box"
              style={{ backgroundImage: "url('/assets/images/interior.jpg')" }}
            >
              <div className="pillar-media-overlay">
                <div className="partner-badge-box">
                  <h5>
                    <i className="ri-calendar-event-line"></i> Community in Motion
                  </h5>
                  <p>
                    Multiple zones that encourage interaction, social bonding, and
                    active engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pillar 4: PARTNERSHIPS */}
        {activePillar === "partnerships" && (
          <div className="os-pillar-content active" id="pillar-partnerships">
            <div className="pillar-text-box">
              <div className="pillar-number">
                PILLAR 04 // GLOBAL ACADEMY EXPERTISE
              </div>
              <h3 className="pillar-title">
                Collaborations With National &amp; Global Sports Academies
              </h3>
              <p className="pillar-desc">
                Mahalaxmi The ARENA connects Pimpri to world-class coaching
                curriculums. Through our global academy partnerships, residents
                gain access to elite sports methodologies and celebrity
                masterclasses.
              </p>
              <div className="pillar-features-grid">
                <div className="feature-pill">
                  <i className="ri-global-line"></i>{" "}
                  <span>Curriculums Designed by National Champions</span>
                </div>
                <div className="feature-pill">
                  <i className="ri-vip-diamond-line"></i>{" "}
                  <span>Specialized Racquet &amp; Ball Sport Academy Certifications</span>
                </div>
                <div className="feature-pill">
                  <i className="ri-pulse-line"></i>{" "}
                  <span>Integrated Sports Nutrition &amp; Physiotherapy Consultation</span>
                </div>
                <div className="feature-pill">
                  <i className="ri-shirt-line"></i>{" "}
                  <span>Exclusive Sports Brand Gear Collaborations &amp; Events</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <button className="btn btn-neon trigger-schedule">
                  <i className="ri-calendar-check-line"></i> Request Academy Details
                </button>
              </div>
            </div>
            <div
              className="pillar-media-box"
              style={{ backgroundImage: "url('/assets/images/towers_kohinoor.jpg')" }}
            >
              <div className="pillar-media-overlay">
                <div className="partner-badge-box">
                  <h5>
                    <i className="ri-global-line"></i> Global Standards in Pimpri
                  </h5>
                  <p>
                    Bringing international athletic methodologies and
                    high-performance standards home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pillar 5: PROGRESSION */}
        {activePillar === "progression" && (
          <div className="os-pillar-content active" id="pillar-progression">
            <div className="pillar-text-box">
              <div className="pillar-number">
                PILLAR 05 // MEASURABLE JOURNEYS
              </div>
              <h3 className="pillar-title">
                Track Real Progress For Every Member Of The Family
              </h3>
              <p className="pillar-desc">
                We don't just provide space; we celebrate progress. With our
                digital milestone tracking and regular athletic evaluations, every
                day is a step forward in energy and health.
              </p>
              <div className="pillar-features-grid">
                <div className="feature-pill">
                  <i className="ri-smartphone-line"></i>{" "}
                  <span>Digital Fitness &amp; Milestone Tracking Resident App</span>
                </div>
                <div className="feature-pill">
                  <i className="ri-bar-chart-box-line"></i>{" "}
                  <span>Quarterly Pediatric Athletic Skill Reports for Kids</span>
                </div>
                <div className="feature-pill">
                  <i className="ri-heart-add-line"></i>{" "}
                  <span>Metabolic, Vitality &amp; Recovery Assessments</span>
                </div>
                <div className="feature-pill">
                  <i className="ri-trophy-line"></i>{" "}
                  <span>Community Achievement &amp; Healthy Competition Leaderboards</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <a href="#calculator" className="btn btn-neon">
                  <i className="ri-calculator-line"></i> Calculate ROI &amp; Yield
                </a>
              </div>
            </div>
            <div
              className="pillar-media-box"
              style={{ backgroundImage: "url('/assets/images/sports_club.jpg')" }}
            >
              <div className="pillar-media-overlay">
                <div className="partner-badge-box">
                  <h5>
                    <i className="ri-line-chart-line"></i> Measurable Health Outcomes
                  </h5>
                  <p>
                    A seamless flow of living, play, and measurable personal
                    progress.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
