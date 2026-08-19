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
      "@type": "RealEstateListing",
      "name": data.h1,
      "description": data.description,
      "url": pageUrl,
      "datePosted": "2026-01-01",
      "image": `${cfg.canonical}/assets/images/hero.jpg`,
      "about": {
        "@type": "Apartment",
        "name": `${data.bhk} Luxury Residence — ${cfg.arenaName}`,
        "numberOfBedrooms": data.bhk.includes('2') ? 2 : data.bhk.includes('3') ? 3 : 4,
        "numberOfRooms": data.bhk.includes('2') ? 3 : data.bhk.includes('3') ? 4 : 5,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": cfg.address.street,
          "addressLocality": cfg.address.locality,
          "addressRegion": cfg.address.region,
          "postalCode": cfg.address.postalCode,
          "addressCountry": cfg.address.country
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "18.6278",
          "longitude": "73.7997"
        },
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "Sports Ecosystem", "value": "80,000 Sq.Ft." },
          { "@type": "LocationFeatureSpecification", "name": "Metro Proximity", "value": "2.4 km from PCMC Metro" },
          { "@type": "LocationFeatureSpecification", "name": "MahaRERA", "value": cfg.mahaRera }
        ]
      },
      "offers": {
        "@type": "Offer",
        "url": pageUrl,
        "priceCurrency": "INR",
        "price": data.price.includes('Cr') ? parseFloat(data.price) * 10000000 : parseFloat(data.price) * 100000,
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": data.price.includes('Cr') ? parseFloat(data.price) * 10000000 : parseFloat(data.price) * 100000,
          "priceCurrency": "INR",
          "valueAddedTaxIncluded": true
        },
        "availability": "https://schema.org/PreOrder",
        "seller": {
          "@type": "RealEstateAgent",
          "name": `${cfg.brand} & ${cfg.coDevName}`,
          "telephone": cfg.contactPhone,
          "url": cfg.canonical
        }
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
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What is the starting price for ${data.bhk} in ${data.location}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The starting price for premium ${data.bhk} luxury residences in ${data.location} at The Arena is ₹${data.price}.`
          }
        },
        {
          "@type": "Question",
          "name": `What are the key amenities at ${cfg.arenaName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The Arena features a massive 80,000 Sq.Ft. sports and wellness ecosystem managed by ILESEUM, including olympic-length swimming pools, professional indoor courts, and dedicated health club facilities.`
          }
        },
        {
          "@type": "Question",
          "name": `Is the project in ${data.location} MahaRERA registered?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Yes, ${cfg.arenaName} is fully MahaRERA registered, developed as a joint venture between Mahalaxmi Group and Kohinoor Group.`
          }
        }
      ]
    }
  ];

  const locSlug = p.slug.split('-').pop() || 'pimpri';
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainLayout h1={data.h1} keyword={data.keyword}>
        <section style={{ padding: '4rem 0', background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            {/* ── Phase 7: LSI Content Saturation ── */}
            <div className="seo-content-block" style={{ marginBottom: '3rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              <p style={{ marginBottom: '1rem' }}>
                Discover premium living with <strong style={{ color: '#fff' }}>{cfg.arenaName} by {cfg.brand}</strong>. Our exclusive offering of {data.bhk} luxury residences in {data.location} provides unparalleled access to world-class sports and wellness amenities. 
                Whether you are looking for ready-to-move-in flats near PCMC Metro Station or seeking the ultimate investment property near Hinjewadi IT Park, this MahaRERA registered project delivers the pinnacle of luxury.
              </p>
              <p>
                Experience <em>&quot;Life in Motion&quot;</em> in {data.location} with an expansive 80,000 Sq.Ft. sports ecosystem managed by ILESEUM. Starting at just {data.price}, these smart homes are meticulously designed for maximum natural light and cross ventilation.
              </p>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '1rem' }}>
                <i className="ri-time-line"></i> Last updated: <time dateTime={currentDate.toISOString()}>{formattedDate}</time> — Pricing and availability are subject to change.
              </p>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--neon-lime)' }}>Explore More in {data.location}</h3>
            
            {/* ── Phase 7: Semantic Silo Mesh Networking ── */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <a href={`/premium-2-bhk-flats-${locSlug}`} className="btn btn-glass" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Premium 2 BHK in {data.location}</a>
              <a href={`/luxury-3-bhk-flats-${locSlug}`} className="btn btn-glass" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Luxury 3 BHK in {data.location}</a>
              <a href={`/best-real-estate-${locSlug}`} className="btn btn-glass" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Best Real Estate in {data.location}</a>
              <a href={`/new-projects-${locSlug}`} className="btn btn-glass" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>New Projects in {data.location}</a>
              <a href={`/investment-property-${locSlug}`} className="btn btn-glass" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Investment Property in {data.location}</a>
              {/* Deep Cross-Silo Link */}
              <a href={`/2-bhk-flats-in-pimpri-chinchwad`} className="btn btn-glass" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', border: '1px dashed rgba(223, 254, 0, 0.3)' }}>Compare with Pimpri Chinchwad</a>
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
