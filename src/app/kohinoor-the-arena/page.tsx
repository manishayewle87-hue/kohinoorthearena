import { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: "Kohinoor The Arena | Premium Flats in Pimpri Chinchwad",
  description: "Kohinoor The Arena offers luxury 2, 3 & 4 BHK residences in PCMC. A flagship sports township project in Pimpri by Kohinoor Group.",
  keywords: [
    "Kohinoor The Arena",
    "Kohinoor Group Pimpri",
    "Kohinoor Arena PCMC",
    "Kohinoor Pimpri real estate",
    "Pune real estate market",
    "Pimpri Chinchwad real estate",
    "Buy flat in Kohinoor The Arena",
    "Kohinoor The Arena price",
    "Luxury flats in Pimpri",
    "PCMC real estate"
  ],
  alternates: {
    canonical: "https://kohinoorthearena.vercel.app/kohinoor-the-arena",
  },
  openGraph: {
    title: "Kohinoor The Arena | Premium Real Estate PCMC",
    description: "Kohinoor Group's flagship sports township in Pimpri.",
    url: "https://kohinoorthearena.vercel.app/kohinoor-the-arena",
  }
};

export const revalidate = 3600; // Edge Route Caching (1 Hour)

export default function KohinoorSilo() {
  return (
    <>
      <Navbar />
      <main>
        <h1 style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}>
          Kohinoor The Arena - Premium Real Estate & Luxury Flats in Pimpri, PCMC. Kohinoor Pimpri real estate, top property in Pune real estate market.
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
