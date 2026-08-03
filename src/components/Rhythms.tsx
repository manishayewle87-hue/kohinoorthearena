"use client";
import React from 'react';

export default function Rhythms() {
  return (
    <section className="rhythms-section section-padding" id="rhythms">
      <div className="container">
        <div className="text-center">
          <span className="badge-purple">• FOR EVERY RHYTHM OF LIFE •</span>
          <h2 className="section-title">A SEAMLESS FLOW OF <span className="highlight-neon">LIVING & PLAY</span></h2>
          <p className="section-subtitle">How Mahalaxmi The ARENA fits into the daily life of every family member, inspired by our brochure stories.</p>
        </div>

        <div className="rhythms-grid">
          {/*  1. The Working Achiever  */}
          <div className="rhythm-card" data-reveal data-delay="1">
            <div className="rhythm-card-img-wrapper">
              <img src="assets/images/sports_club.jpg" alt="The Working Achiever" className="rhythm-card-img"/>
              <div className="rhythm-card-img-gradient"></div>
            </div>
            <div>
              <div className="rhythm-icon"><i className="ri-briefcase-4-line"></i></div>
              <h3>THE WORKING ACHIEVER</h3>
              <div className="tagline">Where movement fits in naturally, bringing energy back into every day.</div>
              <p className="desc">
                A life full of responsibility that calls for ease, access, and routine. After high-pressure days in Pune’s IT and industrial corridors, step into floodlit tennis courts or the premium recovery spa without leaving your gates.
              </p>
            </div>
            <div>
              <div style={{ fontSize: "0.78rem", color: "#94A3B8", textTransform: "uppercase", fontWeight: "700", marginBottom: "8px" }}>RECOMMENDED ROUTINE:</div>
              <div className="rhythm-tags">
                <span className="rhythm-tag">Floodlit Tennis</span>
                <span className="rhythm-tag">1,787 Sq.Ft. Gym</span>
                <span className="rhythm-tag">Steam & Sauna</span>
                <span className="rhythm-tag">Co-Working Lounge</span>
              </div>
            </div>
          </div>

          {/*  2. The Ambitious Parent  */}
          <div className="rhythm-card" data-reveal data-delay="2">
            <div className="rhythm-card-img-wrapper">
              <img src="assets/images/jogging_track.jpg" alt="The Ambitious Parent" className="rhythm-card-img"/>
              <div className="rhythm-card-img-gradient"></div>
            </div>
            <div>
              <div className="rhythm-icon"><i className="ri-parent-line"></i></div>
              <h3>THE AMBITIOUS PARENT</h3>
              <div className="tagline">Where learning, play, and development come together every day.</div>
              <p className="desc">
                A childhood shaped by confidence, activity, and all-round growth. Give your children a structured sports ecosystem with after-school coaching by national academies, early learning zones, and safe outdoor adventures.
              </p>
            </div>
            <div>
              <div style={{ fontSize: "0.78rem", color: "#94A3B8", textTransform: "uppercase", fontWeight: "700", marginBottom: "8px" }}>RECOMMENDED ROUTINE:</div>
              <div className="rhythm-tags">
                <span className="rhythm-tag">Football Turf</span>
                <span className="rhythm-tag">Early Learning (935 Sq.Ft.)</span>
                <span className="rhythm-tag">Kids Pool</span>
                <span className="rhythm-tag">Creche</span>
              </div>
            </div>
          </div>

          {/*  3. The Comeback Human  */}
          <div className="rhythm-card" data-reveal data-delay="3">
            <div className="rhythm-card-img-wrapper">
              <img src="assets/images/garden_pond.jpg" alt="The Comeback Human" className="rhythm-card-img"/>
              <div className="rhythm-card-img-gradient"></div>
            </div>
            <div>
              <div className="rhythm-icon"><i className="ri-heart-pulse-line"></i></div>
              <h3>THE COMEBACK HUMAN</h3>
              <div className="tagline">Where energy builds steadily, one day at a time.</div>
              <p className="desc">
                A return to movement with consistency, ease, and comfort. Whether recovering from an injury or restarting your fitness journey after years of desk work, our guided low-impact zones make starting simple.
              </p>
            </div>
            <div>
              <div style={{ fontSize: "0.78rem", color: "#94A3B8", textTransform: "uppercase", fontWeight: "700", marginBottom: "8px" }}>RECOMMENDED ROUTINE:</div>
              <div className="rhythm-tags">
                <span className="rhythm-tag">Shirin Yoku Forest Bathing</span>
                <span className="rhythm-tag">Heated Pool</span>
                <span className="rhythm-tag">Yoga Deck</span>
                <span className="rhythm-tag">Physio Room</span>
              </div>
            </div>
          </div>

          {/*  4. The Community Seeker  */}
          <div className="rhythm-card" data-reveal data-delay="4">
            <div className="rhythm-card-img-wrapper">
              <img src="assets/images/tree_house.jpg" alt="The Community Seeker" className="rhythm-card-img"/>
              <div className="rhythm-card-img-gradient"></div>
            </div>
            <div>
              <div className="rhythm-icon"><i className="ri-group-line"></i></div>
              <h3>THE COMMUNITY SEEKER</h3>
              <div className="tagline">Where everyday moments bring people together, naturally.</div>
              <p className="desc">
                A way of living where connections form through shared rhythm. Meet like-minded neighbors over weekend pickleball tournaments, evening coffee at the Ileseum Club lounge, or cultural celebrations at the Amphitheatre.
              </p>
            </div>
            <div>
              <div style={{ fontSize: "0.78rem", color: "#94A3B8", textTransform: "uppercase", fontWeight: "700", marginBottom: "8px" }}>RECOMMENDED ROUTINE:</div>
              <div className="rhythm-tags">
                <span className="rhythm-tag">Pickleball & Padel</span>
                <span className="rhythm-tag">Sports Bar & Cafe</span>
                <span className="rhythm-tag">Amphitheatre</span>
                <span className="rhythm-tag">Games Lounge</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
