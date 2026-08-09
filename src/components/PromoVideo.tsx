"use client";
import React from "react";
import Image from "next/image";

export default function PromoVideo() {
  return (
    <section className="promo-video-section" id="promo-video" style={{ padding: '4rem 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: '2rem' }}>
          <span className="badge-neon mx-auto">EXPERIENCE THE ARENA</span>
          <h2>Stunning Architecture</h2>
        </div>
        
        <div className="video-container" style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '1000px', 
          margin: '0 auto', 
          borderRadius: '24px', 
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          aspectRatio: '1/1'
        }}>
          <Image
            src="/assets/images/building_elevation.jpg"
            alt="Kohinoor The Arena Stunning Building Elevation"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 1000px) 100vw, 1000px"
          />
        </div>
      </div>
    </section>
  );
}
