import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generatePSEOMatrix, getPSEOPageData } from '@/lib/pseo-data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloorPlans from '@/components/FloorPlans';
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
  const matrix = generatePSEOMatrix();
  return matrix.map((page) => ({
    slug: page.slug,
  }));
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
  const pageUrl = `${cfg.canonical}/flats-in-pune/${p.slug}`;

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
  const pageUrl = `${cfg.canonical}/flats-in-pune/${p.slug}`;

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
        { "@type": "ListItem", "position": 3, "name": "Flats in Pune", "item": `${cfg.canonical}/flats-in-pune` },
        { "@type": "ListItem", "position": 4, "name": data.h1, "item": pageUrl },
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
      <Navbar />
      <GlobalScripts />
      <Modals />
      <FloatingWhatsApp />
      <main>
        {/* Dynamic Schema Injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <section style={{ paddingTop: '120px', paddingBottom: '4rem', background: '#0D0818', minHeight: '40vh', display: 'flex', alignItems: 'center' }}>
          <div className="container text-center">
            <span className="badge-neon" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              • Premium Real Estate in {data.location} •
            </span>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
              {data.h1}
            </h1>
            <p className="section-subtitle" style={{ maxWidth: '800px', margin: '0 auto 2rem auto' }}>
              {data.description} Experience the ultimate 80,000 sq. ft. Life in Motion sports ecosystem managed by ILESEUM.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-neon trigger-schedule">Schedule VIP Site Visit</button>
              <button className="btn btn-glass trigger-brochure">Download Brochure</button>
            </div>
          </div>
        </section>

        {/* Leverage the existing FloorPlans component, it will automatically pull prices via Context */}
        <FloorPlans />
      </main>
      <Footer />
    </>
  );
}
