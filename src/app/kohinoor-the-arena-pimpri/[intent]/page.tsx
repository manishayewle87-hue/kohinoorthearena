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
  return {
    title: `Kohinoor The Arena Pimpri ${intentStr}`,
    description: `Kohinoor The Arena Pimpri ${intentStr}. Discover luxury living in PCMC.`,
    alternates: { canonical: `${cfg.canonical}/kohinoor-the-arena-pimpri/${p.intent}` },
  };
}
export const revalidate = 3600;

export default async function Page({ params }: Props) {
  const p = await params;
  const intentStr = p.intent.replace(/-/g, ' ');
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  const pageUrl = `${cfg.canonical}/kohinoor-the-arena-pimpri/${p.intent}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": cfg.canonical },
      { "@type": "ListItem", "position": 2, "name": cfg.brand, "item": `${cfg.canonical}/kohinoor-the-arena-pimpri` },
      { "@type": "ListItem", "position": 3, "name": intentStr.replace(/\b\w/g, c => c.toUpperCase()), "item": pageUrl }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MainLayout h1={`Kohinoor The Arena Pimpri ${intentStr}`} keyword={`kohinoor the arena pimpri ${intentStr}`} />
    </>
  );
}
