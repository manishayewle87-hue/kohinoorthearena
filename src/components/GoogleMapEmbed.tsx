"use client";
import React from 'react';

export default function GoogleMapEmbed() {
  const lat = 18.6278;
  const lng = 73.7997;
  const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;

  return (
    <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', marginTop: '2rem' }}>
      <div style={{ display: 'flex', gap: '1rem', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.05)', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neon-lime)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          <i className="ri-map-pin-2-fill"></i>
          The Arena, Sports Township, Pimpri, Pune — 411018
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-neon"
            style={{ fontSize: '0.75rem', padding: '0.4rem 1rem' }}
            aria-label="Get directions to The Arena on Google Maps"
          >
            <i className="ri-navigation-fill"></i> Get Directions
          </a>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-glass"
            style={{ fontSize: '0.75rem', padding: '0.4rem 1rem' }}
            aria-label="View The Arena on Google Maps"
          >
            <i className="ri-map-2-line"></i> View on Maps
          </a>
        </div>
      </div>
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.0!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM3JzQwLjEiTiA3M8KwNDcnNTAuOSJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin`}
        width="100%"
        height="400"
        style={{ border: 0, display: 'block' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="The Arena Location — Pimpri, Pune"
        aria-label="Google Maps showing The Arena location in Pimpri, Pune"
      />
    </div>
  );
}
