import React from 'react';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';
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

export default async function MainLayout({ h1, keyword, children }: { h1?: string, keyword?: string, children?: React.ReactNode }) {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);

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
        <a href={`https://wa.me/${cfg.contactPhone.replace(/\D/g, '')}?text=Hi,%20I%20am%20interested%20in%20${encodeURIComponent(cfg.arenaName)}%20Pimpri.`} target="_blank" rel="noopener noreferrer" className="mobile-btn whatsapp-btn">
          <i className="ri-whatsapp-line"></i> WhatsApp
        </a>
        <a href="#booking" className="mobile-btn book-btn trigger-schedule">
          <i className="ri-calendar-check-line"></i> Book Visit
        </a>
      </div>

      <Footer
        mahaRera={cfg.mahaRera}
        primarySlug={cfg.primarySlug}
        coDevSlug={cfg.primarySlug === '/kohinoor-the-arena-pimpri'
          ? '/mahalaxmi-the-arena-pimpri'
          : '/kohinoor-the-arena-pimpri'}
        projectName={cfg.projectName}
      />
    </>
  );
}
