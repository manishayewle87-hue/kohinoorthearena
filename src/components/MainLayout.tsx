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

export default function MainLayout({ h1, keyword }: { h1?: string, keyword?: string }) {
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
      </main>
      <PopularSearches />
      <Footer />
    </>
  );
}
