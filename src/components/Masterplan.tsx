"use client";
import React, { useState } from 'react';
import { MP_DATA } from '../data/masterplanData';

interface SpecItem {
  val: string;
  lab: string;
}

interface MasterplanItem {
  name: string;
  badge: string;
  badgeColor: string;
  sub: string;
  specs: SpecItem[];
  list: string[];
}

export default function Masterplan() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<MasterplanItem | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleZoneClick = (zoneId: string) => {
    const zone = MP_DATA.zones[zoneId as keyof typeof MP_DATA.zones];
    if (zone) {
      setSelectedItem(zone);
      setActiveId(zoneId);
    }
  };

  const handleTowerClick = (towerId: string) => {
    const tower = MP_DATA.towers[towerId as keyof typeof MP_DATA.towers];
    if (tower) {
      setSelectedItem(tower);
      setActiveId(towerId);
    }
  };

  const handleBack = () => {
    setSelectedItem(null);
    setActiveId(null);
  };
  
  return (
    <section className="masterplan-section section-padding" id="masterplan">
      <div className="container">
        <div className="text-center">
          <span className="badge-purple">• TOWNSHIP MASTER PLAN •</span>
          <h2 className="section-title">11 TOWERS. ONE LIVING<br /><span className="highlight-neon">ECOSYSTEM.</span></h2>
          <p className="section-subtitle">Explore Phase-1 premium wings and all towers — click any zone or tower to inspect details. 80,000 Sq. Ft. of life in motion at its centre.</p>
        </div>

        {/* Live Stats Ticker */}
        <div className="mp-ticker-wrap">
          <div className="mp-ticker-track">
            <span className="mp-tick"><i className="ri-building-4-line"></i> 11 High-Rise Towers</span>
            <span className="mp-tick"><i className="ri-run-line"></i> 80,000 Sq. Ft. Sports OS</span>
            <span className="mp-tick"><i className="ri-stack-line"></i> Up to 34 Floors</span>
            <span className="mp-tick"><i className="ri-trophy-line"></i> 30+ Integrated Amenities</span>
            <span className="mp-tick"><i className="ri-road-map-line"></i> 9M Fire Driveway Loop</span>
            <span className="mp-tick"><i className="ri-shield-user-line"></i> ILESEUM Sports Management</span>
            <span className="mp-tick"><i className="ri-home-4-line"></i> 2, 3 &amp; 4 BHK Residences</span>
            <span className="mp-tick"><i className="ri-water-flash-line"></i> Elevated Infinity Pool</span>
            <span className="mp-tick"><i className="ri-leaf-line"></i> Japanese Forest Bathing Temple</span>
            <span className="mp-tick"><i className="ri-vip-crown-line"></i> Smart Home Automation</span>
            <span className="mp-tick"><i className="ri-building-4-line"></i> 11 High-Rise Towers</span>
            <span className="mp-tick"><i className="ri-run-line"></i> 80,000 Sq. Ft. Sports OS</span>
            <span className="mp-tick"><i className="ri-stack-line"></i> Up to 34 Floors</span>
            <span className="mp-tick"><i className="ri-trophy-line"></i> 30+ Integrated Amenities</span>
            <span className="mp-tick"><i className="ri-road-map-line"></i> 9M Fire Driveway Loop</span>
          </div>
        </div>

        {/* MAIN MAP + PANEL */}
        <div className="mp-explorer">

          {/* LEFT: Interactive SVG Site Map */}
          <div className="mp-map-col">
            <div className="mp-map-header">
              <h4><i className="ri-map-2-line"></i> Interactive Site Plan</h4>
              <span className="mp-map-hint"><i className="ri-cursor-line"></i> Click any zone or tower</span>
            </div>
            <div className="mp-map-container">
              <svg className="mp-svg" viewBox="0 0 700 460" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
                    <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
                  </pattern>
                  <linearGradient id="sportsGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#DFFE00" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#DFFE00" stopOpacity="0.08"/>
                  </linearGradient>
                  <linearGradient id="clubGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00F5D4" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#00F5D4" stopOpacity="0.08"/>
                  </linearGradient>
                  <linearGradient id="zenGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F15BB5" stopOpacity="0.22"/>
                    <stop offset="100%" stopColor="#F15BB5" stopOpacity="0.07"/>
                  </linearGradient>
                </defs>
                <rect width="700" height="460" fill="url(#grid)"/>
                {/* Driveway */}
                <rect x="30" y="28" width="640" height="404" rx="28" fill="none" stroke="rgba(223,254,0,0.22)" strokeWidth="14" className="mp-driveway"/>
                <rect x="30" y="28" width="640" height="404" rx="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="10,8"/>
                <text x="350" y="18" textAnchor="middle" fill="rgba(223,254,0,0.45)" fontSize="9" fontFamily="Plus Jakarta Sans" letterSpacing="2">9M FIRE DRIVEWAY LOOP</text>
                
                {/* Sports Zone */}
                <rect onClick={() => handleZoneClick('sports')} x="52" y="148" width="190" height="188" rx="12" fill="url(#sportsGrad)" stroke="#DFFE00" strokeWidth="1.5" className={`mp-zone ${activeId === 'sports' ? 'selected' : ''}`} style={{ cursor: "pointer" }}/>
                <text x="147" y="228" textAnchor="middle" fill="#DFFE00" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" style={{ pointerEvents: "none" }}>80,000 SQ. FT.</text>
                <text x="147" y="244" textAnchor="middle" fill="rgba(223,254,0,0.65)" fontSize="9" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>SPORTS ARENA</text>
                <text x="147" y="260" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>FOOTBALL · TENNIS · PADEL</text>
                
                {/* Club Zone */}
                <rect onClick={() => handleZoneClick('club')} x="262" y="148" width="180" height="188" rx="12" fill="url(#clubGrad)" stroke="#00F5D4" strokeWidth="1.5" className={`mp-zone ${activeId === 'club' ? 'selected' : ''}`} style={{ cursor: "pointer" }}/>
                <text x="352" y="228" textAnchor="middle" fill="#00F5D4" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" style={{ pointerEvents: "none" }}>CLUB ILESEUM</text>
                <text x="352" y="244" textAnchor="middle" fill="rgba(0,245,212,0.65)" fontSize="9" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>INFINITY POOL · GYM</text>
                <text x="352" y="260" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>BADMINTON · SQUASH</text>
                
                {/* Zen Zone */}
                <rect onClick={() => handleZoneClick('zen')} x="462" y="148" width="188" height="188" rx="12" fill="url(#zenGrad)" stroke="#F15BB5" strokeWidth="1.5" className={`mp-zone ${activeId === 'zen' ? 'selected' : ''}`} style={{ cursor: "pointer" }}/>
                <text x="556" y="228" textAnchor="middle" fill="#F15BB5" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" style={{ pointerEvents: "none" }}>ZEN GARDENS</text>
                <text x="556" y="244" textAnchor="middle" fill="rgba(241,91,181,0.65)" fontSize="9" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>FOREST BATHING</text>
                <text x="556" y="260" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>TEMPLES · MEDITATION</text>
                
                {/* Tower A1 */}
                <rect onClick={() => handleTowerClick('A1')} x="52" y="52" width="76" height="82" rx="8" fill="rgba(91,66,143,0.85)" stroke="#D6BCFF" strokeWidth="1.5" className={`mp-tower ${activeId === 'A1' ? 'selected' : ''}`} style={{ cursor: "pointer" }}/>
                <rect x="53" y="53" width="44" height="13" rx="3" fill="#DFFE00" style={{ pointerEvents: "none" }}/>
                <text x="75" y="62" textAnchor="middle" fill="#000" fontSize="6.5" fontFamily="Plus Jakarta Sans" fontWeight="700" style={{ pointerEvents: "none" }}>PHASE 1</text>
                <text x="90" y="84" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" style={{ pointerEvents: "none" }}>A1</text>
                <text x="90" y="97" textAnchor="middle" fill="rgba(214,188,255,0.8)" fontSize="8" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>33F+ATTIC</text>
                <text x="90" y="108" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>3 &amp; 4 BHK</text>
                
                {/* Tower B1 */}
                <rect onClick={() => handleTowerClick('B1')} x="140" y="52" width="76" height="82" rx="8" fill="rgba(91,66,143,0.85)" stroke="#D6BCFF" strokeWidth="1.5" className={`mp-tower ${activeId === 'B1' ? 'selected' : ''}`} style={{ cursor: "pointer" }}/>
                <rect x="141" y="53" width="44" height="13" rx="3" fill="#DFFE00" style={{ pointerEvents: "none" }}/>
                <text x="163" y="62" textAnchor="middle" fill="#000" fontSize="6.5" fontFamily="Plus Jakarta Sans" fontWeight="700" style={{ pointerEvents: "none" }}>PHASE 1</text>
                <text x="178" y="84" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" style={{ pointerEvents: "none" }}>B1</text>
                <text x="178" y="97" textAnchor="middle" fill="rgba(214,188,255,0.8)" fontSize="8" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>33F+ATTIC</text>
                <text x="178" y="108" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>3 &amp; 4 BHK</text>
                
                {/* Tower A3 */}
                <rect onClick={() => handleTowerClick('A3')} x="242" y="52" width="76" height="82" rx="8" fill="rgba(155,93,229,0.65)" stroke="#9B5DE5" strokeWidth="1.5" className={`mp-tower ${activeId === 'A3' ? 'selected' : ''}`} style={{ cursor: "pointer" }}/>
                <text x="280" y="84" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" style={{ pointerEvents: "none" }}>A3</text>
                <text x="280" y="97" textAnchor="middle" fill="rgba(214,188,255,0.7)" fontSize="8" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>34 FLOORS</text>
                <text x="280" y="108" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>3 &amp; 4 BHK</text>
                
                {/* Tower B3 */}
                <rect onClick={() => handleTowerClick('B3')} x="332" y="52" width="76" height="82" rx="8" fill="rgba(155,93,229,0.65)" stroke="#9B5DE5" strokeWidth="1.5" className={`mp-tower ${activeId === 'B3' ? 'selected' : ''}`} style={{ cursor: "pointer" }}/>
                <text x="370" y="84" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" style={{ pointerEvents: "none" }}>B3</text>
                <text x="370" y="97" textAnchor="middle" fill="rgba(214,188,255,0.7)" fontSize="8" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>34 FLOORS</text>
                <text x="370" y="108" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>2-4 BHK</text>
                
                {/* Tower D2 */}
                <rect onClick={() => handleTowerClick('D2')} x="500" y="52" width="76" height="82" rx="8" fill="rgba(155,93,229,0.65)" stroke="#9B5DE5" strokeWidth="1.5" className={`mp-tower ${activeId === 'D2' ? 'selected' : ''}`} style={{ cursor: "pointer" }}/>
                <text x="538" y="84" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" style={{ pointerEvents: "none" }}>D2</text>
                <text x="538" y="97" textAnchor="middle" fill="rgba(214,188,255,0.7)" fontSize="8" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>34 FLOORS</text>
                <text x="538" y="108" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>1-3 BHK</text>
                
                {/* Tower D3 */}
                <rect onClick={() => handleTowerClick('D3')} x="590" y="52" width="76" height="82" rx="8" fill="rgba(155,93,229,0.65)" stroke="#9B5DE5" strokeWidth="1.5" className={`mp-tower ${activeId === 'D3' ? 'selected' : ''}`} style={{ cursor: "pointer" }}/>
                <text x="628" y="84" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" style={{ pointerEvents: "none" }}>D3</text>
                <text x="628" y="97" textAnchor="middle" fill="rgba(214,188,255,0.7)" fontSize="8" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>34 FLOORS</text>
                <text x="628" y="108" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>1-3 BHK</text>
                
                {/* Bottom towers */}
                <rect onClick={() => handleTowerClick('A2')} x="52" y="352" width="82" height="64" rx="8" fill="rgba(155,93,229,0.7)" stroke="#9B5DE5" strokeWidth="1.5" className={`mp-tower ${activeId === 'A2' ? 'selected' : ''}`} style={{ cursor: "pointer" }}/>
                <text x="93" y="377" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" style={{ pointerEvents: "none" }}>A2</text>
                <text x="93" y="390" textAnchor="middle" fill="rgba(214,188,255,0.7)" fontSize="8" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>34 FLOORS</text>
                <text x="93" y="403" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>2 &amp; 3 BHK</text>
                
                <rect onClick={() => handleTowerClick('B2')} x="148" y="352" width="82" height="64" rx="8" fill="rgba(155,93,229,0.7)" stroke="#9B5DE5" strokeWidth="1.5" className={`mp-tower ${activeId === 'B2' ? 'selected' : ''}`} style={{ cursor: "pointer" }}/>
                <text x="189" y="377" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" style={{ pointerEvents: "none" }}>B2</text>
                <text x="189" y="390" textAnchor="middle" fill="rgba(214,188,255,0.7)" fontSize="8" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>34 FLOORS</text>
                <text x="189" y="403" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>2 &amp; 3 BHK</text>
                
                <rect onClick={() => handleTowerClick('C1')} x="309" y="352" width="82" height="64" rx="8" fill="rgba(155,93,229,0.7)" stroke="#9B5DE5" strokeWidth="1.5" className={`mp-tower ${activeId === 'C1' ? 'selected' : ''}`} style={{ cursor: "pointer" }}/>
                <text x="350" y="377" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" style={{ pointerEvents: "none" }}>C1</text>
                <text x="350" y="390" textAnchor="middle" fill="rgba(214,188,255,0.7)" fontSize="8" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>34 FLOORS</text>
                <text x="350" y="403" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>2 &amp; 3 BHK</text>
                
                <rect onClick={() => handleTowerClick('C2')} x="406" y="352" width="82" height="64" rx="8" fill="rgba(155,93,229,0.7)" stroke="#9B5DE5" strokeWidth="1.5" className={`mp-tower ${activeId === 'C2' ? 'selected' : ''}`} style={{ cursor: "pointer" }}/>
                <text x="447" y="377" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" style={{ pointerEvents: "none" }}>C2</text>
                <text x="447" y="390" textAnchor="middle" fill="rgba(214,188,255,0.7)" fontSize="8" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>34 FLOORS</text>
                <text x="447" y="403" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>2 &amp; 3 BHK</text>
                
                <rect onClick={() => handleTowerClick('D1')} x="568" y="352" width="82" height="64" rx="8" fill="rgba(155,93,229,0.7)" stroke="#9B5DE5" strokeWidth="1.5" className={`mp-tower ${activeId === 'D1' ? 'selected' : ''}`} style={{ cursor: "pointer" }}/>
                <text x="609" y="377" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" style={{ pointerEvents: "none" }}>D1</text>
                <text x="609" y="390" textAnchor="middle" fill="rgba(214,188,255,0.7)" fontSize="8" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>34 FLOORS</text>
                <text x="609" y="403" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Plus Jakarta Sans" style={{ pointerEvents: "none" }}>1-3 BHK</text>
                
                {/* North indicator */}
                <circle cx="670" cy="430" r="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                <polygon points="670,416 667,423 673,423" fill="#DFFE00"/>
                <text x="670" y="434" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="Plus Jakarta Sans">N</text>
              </svg>
            </div>
            {/* Legend */}
            <div className="mp-legend">
              <div className="mp-legend-item"><span className="mp-leg-dot" style={{ background: "#DFFE00" }}></span>Sports Arena</div>
              <div className="mp-legend-item"><span className="mp-leg-dot" style={{ background: "#00F5D4" }}></span>Club ILESEUM</div>
              <div className="mp-legend-item"><span className="mp-leg-dot" style={{ background: "#F15BB5" }}></span>Zen Gardens</div>
              <div className="mp-legend-item"><span className="mp-leg-dot" style={{ background: "#D6BCFF" }}></span>Phase 1 Towers</div>
              <div className="mp-legend-item"><span className="mp-leg-dot" style={{ background: "#9B5DE5" }}></span>All Towers</div>
            </div>
          </div>

          {/* RIGHT: Info Panel */}
          <div className="mp-info-panel" id="mpInfoPanel">
            {!selectedItem ? (
              <div className="mp-panel-default" id="mpPanelDefault">
                <div className="mp-panel-icon"><i className="ri-cursor-line"></i></div>
                <h4>Select a Zone or Tower</h4>
                <p>Click on any highlighted zone or tower on the site plan to explore specifications and configurations.</p>
                <div className="mp-quick-grid">
                  <div className="mp-quick-stat"><span className="mp-qs-val">11</span><span className="mp-qs-lab">Towers</span></div>
                  <div className="mp-quick-stat"><span className="mp-qs-val">34</span><span className="mp-qs-lab">Max Floors</span></div>
                  <div className="mp-quick-stat"><span className="mp-qs-val">80K</span><span className="mp-qs-lab">Sq. Ft.</span></div>
                  <div className="mp-quick-stat"><span className="mp-qs-val">30+</span><span className="mp-qs-lab">Amenities</span></div>
                </div>
                <button className="btn btn-neon trigger-schedule" style={{ width: "100%", marginTop: "20px", justifyContent: "center" }}>
                  <i className="ri-vip-crown-line"></i> Book a Site Visit
                </button>
              </div>
            ) : (
              <div className="mp-panel-detail" id="mpPanelDetail" style={{ display: "flex" }}>
                <button className="mp-panel-back" onClick={handleBack}><i className="ri-arrow-left-line"></i> Back</button>
                <div className="mp-detail-badge" style={{ background: selectedItem.badgeColor + '22', color: selectedItem.badgeColor, border: `1px solid ${selectedItem.badgeColor}55` }}>
                  {selectedItem.badge}
                </div>
                <h3 className="mp-detail-title">{selectedItem.name}</h3>
                <p className="mp-detail-sub">{selectedItem.sub}</p>
                <div className="mp-detail-specs">
                  {selectedItem.specs.map((s, idx: number) => (
                    <div className="mp-spec-item" key={idx}>
                      <span className="mp-spec-val">{s.val}</span>
                      <span className="mp-spec-lab">{s.lab}</span>
                    </div>
                  ))}
                </div>
                <ul className="mp-detail-list">
                  {selectedItem.list.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <button className="btn btn-neon trigger-schedule" style={{ width: "100%", marginTop: "20px", justifyContent: "center" }}>
                  <i className="ri-calendar-event-line"></i> Enquire Now
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mp-stats-bar">
          <div className="mp-stat-pill"><i className="ri-building-4-line"></i><div><span className="mp-stat-num">11</span><span>Towers</span></div></div>
          <div className="mp-stat-pill"><i className="ri-stack-line"></i><div><span className="mp-stat-num">34</span><span>Max Floors</span></div></div>
          <div className="mp-stat-pill"><i className="ri-run-line"></i><div><span>80,000</span><span>Sq. Ft. Sports</span></div></div>
          <div className="mp-stat-pill"><i className="ri-trophy-line"></i><div><span className="mp-stat-num">30+</span><span>Amenities</span></div></div>
          <div className="mp-stat-pill"><i className="ri-map-pin-2-line"></i><div><span>2.4 km</span><span>To Metro</span></div></div>
          <div className="mp-stat-pill"><i className="ri-shield-user-line"></i><div><span>ILESEUM</span><span>Sports Ops</span></div></div>
        </div>

        {/* Amenities */}
        <div className="mp-amenities-section">
          <div className="mp-amenities-header">
            <h3>30+ World-Class <span className="highlight-neon">Amenities</span></h3>
            <div className="masterplan-controls">
              <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}><i className="ri-apps-line"></i> All</button>
              <button className={`filter-btn ${activeFilter === 'sports' ? 'active' : ''}`} onClick={() => setActiveFilter('sports')}><i className="ri-football-line"></i> Outdoor</button>
              <button className={`filter-btn ${activeFilter === 'indoor' ? 'active' : ''}`} onClick={() => setActiveFilter('indoor')}><i className="ri-trophy-line"></i> Indoor</button>
              <button className={`filter-btn ${activeFilter === 'wellness' ? 'active' : ''}`} onClick={() => setActiveFilter('wellness')}><i className="ri-water-flash-line"></i> Wellness</button>
              <button className={`filter-btn ${activeFilter === 'spiritual' ? 'active' : ''}`} onClick={() => setActiveFilter('spiritual')}><i className="ri-leaf-line"></i> Sanctuary</button>
            </div>
          </div>
          <div className="amenities-grid">
            { (activeFilter === 'all' || activeFilter === 'sports') && <div className="amenity-category-card" data-category="sports">
              <div className="cat-header">
                <div className="cat-icon"><i className="ri-football-line"></i></div>
                <div><h4>Outdoor Sports &amp; Courts</h4><p>Floodlit Professional Arenas</p></div>
                <span className="cat-count">6</span>
              </div>
              <ul className="cat-items">
                <li><i className="ri-checkbox-circle-line"></i><span>FIFA-Grade Football Turf (10,000 × 20,000 mm)</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>Dual Championship Tennis Courts</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>International Padel Court with Glass Walls</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>Pickleball Court with Cafe &amp; Restrooms</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>Open-Air Multi-Sport &amp; Basketball Courts</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>Jogging &amp; Sprint Track along 9M Driveway</span></li>
              </ul></div> }
            { (activeFilter === 'all' || activeFilter === 'indoor') && <div className="amenity-category-card" data-category="indoor">
              <div className="cat-header">
                <div className="cat-icon"><i className="ri-trophy-line"></i></div>
                <div><h4>Club ILESEUM Indoor</h4><p>Climate-Controlled Sports Hub</p></div>
                <span className="cat-count">8</span>
              </div>
              <ul className="cat-items">
                <li><i className="ri-checkbox-circle-line"></i><span>1,787 Sq. Ft. Expansive Gym &amp; Cardio Floor</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>Indoor Racquet Courts (Badminton / Squash)</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>1,280 Sq. Ft. Indoor Games Lounge</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>592 Sq. Ft. Acoustic Mini Theatre</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>807 Sq. Ft. Co-Working &amp; Wi-Fi Lounge</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>935 Sq. Ft. Creche &amp; Early Learning Centre</span></li>
              </ul></div> }
            { (activeFilter === 'all' || activeFilter === 'wellness') && <div className="amenity-category-card" data-category="wellness">
              <div className="cat-header">
                <div className="cat-icon"><i className="ri-water-flash-line"></i></div>
                <div><h4>Pauses of Indulgence</h4><p>Between Motion Lies Luxury</p></div>
                <span className="cat-count">7</span>
              </div>
              <ul className="cat-items">
                <li><i className="ri-checkbox-circle-line"></i><span>Elevated Infinity Swimming Pool with Deck</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>Dedicated Safe Kids Pool &amp; Splash Zone</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>Heated Jacuzzi &amp; Wet Leisure Sunken Deck</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>Steam, Sauna &amp; Athletic Recovery Zones</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>Premium Sports Bar &amp; Architectural Cafe</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>Two Luxury Designer Guest Suites</span></li>
              </ul></div> }
            { (activeFilter === 'all' || activeFilter === 'spiritual') && <div className="amenity-category-card" data-category="spiritual">
              <div className="cat-header">
                <div className="cat-icon"><i className="ri-leaf-line"></i></div>
                <div><h4>Spiritual &amp; Nature</h4><p>Zen Sanctuaries &amp; Temples</p></div>
                <span className="cat-count">6</span>
              </div>
              <ul className="cat-items">
                <li><i className="ri-checkbox-circle-line"></i><span>Shirin Yoku — Japanese Forest Bathing Temple</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>Sacred Jain Temple with Serene Courtyard</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>Ganesh Temple &amp; Meditation Grove</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>Butterfly Garden, Mist Garden &amp; Hammock Deck</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>Natural Water Retention Pond &amp; Tree Grove</span></li>
                <li><i className="ri-checkbox-circle-line"></i><span>Amphitheatre, Tree House &amp; Lawn</span></li>
              </ul></div> }
          </div>
        </div>

      </div>
    </section>
  );
}
