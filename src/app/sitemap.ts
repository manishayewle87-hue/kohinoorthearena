import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getBlogPosts } from '@/lib/blog';
import { generatePSEOMatrix } from '@/lib/pseo-data';
import { getDomainConfig } from '@/lib/domain-config';

const CHUNK_SIZE = 5000;

export async function generateSitemaps() {
  const matrix = generatePSEOMatrix();
  const chunks = Math.ceil(matrix.length / CHUNK_SIZE);
  const sitemaps = [{ id: 0 }]; // id 0: Core pages + Blog
  for (let i = 0; i < chunks; i++) {
    sitemaps.push({ id: i + 1 }); // id 1+: PSEO matrix chunks
  }
  return sitemaps;
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  const baseUrl = cfg.canonical;
  const now = new Date();
  const buildDate = now.toISOString();

  // ── ID 0: Core Pillar Pages + Blog ──────────────────────────────────
  if (id === 0) {
    const posts = getBlogPosts();

    const corePillarPages: MetadataRoute.Sitemap = [
      // ── Homepage ── priority 1.0
      {
        url: baseUrl,
        lastModified: buildDate,
        changeFrequency: 'daily',
        priority: 1.0,
        images: [`${baseUrl}/assets/images/hero.jpg`],
      },
      // ── Primary silo pages ── priority 0.95
      {
        url: `${baseUrl}/life-in-motion-pimpri`,
        lastModified: buildDate,
        changeFrequency: 'daily',
        priority: 0.95,
        images: [`${baseUrl}/assets/images/hero.jpg`],
      },
      {
        url: `${baseUrl}/kohinoor-the-arena-pimpri`,
        lastModified: buildDate,
        changeFrequency: 'daily',
        priority: 0.95,
        images: [`${baseUrl}/assets/images/hero.jpg`],
      },
      {
        url: `${baseUrl}/mahalaxmi-the-arena-pimpri`,
        lastModified: buildDate,
        changeFrequency: 'daily',
        priority: 0.95,
        images: [`${baseUrl}/assets/images/hero.jpg`],
      },
      {
        url: `${baseUrl}/pcmc-premium-real-estate`,
        lastModified: buildDate,
        changeFrequency: 'daily',
        priority: 0.95,
        images: [`${baseUrl}/assets/images/hero.jpg`],
      },
      // ── Secondary pages ── priority 0.85
      {
        url: `${baseUrl}/explore`,
        lastModified: buildDate,
        changeFrequency: 'weekly',
        priority: 0.85,
      },
      {
        url: `${baseUrl}/market-trends`,
        lastModified: buildDate,
        changeFrequency: 'weekly',
        priority: 0.80,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: buildDate,
        changeFrequency: 'weekly',
        priority: 0.75,
        images: [`${baseUrl}/assets/images/hero.jpg`],
      },
      // ── Legal — low priority ──
      {
        url: `${baseUrl}/privacy-policy`,
        lastModified: buildDate,
        changeFrequency: 'yearly',
        priority: 0.2,
      },
      {
        url: `${baseUrl}/terms`,
        lastModified: buildDate,
        changeFrequency: 'yearly',
        priority: 0.2,
      },
    ];

    const blogPostRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date).toISOString() : buildDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      images: [`${baseUrl}/assets/images/hero.jpg`],
    }));

    return [...corePillarPages, ...blogPostRoutes];
  }

  // ── ID 1+: PSEO Matrix chunks (15,000+ pages) ────────────────────────
  const matrix = generatePSEOMatrix();
  const chunkIndex = id - 1;
  const chunk = matrix.slice(chunkIndex * CHUNK_SIZE, (chunkIndex + 1) * CHUNK_SIZE);

  return chunk.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: buildDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
    images: [
      `${baseUrl}/api/og?title=${encodeURIComponent(page.title)}&sub=${encodeURIComponent(`${page.bhk} Flats in ${page.location}`)}&brand=${encodeURIComponent(cfg.brand)}`,
    ],
  }));
}
