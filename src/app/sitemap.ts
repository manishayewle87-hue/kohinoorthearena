import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getBlogPosts } from '@/lib/blog';
import { generatePSEOMatrix } from '@/lib/pseo-data';
import { getDomainConfig } from '@/lib/domain-config';

const CHUNK_SIZE = 5000;

export async function generateSitemaps() {
  const matrix = generatePSEOMatrix();
  const chunks = Math.ceil(matrix.length / CHUNK_SIZE);
  const sitemaps = [{ id: 0 }]; // id 0 for core & blog
  for (let i = 0; i < chunks; i++) {
    sitemaps.push({ id: i + 1 });
  }
  return sitemaps;
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  const baseUrl = cfg.canonical;

  const now = new Date();

  // ── ID 0: Core Pages & Blog Posts ──
  if (id === 0) {
    const routes: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 1.0,
        images: [`${baseUrl}/assets/images/hero.jpg`],
      },
      {
        url: `${baseUrl}/life-in-motion-pimpri`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.95,
        images: [`${baseUrl}/assets/images/hero.jpg`],
      },
      {
        url: `${baseUrl}/kohinoor-the-arena-pimpri`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.95,
        images: [`${baseUrl}/assets/images/hero.jpg`],
      },
      {
        url: `${baseUrl}/mahalaxmi-the-arena-pimpri`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.95,
        images: [`${baseUrl}/assets/images/hero.jpg`],
      },
      {
        url: `${baseUrl}/pcmc-premium-real-estate`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.95,
        images: [`${baseUrl}/assets/images/hero.jpg`],
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
        images: [`${baseUrl}/assets/images/hero.jpg`],
      },
      {
        url: `${baseUrl}/privacy-policy`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${baseUrl}/terms`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.3,
      },
    ];

    const posts = getBlogPosts();
    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
      images: [`${baseUrl}/assets/images/hero.jpg`],
    }));

    return [...routes, ...blogRoutes];
  }

  // ── ID 1 to N: PSEO Matrix Chunks ──
  const matrix = generatePSEOMatrix();
  const chunkIndex = id - 1;
  const chunk = matrix.slice(chunkIndex * CHUNK_SIZE, (chunkIndex + 1) * CHUNK_SIZE);

  return chunk.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
    images: [`${baseUrl}/assets/images/hero.jpg`],
  }));
}
