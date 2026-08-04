"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAppContext, Currency } from "@/context/AppContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { currency, setCurrency, shortlist, setShortlistDrawerOpen } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  // Smooth-scroll helper — avoids bare # href fragments in the URL
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToAndClose = (id: string) => {
    scrollTo(id);
    closeDrawer();
  };

  return (
    <>
      <header className={`navbar ${isScrolled ? "scrolled" : ""}`} id="navbar">
        <div className="container navbar-container">
          <a href="/" className="brand-cluster" aria-label="The Arena Home">
            <div className="jv-partners">
              <Image
                src="/assets/images/mahalaxmi-logo.svg"
                alt="Mahalaxmi Group"
                width={150}
                height={40}
                className="partner-img"
              />
              <div className="jv-divider"></div>
              <Image
                src="/assets/images/kohinoor-logo.svg"
                alt="Kohinoor Group"
                width={150}
                height={40}
                className="partner-img"
              />
            </div>
            <div className="logo-wrapper">
              <div className="logo-icon">
                <i className="ri-run-line"></i>
              </div>
              <div className="logo-text">
                <div className="logo-title">
                  THE <span>ARENA</span>
                </div>
                <div className="logo-subtitle">PIMPRI&apos;S SPORTS TOWNSHIP</div>
              </div>
            </div>
          </a>

          <nav className="nav-links" id="navLinks">
            <ul>
              <li className="nav-item">
                <button className="nav-anchor-btn" onClick={() => scrollTo('philosophy')}>Vision</button>
              </li>
              <li className="nav-item">
                <button className="nav-anchor-btn" onClick={() => scrollTo('operating-system')}>Ecosystem</button>
              </li>
              <li className="nav-item">
                <button className="nav-anchor-btn" onClick={() => scrollTo('masterplan')}>Masterplan</button>
              </li>
              <li className="nav-item">
                <button className="nav-anchor-btn" onClick={() => scrollTo('gallery')}>Sanctuaries</button>
              </li>
              <li className="nav-item">
                <button className="nav-anchor-btn" onClick={() => scrollTo('residences')}>Residences</button>
              </li>
              <li className="nav-item">
                <button className="nav-anchor-btn" onClick={() => scrollTo('rhythms')}>Rhythms</button>
              </li>
              <li className="nav-item">
                <button className="nav-anchor-btn" onClick={() => scrollTo('connectivity')}>Connectivity</button>
              </li>
              <li className="nav-item">
                <button className="nav-anchor-btn" onClick={() => scrollTo('specifications')}>Specs</button>
              </li>
              <li className="nav-item">
                <button className="nav-anchor-btn" onClick={() => scrollTo('calculator')}>Investment</button>
              </li>
            </ul>
          </nav>

          <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* NRI Currency Toggle */}
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value as Currency)}
              style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', outline: 'none' }}
            >
              <option value="INR" style={{ color: '#000' }}>₹ INR</option>
              <option value="USD" style={{ color: '#000' }}>$ USD</option>
              <option value="AED" style={{ color: '#000' }}>د.إ AED</option>
            </select>

            {/* Shortlist Trigger */}
            <button 
              onClick={() => setShortlistDrawerOpen(true)}
              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', position: 'relative' }}
              aria-label="View Shortlist"
            >
              <i className="ri-heart-3-line"></i>
              {shortlist.length > 0 && (
                <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--neon-lime)', color: '#000', fontSize: '0.6rem', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {shortlist.length}
                </span>
              )}
            </button>

            <button 
              className="btn btn-neon trigger-schedule hidden-mobile" 
              title="Schedule a VIP Site Visit in Pimpri" 
              aria-label="Book a VIP Site Visit to Mahalaxmi The Arena"
            >
              <i className="ri-vip-crown-line"></i> <span>VIP Site Visit</span>
            </button>
            <button
              className="mobile-toggle"
              id="mobileToggle"
              aria-label="Toggle Navigation"
              onClick={toggleDrawer}
            >
              <i className="ri-menu-3-line"></i>
            </button>
          </div>
        </div>
      </header>

      {/* ==================== MOBILE DRAWER ==================== */}
      <div
        className={`mobile-drawer-backdrop ${isDrawerOpen ? "active" : ""}`}
        id="drawerBackdrop"
        onClick={closeDrawer}
      ></div>
      <nav
        className={`mobile-drawer ${isDrawerOpen ? "active" : ""}`}
        id="mobileDrawer"
        aria-label="Mobile Navigation"
      >
        <button
          className="drawer-close-btn"
          id="drawerCloseBtn"
          aria-label="Close Navigation"
          onClick={closeDrawer}
        >
          <i className="ri-close-line"></i>
        </button>
        <div className="drawer-brand">
          <div className="drawer-brand-icon">
            <i className="ri-run-line"></i>
          </div>
          <div className="drawer-brand-name">
            MAHALAXMI <span>THE ARENA</span>
          </div>
        </div>
        <button className="drawer-nav-link" onClick={() => scrollToAndClose('philosophy')}>
          <i className="ri-lightbulb-flash-line"></i> Philosophy
        </button>
        <button className="drawer-nav-link" onClick={() => scrollToAndClose('operating-system')}>
          <i className="ri-run-line"></i> 80k Sq.Ft. OS
        </button>
        <button className="drawer-nav-link" onClick={() => scrollToAndClose('masterplan')}>
          <i className="ri-building-4-line"></i> 11 Towers &amp; Map
        </button>
        <button className="drawer-nav-link" onClick={() => scrollToAndClose('gallery')}>
          <i className="ri-image-2-line"></i> Sanctuaries
        </button>
        <button className="drawer-nav-link" onClick={() => scrollToAndClose('residences')}>
          <i className="ri-home-4-line"></i> Residences
        </button>
        <button className="drawer-nav-link" onClick={() => scrollToAndClose('rhythms')}>
          <i className="ri-user-heart-line"></i> 4 Rhythms
        </button>
        <button className="drawer-nav-link" onClick={() => scrollToAndClose('connectivity')}>
          <i className="ri-map-pin-line"></i> Pimpri Map
        </button>
        <button className="drawer-nav-link" onClick={() => scrollToAndClose('specifications')}>
          <i className="ri-list-check-2"></i> Specs
        </button>
        <button className="drawer-nav-link" onClick={() => scrollToAndClose('calculator')}>
          <i className="ri-calculator-line"></i> ROI Calc
        </button>
        <div className="drawer-footer">
          <button
            className="btn btn-neon trigger-schedule"
            style={{ width: "100%", justifyContent: "center" }}
          >
            <i className="ri-vip-crown-line"></i> VIP Site Visit
          </button>
          <button
            className="btn btn-glass trigger-brochure"
            style={{ width: "100%", justifyContent: "center" }}
          >
            <i className="ri-download-cloud-2-line"></i> Download Brochure
          </button>
        </div>
      </nav>
    </>
  );
}
