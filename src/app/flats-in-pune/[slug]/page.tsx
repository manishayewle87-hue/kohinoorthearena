import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generatePSEOMatrix, getPSEOPageData } from '@/lib/pseo-data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloorPlans from '@/components/FloorPlans';
import Modals from '@/components/Modals';
import GlobalScripts from '@/components/GlobalScripts';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

type Props = {
  params: { slug: string };
};

export const revalidate = 3600; // Edge Route Caching (1 Hour)

export async function generateStaticParams() {
  const matrix = generatePSEOMatrix();
  return matrix.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getPSEOPageData(params.slug);
  
  if (!data) {
    return { title: 'Page Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: [data.keyword, `Buy ${data.bhk} in ${data.location}`, `Mahalaxmi The Arena ${data.location}`],
    openGraph: {
      title: data.title,
      description: data.description,
      type: "website",
    }
  };
}

export default function PSEOPage({ params }: Props) {
  const data = getPSEOPageData(params.slug);
  
  if (!data) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": data.h1,
    "description": data.description,
    "image": "https://kohinoorthearena.vercel.app/assets/images/hero-bg.jpg",
    "brand": {
      "@type": "Brand",
      "name": "Mahalaxmi The Arena"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://kohinoorthearena.vercel.app/flats-in-pune/${params.slug}`,
      "priceCurrency": "INR",
      "price": data.price.includes('Cr') ? parseFloat(data.price) * 10000000 : parseFloat(data.price) * 100000,
      "availability": "https://schema.org/PreOrder"
    }
  };

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
