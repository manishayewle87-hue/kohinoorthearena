"use client";
import React, { useRef, useState, useEffect } from "react";

export default function PromoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Attempt autoplay
    if (videoRef.current) {
      videoRef.current.play().catch(e => {
        console.log("Autoplay blocked by browser", e);
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="promo-video-section" id="promo-video" style={{ padding: '4rem 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: '2rem' }}>
          <span className="badge-neon mx-auto">EXPERIENCE THE ARENA</span>
          <h2>The Ultimate Sports Township</h2>
        </div>
        
        <div className="video-container" style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '1000px', 
          margin: '0 auto', 
          borderRadius: '24px', 
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <video
            ref={videoRef}
            src="/assets/videos/promo.mp4"
            loop
            muted
            playsInline
            style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
            aria-label="Kohinoor The Arena Promotional Video"
          />
          
          <button 
            className="video-play-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--neon-lime)',
              color: 'var(--neon-lime)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.3s ease'
            }}
          >
            <i className={isPlaying ? "ri-pause-line" : "ri-play-fill"} style={{ fontSize: '1.5rem' }}></i>
          </button>
        </div>
      </div>
    </section>
  );
}
