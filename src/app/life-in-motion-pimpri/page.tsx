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
  title: "Life in Motion Pimpri | The Ultimate Sports Township",
  description: "Life in Motion is an 80,000 Sq.Ft. sports township in Pimpri Chinchwad. Premium residences managed by Ileseum Sports.",
  keywords: [
    "Life in Motion Pimpri",
    "Life in Motion Pune",
    "Life in Motion Codename",
    "Sports township PCMC",
    "Ileseum Sports Pimpri",
    "Flats near PCMC Metro",
    "Active ecosystem Pune"
  ],
  alternates: {
    canonical: "https://kohinoorthearena.vercel.app/life-in-motion-pimpri",
  },
  openGraph: {
    title: "Life in Motion Pimpri | Ultimate Sports Township",
    description: "Pune's finest active ecosystem and premium residences.",
    url: "https://kohinoorthearena.vercel.app/life-in-motion-pimpri",
  }
};

export default function LifeInMotionSilo() {
  return (
    <>
      <Navbar />
      <main>
        <h1 style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}>
          Life in Motion Pimpri - The Ultimate Active Ecosystem & Sports Township in Pune
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
