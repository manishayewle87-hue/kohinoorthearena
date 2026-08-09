import React from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PromoVideo from "@/components/PromoVideo";
import Philosophy from "@/components/Philosophy";
import FloorPlans from "@/components/FloorPlans";
import Ecosystem from "@/components/Ecosystem";
import Masterplan from "@/components/Masterplan";
import Gallery from "@/components/Gallery";
import Residences from "@/components/Residences";
import Rhythms from "@/components/Rhythms";
import Connectivity from "@/components/Connectivity";
import Specifications from "@/components/Specifications";
import Calculator from "@/components/Calculator";
import Booking from "@/components/Booking";
import PopularSearches from "@/components/PopularSearches";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";

export default function MainLayout({ h1, keyword, children }: { h1?: string, keyword?: string, children?: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>
        <Hero h1={h1} keyword={keyword} />
        <PromoVideo />
        <Philosophy />
        <FloorPlans />
        <Ecosystem />
        <Masterplan />
        <Gallery />
        <Residences />
        <Rhythms />
        <Connectivity />
        <Specifications />
        <Calculator />
        <Booking />
        <FAQ />
        {children}
      </main>
      <PopularSearches />
      
      {/* Mobile Sticky Conversion Bar */}
      <div className="mobile-sticky-bar">
        <a href="https://wa.me/917711993434?text=Hi,%20I%20am%20interested%20in%20Mahalaxmi%20The%20Arena%20Pimpri." target="_blank" rel="noopener noreferrer" className="mobile-btn whatsapp-btn">
          <i className="ri-whatsapp-line"></i> WhatsApp
        </a>
        <button className="mobile-btn book-btn trigger-schedule" onClick={() => { const el = document.getElementById('booking'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>
          <i className="ri-calendar-check-line"></i> Book Visit
        </button>
      </div>

      <Footer />
    </>
  );
}
