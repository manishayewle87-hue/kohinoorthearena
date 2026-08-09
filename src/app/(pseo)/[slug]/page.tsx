import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPSEOPageData } from '@/lib/pseo-data';
import MainLayout from '@/components/MainLayout';
import Link from 'next/link';

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

  const locSlug = p.slug.split('-').pop() || 'pimpri';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainLayout h1={data.h1} keyword={data.keyword}>
        <section style={{ padding: '4rem 0', background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--neon-lime)' }}>Explore More in {data.location}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <a href={`/premium-2-bhk-flats-${locSlug}`} className="btn btn-glass" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Premium 2 BHK in {data.location}</a>
              <a href={`/luxury-3-bhk-flats-${locSlug}`} className="btn btn-glass" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Luxury 3 BHK in {data.location}</a>
              <a href={`/best-real-estate-${locSlug}`} className="btn btn-glass" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Best Real Estate in {data.location}</a>
              <a href={`/new-projects-${locSlug}`} className="btn btn-glass" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>New Projects in {data.location}</a>
              <a href={`/investment-property-${locSlug}`} className="btn btn-glass" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Investment Property in {data.location}</a>
            </div>
            
            {/* SEO Breadcrumbs */}
            <div style={{ marginTop: '3rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
               <Link href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Home</Link> &gt; <Link href={cfg.primarySlug} style={{ color: 'rgba(255,255,255,0.6)' }}>{cfg.arenaName}</Link> &gt; <span>{data.h1}</span>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
