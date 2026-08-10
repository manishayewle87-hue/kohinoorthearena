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

export default async function Home() {
  const headersList = await headers();
  const intent = headersList.get('x-arena-intent');
  
  let h1 = "Mahalaxmi The Arena - Kohinoor The Arena - Life in Motion Pimpri | Premium Real Estate PCMC, Pune.";
  let keyword = "MAHALAXMI THE ARENA • LIFE IN MOTION PIMPRI";
  
  if (intent) {
    const formattedIntent = intent.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    h1 = `${formattedIntent} at Mahalaxmi The Arena Pimpri`;
    keyword = `CUSTOMIZED RESULTS FOR: ${formattedIntent.toUpperCase()}`;
  }

  return (
    <MainLayout h1={h1} keyword={keyword} />
  );
}
