"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function Connectivity() {
  const [activeTab, setActiveTab] = useState('edu');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.parentElement?.clientWidth || 500;
    const height = 540;

    const drawLocationMap = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0A0614";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(223, 254, 0, 0.4)";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(w * 0.1, h * 0.8);
      ctx.lineTo(w * 0.9, h * 0.2);
      ctx.stroke();

      ctx.strokeStyle = "#DFFE00";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(w * 0.1, h * 0.8);
      ctx.lineTo(w * 0.9, h * 0.2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = "rgba(0, 245, 212, 0.25)";
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(w * 0.05, h * 0.65);
      ctx.lineTo(w * 0.95, h * 0.35);
      ctx.stroke();

      const landmarks = [
        { name: "MAHALAXMI THE ARENA", x: w * 0.45, y: h * 0.48, type: "project", color: "#DFFE00" },
        { name: "PCMC Metro Station (2.4 km)", x: w * 0.38, y: h * 0.58, type: "metro", color: "#00F5D4" },
        { name: "Kohinoor World Towers (2.0 km)", x: w * 0.48, y: h * 0.38, type: "hub", color: "#9B5DE5" },
        { name: "Aditya Birla Hospital (4.1 km)", x: w * 0.3, y: h * 0.7, type: "hospital", color: "#F15BB5" },
        { name: "Podar International School (3.8 km)", x: w * 0.25, y: h * 0.35, type: "school", color: "#FFB703" },
        { name: "Hinjewadi IT Park (9.9 km)", x: w * 0.18, y: h * 0.85, type: "it", color: "#CBD5E1" },
        { name: "Pune Metro Line 1 Corridor", x: w * 0.75, y: h * 0.28, type: "label", color: "#DFFE00" }
      ];

      landmarks.forEach(lm => {
        ctx.save();
        const isProject = lm.type === 'project';
        const radius = isProject ? 16 : 9;

        if (isProject) {
          ctx.fillStyle = "rgba(223, 254, 0, 0.25)";
          ctx.beginPath();
          ctx.arc(lm.x, lm.y, 30, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = lm.color;
        ctx.beginPath();
        ctx.arc(lm.x, lm.y, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#0A0614";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = isProject ? "#DFFE00" : "#FFFFFF";
        ctx.font = isProject ? "bold 13px 'Outfit', sans-serif" : "bold 11px 'Plus Jakarta Sans', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(lm.name, lm.x, lm.y - radius - 8);
        ctx.restore();
      });
    };

    const handleResize = () => {
      width = canvas.parentElement?.clientWidth || 500;
      canvas.width = width;
      canvas.height = height;
      drawLocationMap(ctx, width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="location-section section-padding" id="connectivity">
      <div className="container">
        <div className="text-center">
          <span className="badge-neon">• STRATEGIC LOCATION •</span>
          <h2 className="section-title">PIMPRI, IN MOTION <span className="highlight-neon">WITH YOU</span></h2>
          <p className="section-subtitle">Located in the well-connected heart of Pimpri, PCMC. Easy access to Hinjewadi IT Park, top schools, hospitals, and the PCMC Metro Line 1, making it one of the best residential projects in Pimpri.</p>
        </div>

        <div className="location-grid">
          {/*  Left: Distance Category Filter & List  */}
          <div>
            <div className="location-cat-tabs">
              <button className={`loc-tab-btn ${activeTab === 'edu' ? 'active' : ''}`} onClick={() => setActiveTab('edu')}>EDUCATION</button>
              <button className={`loc-tab-btn ${activeTab === 'health' ? 'active' : ''}`} onClick={() => setActiveTab('health')}>HEALTHCARE</button>
              <button className={`loc-tab-btn ${activeTab === 'work' ? 'active' : ''}`} onClick={() => setActiveTab('work')}>WORKPLACES</button>
              <button className={`loc-tab-btn ${activeTab === 'transit' ? 'active' : ''}`} onClick={() => setActiveTab('transit')}>CONNECTIVITY</button>
            </div>

            {/*  Education List  */}
            {activeTab === 'edu' && (
            <div className="location-list-box location-category-list" id="loc-list-edu" style={{ animation: "fadeIn 0.3s ease" }}>
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
            )}

            {/*  Healthcare List  */}
            {activeTab === 'health' && (
            <div className="location-list-box location-category-list" id="loc-list-health" style={{ animation: "fadeIn 0.3s ease" }}>
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
            )}

            {/*  Workplaces List  */}
            {activeTab === 'work' && (
            <div className="location-list-box location-category-list" id="loc-list-work" style={{ animation: "fadeIn 0.3s ease" }}>
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
            )}

            {/*  Transit & Connectivity List  */}
            {activeTab === 'transit' && (
            <div className="location-list-box location-category-list" id="loc-list-transit" style={{ animation: "fadeIn 0.3s ease" }}>
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
            )}

            <div style={{ marginTop: "24px" }}>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn btn-glass" style={{ width: "100%" }}>
                <i className="ri-direction-line"></i> Open in Google Maps
              </a>
            </div>
          </div>

          {/*  Right: Interactive Pimpri Canvas Map  */}
          <div className="location-map-box">
            <canvas id="locationCanvas" ref={canvasRef}></canvas>
          </div>
        </div>
      </div>
    </section>
  );
}
