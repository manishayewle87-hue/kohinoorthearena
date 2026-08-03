import { getPostBySlug, getBlogPosts } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domain-config";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await params;
  const post = getPostBySlug(p.slug);
  if (!post) return { title: 'Not Found' };

  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  const postUrl = `${cfg.canonical}/blog/${p.slug}`;

  return {
    title: `${post.title} | ${cfg.projectName} Insights`,
    description: post.description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      type: "article",
      publishedTime: post.date,
      authors: [cfg.brand],
      images: [{ url: `${cfg.canonical}/assets/images/hero.jpg`, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const post = getPostBySlug(p.slug);
  
  if (!post) {
    notFound();
  }

  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  const postUrl = `${cfg.canonical}/blog/${p.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "url": postUrl,
    "image": `${cfg.canonical}/assets/images/hero.jpg`,
    "author": {
      "@type": "Organization",
      "name": cfg.brand,
      "url": cfg.canonical
    },
    "publisher": {
      "@type": "Organization",
      "name": cfg.projectName,
      "logo": {
        "@type": "ImageObject",
        "url": cfg.schemaOrg.logoUrl
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ padding: '8rem 0 4rem 0', minHeight: '80vh' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <article className="container" style={{ maxWidth: '800px' }}>
          <div style={{ color: 'var(--neon-lime)', marginBottom: '1rem' }}>{post.date}</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{post.title}</h1>
          <div className="glass-card" style={{ padding: '2rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)' }}>
            {/* Extremely basic markdown to HTML render for headers and paragraphs */}
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={idx} style={{ color: '#fff', margin: '2rem 0 1rem 0', fontSize: '1.8rem' }}>{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('# ')) {
                return <h1 key={idx} style={{ color: '#fff', margin: '2rem 0 1rem 0' }}>{paragraph.replace('# ', '')}</h1>;
              }
              // Bold parsing `**text**`
              const parsedHtml = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
              return <p key={idx} style={{ marginBottom: '1.5rem' }} dangerouslySetInnerHTML={{ __html: parsedHtml }} />;
            })}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
