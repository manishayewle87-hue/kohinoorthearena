import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Ecosystem from "@/components/Ecosystem";
import Masterplan from "@/components/Masterplan";
import Gallery from "@/components/Gallery";
import Residences from "@/components/Residences";
import Rhythms from "@/components/Rhythms";
import Connectivity from "@/components/Connectivity";
import Specifications from "@/components/Specifications";
import Calculator from "@/components/Calculator";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Modals from "@/components/Modals";

export const revalidate = 3600; // Edge Route Caching (1 Hour)

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <h1 style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}>
          Mahalaxmi The Arena - Kohinoor The Arena - Life in Motion Pimpri | Premium Real Estate PCMC, Pune. Buy flats in Pimpri Chinchwad. Kohinoor Pimpri real estate, Mahalaxmi real estate Pimpri, entire Pune real estate market dominance.
        </h1>
        <Hero />
        <Philosophy />
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
      <Footer />
    </>
  );
}
