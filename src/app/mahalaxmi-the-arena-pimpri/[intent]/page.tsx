import MainLayout from "@/components/MainLayout";
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

type Props = { params: Promise<{ intent: string }> };

export async function generateStaticParams() { return []; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const intentStr = p.intent.replace(/-/g, ' ');
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  const ogTitle = encodeURIComponent(`Mahalaxmi The Arena Pimpri — ${intentStr}`);
  const ogSub   = encodeURIComponent('Luxury 2, 3 & 4 BHK | Pimpri, Pune');
  const ogUrl   = `${cfg.canonical}/api/og?title=${ogTitle}&sub=${ogSub}&brand=${encodeURIComponent(cfg.brand)}`;
  return {
    title: `Mahalaxmi The Arena Pimpri ${intentStr}`,
    description: `Mahalaxmi The Arena Pimpri ${intentStr}. Luxury residences in PCMC.`,
    alternates: { canonical: `${cfg.canonical}/mahalaxmi-the-arena-pimpri/${p.intent}` },
    openGraph: {
      title: `Mahalaxmi The Arena Pimpri — ${intentStr}`,
      description: `Mahalaxmi The Arena Pimpri ${intentStr}. Luxury residences in PCMC.`,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: `Mahalaxmi The Arena Pimpri ${intentStr}` }],
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Mahalaxmi The Arena Pimpri — ${intentStr}`,
      images: [ogUrl],
    },
  };
}
export const revalidate = 3600;

export default async function Page({ params }: Props) {
  const p = await params;
  const intentStr = p.intent.replace(/-/g, ' ');
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  const pageUrl = `${cfg.canonical}/mahalaxmi-the-arena-pimpri/${p.intent}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": cfg.canonical },
      { "@type": "ListItem", "position": 2, "name": cfg.brand, "item": `${cfg.canonical}/mahalaxmi-the-arena-pimpri` },
      { "@type": "ListItem", "position": 3, "name": intentStr.replace(/\b\w/g, c => c.toUpperCase()), "item": pageUrl }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MainLayout h1={`Mahalaxmi The Arena Pimpri ${intentStr}`} keyword={`mahalaxmi the arena pimpri ${intentStr}`} />
    </>
  );
}
