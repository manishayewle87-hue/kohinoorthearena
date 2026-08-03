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
  title: "Mahalaxmi The Arena | 80,000 Sq.Ft. Sports Township in Pimpri",
  description: "Mahalaxmi The Arena by Mahalaxmi Group. Experience premium 2, 3 & 4 BHK residences in Pune's finest active ecosystem.",
  keywords: [
    "Mahalaxmi The Arena",
    "Mahalaxmi Group Pimpri",
    "Mahalaxmi Group Pune",
    "Mahalaxmi The Arena PCMC",
    "Mahalaxmi The Arena floor plan",
    "Buy flat in Mahalaxmi The Arena",
    "Pune real estate"
  ],
  alternates: {
    canonical: "https://kohinoorthearena.vercel.app/mahalaxmi-the-arena",
  },
  openGraph: {
    title: "Mahalaxmi The Arena | Premium Real Estate PCMC",
    description: "Mahalaxmi Group's flagship sports township in Pimpri.",
    url: "https://kohinoorthearena.vercel.app/mahalaxmi-the-arena",
  }
};

export default function MahalaxmiSilo() {
  return (
    <>
      <Navbar />
      <main>
        <h1 style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}>
          Mahalaxmi The Arena - Luxury Flats & Sports Township by Mahalaxmi Group in Pimpri, Pune
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
