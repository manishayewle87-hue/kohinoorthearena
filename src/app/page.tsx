import MainLayout from "@/components/MainLayout";
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  return {
    title: cfg.title,
    description: cfg.description,
    alternates: { canonical: cfg.canonical },
    openGraph: {
      title: cfg.title,
      description: cfg.description,
      url: cfg.canonical,
      siteName: `${cfg.arenaName} by ${cfg.brand}`,
      images: [{ url: cfg.ogImage, width: 1200, height: 630, alt: `${cfg.arenaName} by ${cfg.brand} — ${cfg.address.locality}, ${cfg.address.city}` }],
      type: 'website',
      locale: 'en_IN',
    },
  };
}

export const revalidate = 3600; // Edge Route Caching (1 Hour)

export default function Home() {
  return (
    <MainLayout 
      h1="Mahalaxmi The Arena - Kohinoor The Arena - Life in Motion Pimpri | Premium Real Estate PCMC, Pune. Buy flats in Pimpri Chinchwad. Kohinoor Pimpri real estate, Mahalaxmi real estate Pimpri, entire Pune real estate market dominance."
    />
  );
}
