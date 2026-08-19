import { getBlogPosts } from "@/lib/blog";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domain-config";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);

  const title = `Real Estate Market Insights & Guides | ${cfg.arenaName} by ${cfg.brand}`;
  const description = `Read expert analyses, investment guides, and real estate market trends for Pimpri Chinchwad (PCMC) and Pune by ${cfg.brand}.`;

  return {
    title,
    description,
    alternates: { canonical: `${cfg.canonical}/blog` },
    openGraph: {
      title,
      description,
      url: `${cfg.canonical}/blog`,
      siteName: `${cfg.arenaName} by ${cfg.brand}`,
      images: [{ url: cfg.ogImage, width: 1200, height: 630, alt: title }],
      type: 'website',
      locale: 'en_IN',
    },
  };
}

export const revalidate = 3600;

export default async function BlogList() {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  const posts = getBlogPosts();

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `Real Estate Market Insights | ${cfg.arenaName}`,
      description: `Latest insights, MahaRERA buying guides, and property market analyses for Pimpri Chinchwad and Pune by ${cfg.brand}.`,
      url: `${cfg.canonical}/blog`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: cfg.canonical },
        { '@type': 'ListItem', position: 2, name: 'Market Insights', item: `${cfg.canonical}/blog` },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main style={{ padding: '8rem 0 4rem 0', minHeight: '80vh' }}>
        <div className="container">
          <h1 className="section-title text-center" style={{ marginBottom: '1rem' }}>Market Insights</h1>
          <p className="text-center" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '3rem' }}>
            Latest trends, investment guides, and analysis on the Pune &amp; PCMC Real Estate Market.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} style={{ textDecoration: 'none' }}>
                <div className="glass-card" style={{ padding: '2rem', height: '100%', transition: 'transform 0.3s ease' }}>
                  <div style={{ color: 'var(--neon-lime)', fontSize: '0.8rem', marginBottom: '1rem' }}>{post.date}</div>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>{post.title}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>{post.description}</p>
                  <div style={{ marginTop: '1.5rem', color: 'var(--neon-lime)', fontWeight: 'bold' }}>Read More &rarr;</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer
        mahaRera={cfg.mahaRera}
        primarySlug={cfg.primarySlug}
        coDevSlug={cfg.primarySlug === '/kohinoor-the-arena-pimpri'
          ? '/mahalaxmi-the-arena-pimpri'
          : '/kohinoor-the-arena-pimpri'}
        projectName={cfg.projectName}
      />
    </>
  );
}
