import MainLayout from "@/components/MainLayout";
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  return {
    title: `Life in Motion Pimpri | #1 Premium Sports Township in PCMC`,
    description: `Discover Life in Motion Pimpri — the ultimate active luxury sports township in Pune. Premium 2, 3 & 4 BHK residences by Mahalaxmi Group and Kohinoor Group.`,
    keywords: ['Life in Motion Pimpri', 'Life in Motion Pimpri Pune', 'Life in Motion PCMC', 'Sports Township Pimpri', 'Mahalaxmi Group Life in Motion'],
    alternates: { canonical: `${cfg.canonical}/life-in-motion-pimpri` },
  };
}
export const revalidate = 3600;

export default async function Page() {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  const pageUrl = `${cfg.canonical}/life-in-motion-pimpri`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Life in Motion Pimpri",
    "description": "Premium sports township in Pimpri Chinchwad featuring an 80,000 Sq.Ft. sports ecosystem.",
    "url": pageUrl,
    "mainEntity": {
      "@type": "RealEstateAgent",
      "name": "Life in Motion Pimpri",
      "image": `${cfg.canonical}/assets/images/hero.jpg`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": cfg.address.street,
        "addressLocality": cfg.address.locality,
        "addressRegion": cfg.address.region,
        "postalCode": cfg.address.postalCode,
        "addressCountry": cfg.address.country
      }
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MainLayout h1="Life in Motion Pimpri" keyword="The Ultimate Sports Township in PCMC">
        <section style={{ padding: '5rem 0', background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff', fontFamily: 'var(--font-outfit)' }}>
                Experience <span style={{ color: 'var(--neon-lime)' }}>Life in Motion Pimpri</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                <strong>Life in Motion Pimpri</strong> is not just a residential address; it is a philosophy of active, luxury living in the heart of Pune's PCMC district. 
                Developed as a joint venture between the prestigious Mahalaxmi Group and Kohinoor Group, this unique sports township redefines urban living.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1rem' }}><i className="ri-map-pin-line" style={{ color: 'var(--neon-lime)', marginRight: '8px' }}></i>Prime Pimpri Location</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                  Situated perfectly in the center of PCMC, <em>Life in Motion Pimpri</em> offers unparalleled connectivity to the PCMC Metro Station, Hinjewadi IT Park, and the Mumbai-Pune Expressway.
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1rem' }}><i className="ri-run-line" style={{ color: 'var(--neon-lime)', marginRight: '8px' }}></i>The Active Ecosystem</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                  What makes <strong>Life in Motion Pimpri</strong> truly special is its 80,000 Sq.Ft. sports and wellness arena, professionally managed by ILESEUM to keep your family active, healthy, and engaged.
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1rem' }}><i className="ri-home-smile-line" style={{ color: 'var(--neon-lime)', marginRight: '8px' }}></i>Luxury Residences</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                  Choose from our meticulously crafted 2, 3, and 4 BHK luxury apartments. Every home at <em>Life in Motion Pimpri</em> is Vastu-compliant, zero-wastage, and flooded with natural light.
                </p>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
