"use client";
import React from 'react';

export default function Residences() {
  return (
    <section className="residences-section section-padding" id="residences">
      <div className="container">
        <div className="text-center">
          <span className="badge-neon">• ARCHITECTURAL ELEGANCE •</span>
          <h2 className="section-title">2, 3, & 4 BHK <span className="highlight-neon">SPORTS RESIDENCES</span></h2>
          <p className="section-subtitle">Featuring 3,000 mm slab height, large-format 1800x1200 mm floor tiles, Kohler/Motto fittings, and panoramic balcony views of Pimpri.</p>
        </div>

        {/*  Residence Selector Tabs  */}
        <div className="residence-tabs">
          <button className="residence-tab-btn active" data-residence="2bhk">2 BHK (830 – 1,206 Sq.Ft.)</button>
          <button className="residence-tab-btn" data-residence="3bhk_premium">3 BHK Smart (986 – 1,340 Sq.Ft.)</button>
          <button className="residence-tab-btn" data-residence="3bhk_grand">3 BHK Grand (1,250 – 1,626 Sq.Ft.)</button>
          <button className="residence-tab-btn" data-residence="4bhk">4 BHK Sky (1,600 – 2,600 Sq.Ft.)</button>
          <button className="trigger-comparison" style={{ borderColor: "var(--neon-lime)", color: "var(--neon-lime)", fontWeight: "600", background: "transparent", border: "1px solid", padding: "8px 18px", borderRadius: "50px", cursor: "pointer", fontFamily: "inherit", fontSize: "0.85rem", letterSpacing: "0.5px", transition: "all 0.2s" }}><i className="ri-scales-3-line"></i> Compare All</button>
        </div>

        {/*  1. 2 BHK Card  */}
        <div className="residence-showcase-card" id="res-2bhk">
          <div className="residence-info-box">
            <div>
              <div className="residence-header">
                <span className="res-tag">SMART URBAN LIVING</span>
                <h3>2 BHK Luxury Sports Residence</h3>
                <div className="res-price">₹ 88.5 Lakhs Onwards*</div>
              </div>

              <div className="res-specs-bar">
                <div className="res-spec">
                  <span>Carpet Area (RERA)</span>
                  <strong>830 – 1,206 Sq. Ft.</strong>
                </div>
                <div className="res-spec">
                  <span>Balcony & Terrace</span>
                  <strong>95 - 120 Sq. Ft.</strong>
                </div>
                <div className="res-spec">
                  <span>Slab-to-Slab Height</span>
                  <strong>3,000 mm</strong>
                </div>
                <div className="res-spec">
                  <span>Elevators per Wing</span>
                  <strong>3 High-Speed + 1 Service</strong>
                </div>
              </div>

              <ul className="res-highlights-list">
                <li><i className="ri-check-double-line"></i> <span>1800 x 1200 mm Large Format Vitrified Flooring in living/dining/bedrooms</span></li>
                <li><i className="ri-check-double-line"></i> <span>Digital Smart Main Door Lock by Yale & 7" IP Video Door Phone</span></li>
                <li><i className="ri-check-double-line"></i> <span>Wet & Dry Kitchen Zoning with stone platform & dry balcony</span></li>
                <li><i className="ri-check-double-line"></i> <span>Three-track UPVC soundproof sliding windows with mosquito mesh</span></li>
              </ul>

              <div className="res-ideal-for">
                <strong>Ideal For:</strong> Working Achievers & Young Couples seeking an active township lifestyle without leaving Pimpri.
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <button className="btn btn-neon trigger-floorplan" data-config="2 BHK Luxury" data-image="assets/images/floorplan_2bhk.jpg" data-area="830 – 1,206 Sq. Ft. RERA" data-tag="Tower A2 | 1st Residential Floor">
                <i className="ri-layout-right-line"></i> View Floor Plan Modal
              </button>
              <button className="btn btn-glass trigger-schedule">
                <i className="ri-calendar-event-line"></i> Check Availability
              </button>
            </div>
          </div>

          <div className="residence-visual-box">
            <img src="assets/images/interior.jpg" alt="2 BHK Luxury Residence Living Room" className="residence-img"/>
          </div>
        </div>

        {/*  2. 3 BHK Premium Card  */}
        <div className="residence-showcase-card" id="res-3bhk_premium" style={{ display: "none" }}>
          <div className="residence-info-box">
            <div>
              <div className="residence-header">
                <span className="res-tag">SMART FAMILY LIVING</span>
                <h3>3 BHK Smart Residence</h3>
                <div className="res-price">₹ 1.28 Cr Onwards*</div>
              </div>

              <div className="res-specs-bar">
                <div className="res-spec">
                  <span>Carpet Area (RERA)</span>
                  <strong>986 – 1,340 Sq. Ft.</strong>
                </div>
                <div className="res-spec">
                  <span>Balcony & Terrace</span>
                  <strong>140 - 165 Sq. Ft.</strong>
                </div>
                <div className="res-spec">
                  <span>Bathrooms</span>
                  <strong>3 Kohler / Motto Fitted</strong>
                </div>
                <div className="res-spec">
                  <span>Smart Home</span>
                  <strong>Living & Master Bed Auto</strong>
                </div>
              </div>

              <ul className="res-highlights-list">
                <li><i className="ri-check-double-line"></i> <span>Spacious Living & Dining Salon with panoramic sunset balcony</span></li>
                <li><i className="ri-check-double-line"></i> <span>Master suite with walk-in wardrobe space and smart home lighting</span></li>
                <li><i className="ri-check-double-line"></i> <span>Full-height dado tiles (1200x600mm) in all 3 premium bathrooms</span></li>
                <li><i className="ri-check-double-line"></i> <span>Unobstructed views overlooking the 80,000 Sq.Ft. sports turf & lagoon</span></li>
              </ul>

              <div className="res-ideal-for">
                <strong>Ideal For:</strong> Ambitious Parents & Growing Families desiring space, safety, and child athletic development.
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <button className="btn btn-neon trigger-floorplan" data-config="3 BHK Smart" data-image="assets/images/floorplan_3bhk_premium.jpg" data-area="986 – 1,340 Sq. Ft. RERA" data-tag="Tower A2 | Typical Floor">
                <i className="ri-layout-right-line"></i> View Floor Plan Modal
              </button>
              <button className="btn btn-glass trigger-schedule">
                <i className="ri-calendar-event-line"></i> Check Availability
              </button>
            </div>
          </div>

          <div className="residence-visual-box">
            <img src="assets/images/interior.jpg" alt="3 BHK Premium Residence" className="residence-img"/>
          </div>
        </div>

        {/*  3. 3 BHK Grand Corner Suite Card  */}
        <div className="residence-showcase-card" id="res-3bhk_grand" style={{ display: "none" }}>
          <div className="residence-info-box">
            <div>
              <div className="residence-header">
                <span className="res-tag">DUAL ASPECT LUXURY</span>
                <h3>3 BHK Grand Corner Suite</h3>
                <div className="res-price">₹ 1.49 Cr Onwards*</div>
              </div>

              <div className="res-specs-bar">
                <div className="res-spec">
                  <span>Carpet Area (RERA)</span>
                  <strong>1,250 – 1,626 Sq. Ft.</strong>
                </div>
                <div className="res-spec">
                  <span>Balcony & Terrace</span>
                  <strong>180 - 210 Sq. Ft.</strong>
                </div>
                <div className="res-spec">
                  <span>Ventilation</span>
                  <strong>Corner Cross-Ventilated</strong>
                </div>
                <div className="res-spec">
                  <span>Safety</span>
                  <strong>8-Zone Smart Alarm Panel</strong>
                </div>
              </div>

              <ul className="res-highlights-list">
                <li><i className="ri-check-double-line"></i> <span>Corner apartment orientation providing natural light on three sides</span></li>
                <li><i className="ri-check-double-line"></i> <span>Grand foyer entrance with dedicated shoe & wardrobe console space</span></li>
                <li><i className="ri-check-double-line"></i> <span>Double-glazed acoustic UPVC sliding doors opening to dual balconies</span></li>
                <li><i className="ri-check-double-line"></i> <span>Direct elevator access wing (3 passenger lifts at 2.5 meters/second)</span></li>
              </ul>

              <div className="res-ideal-for">
                <strong>Ideal For:</strong> Executive families looking for privacy, cross ventilation, and expansive entertaining salon.
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <button className="btn btn-neon trigger-floorplan" data-config="3 BHK Grand Suite" data-image="assets/images/floorplan_3bhk_grand.jpg" data-area="1,250 – 1,626 Sq. Ft. RERA" data-tag="Tower A2 | 1st Residential Floor">
                <i className="ri-layout-right-line"></i> View Floor Plan Modal
              </button>
              <button className="btn btn-glass trigger-schedule">
                <i className="ri-calendar-event-line"></i> Check Availability
              </button>
            </div>
          </div>

          <div className="residence-visual-box">
            <img src="assets/images/interior.jpg" alt="3 BHK Grand Corner Suite" className="residence-img"/>
          </div>
        </div>

        {/*  4. 4 BHK Sky Residence Card  */}
        <div className="residence-showcase-card" id="res-4bhk" style={{ display: "none" }}>
          <div className="residence-info-box">
            <div>
              <div className="residence-header">
                <span className="res-tag">THE PINNACLE OF ARENA</span>
                <h3>4 BHK Sky Residence & Penthouse</h3>
                <div className="res-price">₹ 2.15 Cr Onwards*</div>
              </div>

              <div className="res-specs-bar">
                <div className="res-spec">
                  <span>Carpet Area (RERA)</span>
                  <strong>1,600 – 2,600 Sq. Ft.</strong>
                </div>
                <div className="res-spec">
                  <span>Balcony & Terrace</span>
                  <strong>260 - 320 Sq. Ft.</strong>
                </div>
                <div className="res-spec">
                  <span>Towers</span>
                  <strong>Exclusive A1 & B1 Wings</strong>
                </div>
                <div className="res-spec">
                  <span>Elevation</span>
                  <strong>Floors 25 to 33 + Attic</strong>
                </div>
              </div>

              <ul className="res-highlights-list">
                <li><i className="ri-check-double-line"></i> <span>270-Degree panoramic views of Pune skyline and Pimpri sports township</span></li>
                <li><i className="ri-check-double-line"></i> <span>Expansive living salon with double balcony deck & dining pavilion</span></li>
                <li><i className="ri-check-double-line"></i> <span>Private multipurpose studio option (home office / library / staff suite)</span></li>
                <li><i className="ri-check-double-line"></i> <span>Highest tier smart home automation by Schneider & Legrand</span></li>
              </ul>

              <div className="res-ideal-for">
                <strong>Ideal For:</strong> Founders, CXOs & Connoisseurs seeking trophy living in Pimpri’s finest residential address.
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <button className="btn btn-neon trigger-floorplan" data-config="4 BHK Penthouse" data-image="assets/images/floorplan_4bhk.jpg" data-area="1,600 – 2,600 Sq. Ft. RERA" data-tag="Tower A2 | 1st Residential Floor">
                <i className="ri-layout-right-line"></i> View Floor Plan Modal
              </button>
              <button className="btn btn-glass trigger-schedule">
                <i className="ri-calendar-event-line"></i> Check Availability
              </button>
            </div>
          </div>

          <div className="residence-visual-box">
            <img src="assets/images/interior.jpg" alt="4 BHK Sky Residence" className="residence-img"/>
          </div>
        </div>

      </div>
    </section>
  );
}
