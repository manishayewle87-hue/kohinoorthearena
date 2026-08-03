"use client";
import React from 'react';

export default function Gallery() {
  return (
    <section className="gallery-section section-padding" id="gallery">
      <div className="container">
        <div className="text-center">
          <span className="badge-neon">• BROCHURE RENDERINGS •</span>
          <h2 className="section-title">ARCHITECTURAL & <span className="highlight-neon">LANDSCAPE SANCTUARIES</span></h2>
          <p className="section-subtitle">Immerse yourself in authentic visual renderings of Mahalaxmi The ARENA — from 34-storey illuminated facades to Japanese forest bathing temples.</p>
        </div>

        <div className="gallery-filter-bar">
          <button className="gallery-btn active" data-filter="all">All Sanctuaries</button>
          <button className="gallery-btn" data-filter="architecture">Towers & Facade</button>
          <button className="gallery-btn" data-filter="sports">Club Ileseum & Sports</button>
          <button className="gallery-btn" data-filter="forest">Zen & Forest Sanctuaries</button>
          <button className="gallery-btn" data-filter="interiors">Luxury Interiors</button>
        </div>

        <div className="gallery-grid" id="gallery-grid">
          <div className="gallery-item" data-category="architecture" data-src="assets/images/towers_front.jpg" data-title="34-Storey Luxury Residential Towers Elevation at Dusk" data-reveal data-delay="1">
            <img src="assets/images/towers_front.jpg" alt="Towers Elevation at Dusk"/>
            <div className="gallery-caption">
              <span className="gallery-tag">Architecture</span>
              <h4>34-Storey Luxury Towers at Dusk</h4>
            </div>
          </div>
          <div className="gallery-item" data-category="architecture" data-src="assets/images/towers_kohinoor.jpg" data-title="Phase-1 Premium Wings & Kohinoor Crest High-Rise View" data-reveal data-delay="2">
            <img src="assets/images/towers_kohinoor.jpg" alt="Phase-1 Premium Wings"/>
            <div className="gallery-caption">
              <span className="gallery-tag">Architecture</span>
              <h4>Phase-1 Wings & Kohinoor Crest</h4>
            </div>
          </div>
          <div className="gallery-item" data-category="forest" data-src="assets/images/garden_pond.jpg" data-title="Natural Water Retention Pond & Serene Lotus Garden" data-reveal data-delay="3">
            <img src="assets/images/garden_pond.jpg" alt="Natural Water Retention Pond"/>
            <div className="gallery-caption">
              <span className="gallery-tag">Zen Sanctuary</span>
              <h4>Lotus Garden & Retention Pond</h4>
            </div>
          </div>
          <div className="gallery-item" data-category="forest" data-src="assets/images/tree_house.jpg" data-title="Shirin Yoku Forest Bathing Temple & Elevated Tree Walkway" data-reveal data-delay="4">
            <img src="assets/images/tree_house.jpg" alt="Shirin Yoku Forest Bathing"/>
            <div className="gallery-caption">
              <span className="gallery-tag">Zen Sanctuary</span>
              <h4>Shirin Yoku Forest Bathing Temple</h4>
            </div>
          </div>
          <div className="gallery-item" data-category="forest" data-src="assets/images/jogging_track.jpg" data-title="9M Wide Landscaped Fire Driveway & Dedicated Jogging Track" data-reveal data-delay="5">
            <img src="assets/images/jogging_track.jpg" alt="Landscaped Jogging Track"/>
            <div className="gallery-caption">
              <span className="gallery-tag">Active Landscape</span>
              <h4>Landscaped Jogging Track & Tree Grove</h4>
            </div>
          </div>
          <div className="gallery-item" data-category="sports" data-src="assets/images/sports_club.jpg" data-title="Club Ileseum Elevated Infinity Swimming Pool & Sports Courts" data-reveal data-delay="6">
            <img src="assets/images/sports_club.jpg" alt="Infinity Pool & Sports Courts"/>
            <div className="gallery-caption">
              <span className="gallery-tag">Club Ileseum</span>
              <h4>Elevated Infinity Pool & Sports Courts</h4>
            </div>
          </div>
          <div className="gallery-item" data-category="sports" data-src="assets/images/gym.jpg" data-title="1,787 Sq. Ft. Cardio Floor & Indoor Racquet Courts" data-reveal data-delay="7">
            <img src="assets/images/gym.jpg" alt="Expansive Gym Floor"/>
            <div className="gallery-caption">
              <span className="gallery-tag">Fitness Club</span>
              <h4>1,787 Sq. Ft. Expansive Gym Floor</h4>
            </div>
          </div>
          <div className="gallery-item" data-category="architecture" data-src="assets/images/hero.jpg" data-title="Aerial Skyscraper Overview & 80,000 Sq. Ft. Township" data-reveal data-delay="8">
            <img src="assets/images/hero.jpg" alt="Aerial Overview"/>
            <div className="gallery-caption">
              <span className="gallery-tag">Township View</span>
              <h4>Aerial Skyscraper Overview</h4>
            </div>
          </div>
          <div className="gallery-item" data-category="interiors" data-src="assets/images/interior.jpg" data-title="2, 3 & 4 BHK Luxury Living Salon with Panoramic Balcony" data-reveal data-delay="2">
            <img src="assets/images/interior.jpg" alt="Luxury Living Salon"/>
            <div className="gallery-caption">
              <span className="gallery-tag">Interiors</span>
              <h4>Luxury Living Salon & Balcony View</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
