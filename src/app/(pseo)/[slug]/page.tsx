import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generatePSEOMatrix, getPSEOPageData } from '@/lib/pseo-data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloorPlans from '@/components/FloorPlans';
import MainLayout from '@/components/MainLayout';
import Modals from '@/components/Modals';
import GlobalScripts from '@/components/GlobalScripts';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600; // Edge Route Caching (1 Hour)

export async function generateStaticParams() {
  // We have 1700+ permutations. Generating them all at build time takes too long on Vercel.
  // Returning an empty array combined with default dynamicParams = true means 
  // these pages will be statically generated ON-DEMAND when first requested (ISR).
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const data = getPSEOPageData(p.slug);
  
  if (!data) {
    return { title: 'Page Not Found' };
  }

  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  const pageUrl = `${cfg.canonical}/${p.slug}`;

  return {
    title: data.title,
    description: data.description,
    keywords: [
      data.keyword,
      `Buy ${data.bhk} in ${data.location}`,
      `${cfg.arenaName} ${data.location}`,
      `${cfg.brand} ${data.location}`,
      `${cfg.arenaName} ${data.bhk}`,
      `${cfg.brand} ${cfg.arenaName}`,
    ],
    authors: [{ name: cfg.brand }, { name: cfg.coDevName }],
    creator: cfg.brand,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: pageUrl,
      type: "website",
      siteName: `${cfg.arenaName} by ${cfg.brand}`,
      images: [{ url: `${cfg.canonical}/assets/images/hero.jpg`, width: 1200, height: 630, alt: `${data.h1} — ${cfg.arenaName} by ${cfg.brand}, ${cfg.address.locality}, ${cfg.address.city}` }],
    }
  };
}

export default async function PSEOPage({ params }: Props) {
  const p = await params;
  const data = getPSEOPageData(p.slug);
  
  if (!data) {
    notFound();
  }

  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  const pageUrl = `${cfg.canonical}/${p.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": data.h1,
      "description": data.description,
      "image": `${cfg.canonical}/assets/images/hero.jpg`,
      "brand": {
        "@type": "Brand",
        "name": cfg.brand
      },
      "offers": {
        "@type": "Offer",
        "url": pageUrl,
        "priceCurrency": "INR",
        "price": data.price.includes('Cr') ? parseFloat(data.price) * 10000000 : parseFloat(data.price) * 100000,
        "availability": "https://schema.org/PreOrder"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": cfg.canonical },
        { "@type": "ListItem", "position": 2, "name": cfg.arenaName, "item": `${cfg.canonical}${cfg.primarySlug}` },
        { "@type": "ListItem", "position": 3, "name": data.h1, "item": pageUrl },
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": cfg.brand,
      "url": cfg.canonical,
      "description": `${cfg.brand} — Developer of ${cfg.arenaName}. ${data.bhk} luxury residences in ${data.location}, Pune.`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": cfg.address.street,
        "addressLocality": cfg.address.locality,
        "addressRegion": cfg.address.region,
        "postalCode": cfg.address.postalCode,
        "addressCountry": cfg.address.country
      }
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainLayout h1={data.h1} keyword={data.keyword} />
    </>
  );
}
