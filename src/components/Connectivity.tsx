"use client";
import React from 'react';

export default function Connectivity() {
  return (
    <section className="location-section section-padding" id="connectivity">
      <div className="container">
        <div className="text-center">
          <span className="badge-neon">• STRATEGIC LOCATION •</span>
          <h2 className="section-title">PIMPRI, IN MOTION <span className="highlight-neon">WITH YOU</span></h2>
          <p className="section-subtitle">Located in the well-connected heart of Pimpri, Pune. Easy access to industrial hubs, schools, hospitals, and Metro Line 1.</p>
        </div>

        <div className="location-grid">
          {/*  Left: Distance Category Filter & List  */}
          <div>
            <div className="location-cat-tabs">
              <button className="loc-tab-btn active" data-loc-cat="edu">EDUCATION</button>
              <button className="loc-tab-btn" data-loc-cat="health">HEALTHCARE</button>
              <button className="loc-tab-btn" data-loc-cat="work">WORKPLACES</button>
              <button className="loc-tab-btn" data-loc-cat="transit">CONNECTIVITY</button>
            </div>

            {/*  Education List  */}
            <div className="location-list-box location-category-list" id="loc-list-edu">
              <div className="loc-item">
                <div className="loc-name"><i className="ri-graduation-cap-line"></i> <span>Podar International School</span></div>
                <div className="loc-dist-time"><span className="loc-dist">3.8 km</span><span className="loc-time">8 mins</span></div>
              </div>
              <div className="loc-item">
                <div className="loc-name"><i className="ri-graduation-cap-line"></i> <span>St. Ursula High School</span></div>
                <div className="loc-dist-time"><span className="loc-dist">4.0 km</span><span className="loc-time">9 mins</span></div>
              </div>
              <div className="loc-item">
                <div className="loc-name"><i className="ri-graduation-cap-line"></i> <span>City Pride School</span></div>
                <div className="loc-dist-time"><span className="loc-dist">4.5 km</span><span className="loc-time">10 mins</span></div>
              </div>
              <div className="loc-item">
                <div className="loc-name"><i className="ri-graduation-cap-line"></i> <span>SNBP International School</span></div>
                <div className="loc-dist-time"><span className="loc-dist">4.7 km</span><span className="loc-time">11 mins</span></div>
              </div>
              <div className="loc-item">
                <div className="loc-name"><i className="ri-graduation-cap-line"></i> <span>D. Y. Patil International University</span></div>
                <div className="loc-dist-time"><span className="loc-dist">5.7 km</span><span className="loc-time">13 mins</span></div>
              </div>
            </div>

            {/*  Healthcare List  */}
            <div className="location-list-box location-category-list" id="loc-list-health" style={{ display: "none" }}>
              <div className="loc-item">
                <div className="loc-name"><i className="ri-hospital-line"></i> <span>Aditya Birla Memorial Hospital</span></div>
                <div className="loc-dist-time"><span className="loc-dist">4.1 km</span><span className="loc-time">9 mins</span></div>
              </div>
              <div className="loc-item">
                <div className="loc-name"><i className="ri-hospital-line"></i> <span>Lokmanya Hospital</span></div>
                <div className="loc-dist-time"><span className="loc-dist">5.0 km</span><span className="loc-time">12 mins</span></div>
              </div>
              <div className="loc-item">
                <div className="loc-name"><i className="ri-hospital-line"></i> <span>Sterling Multispecialty Hospital</span></div>
                <div className="loc-dist-time"><span className="loc-dist">5.0 km</span><span className="loc-time">12 mins</span></div>
              </div>
              <div className="loc-item">
                <div className="loc-name"><i className="ri-hospital-line"></i> <span>Dr. D. Y. Patil Medical Hospital</span></div>
                <div className="loc-dist-time"><span className="loc-dist">5.9 km</span><span className="loc-time">14 mins</span></div>
              </div>
              <div className="loc-item">
                <div className="loc-name"><i className="ri-hospital-line"></i> <span>Ruby Hall Clinic, Hinjewadi</span></div>
                <div className="loc-dist-time"><span className="loc-dist">11.4 km</span><span className="loc-time">22 mins</span></div>
              </div>
            </div>

            {/*  Workplaces List  */}
            <div className="location-list-box location-category-list" id="loc-list-work" style={{ display: "none" }}>
              <div className="loc-item">
                <div className="loc-name"><i className="ri-building-2-line"></i> <span>KWT (Kohinoor World Towers)</span></div>
                <div className="loc-dist-time"><span className="loc-dist">2.0 km</span><span className="loc-time">5 mins</span></div>
              </div>
              <div className="loc-item">
                <div className="loc-name"><i className="ri-building-2-line"></i> <span>Chakan MIDC Industrial Corridor</span></div>
                <div className="loc-dist-time"><span className="loc-dist">3.4 km</span><span className="loc-time">7 mins</span></div>
              </div>
              <div className="loc-item">
                <div className="loc-name"><i className="ri-building-2-line"></i> <span>MIDC Pimpri-Chinchwad</span></div>
                <div className="loc-dist-time"><span className="loc-dist">4.4 km</span><span className="loc-time">10 mins</span></div>
              </div>
              <div className="loc-item">
                <div className="loc-name"><i className="ri-building-2-line"></i> <span>Bhosari Industrial Area</span></div>
                <div className="loc-dist-time"><span className="loc-dist">7.8 km</span><span className="loc-time">16 mins</span></div>
              </div>
              <div className="loc-item">
                <div className="loc-name"><i className="ri-building-2-line"></i> <span>Hinjewadi IT Park</span></div>
                <div className="loc-dist-time"><span className="loc-dist">9.9 km</span><span className="loc-time">20 mins</span></div>
              </div>
            </div>

            {/*  Transit & Connectivity List  */}
            <div className="location-list-box location-category-list" id="loc-list-transit" style={{ display: "none" }}>
              <div className="loc-item">
                <div className="loc-name"><i className="ri-train-line"></i> <span>Pune Metro Line 1 (PCMC Station)</span></div>
                <div className="loc-dist-time"><span className="loc-dist">2.4 km</span><span className="loc-time">6 mins</span></div>
              </div>
              <div className="loc-item">
                <div className="loc-name"><i className="ri-train-line"></i> <span>Chinchwad Railway Station</span></div>
                <div className="loc-dist-time"><span className="loc-dist">2.5 km</span><span className="loc-time">6 mins</span></div>
              </div>
              <div className="loc-item">
                <div className="loc-name"><i className="ri-train-line"></i> <span>Pimpri Railway Station</span></div>
                <div className="loc-dist-time"><span className="loc-dist">3.5 km</span><span className="loc-time">8 mins</span></div>
              </div>
              <div className="loc-item">
                <div className="loc-name"><i className="ri-train-line"></i> <span>Pune Junction Railway Station</span></div>
                <div className="loc-dist-time"><span className="loc-dist">17.2 km</span><span className="loc-time">35 mins</span></div>
              </div>
              <div className="loc-item">
                <div className="loc-name"><i className="ri-flight-takeoff-line"></i> <span>Pune International Airport</span></div>
                <div className="loc-dist-time"><span className="loc-dist">20.4 km</span><span className="loc-time">40 mins</span></div>
              </div>
            </div>

            <div style={{ marginTop: "24px" }}>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn btn-glass" style={{ width: "100%" }}>
                <i className="ri-direction-line"></i> Open in Google Maps
              </a>
            </div>
          </div>

          {/*  Right: Interactive Pimpri Canvas Map  */}
          <div className="location-map-box">
            <canvas id="locationCanvas"></canvas>
          </div>
        </div>
      </div>
    </section>
  );
}
