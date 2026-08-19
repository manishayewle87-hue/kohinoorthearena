import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getBlogPosts } from '@/lib/blog';
import { generatePSEOMatrix } from '@/lib/pseo-data';
import { getDomainConfig } from '@/lib/domain-config';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get('host') || 'www.kohinoorthearena.in';
  const cfg = getDomainConfig(host);
  const baseUrl = cfg.canonical;
  const buildDate = new Date().toISOString();

  const matrix = generatePSEOMatrix();
  const posts = getBlogPosts();

  // ── 1. Core Pillar Pages (Strictly matching host domain) ──
  const corePillarPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: buildDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/life-in-motion-pimpri`,
      lastModified: buildDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/kohinoor-the-arena-pimpri`,
      lastModified: buildDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/mahalaxmi-the-arena-pimpri`,
      lastModified: buildDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/pcmc-premium-real-estate`,
      lastModified: buildDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
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
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: buildDate,
      changeFrequency: 'yearly',
      priority: 0.20,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: buildDate,
      changeFrequency: 'yearly',
      priority: 0.20,
    },
  ];

  // ── 2. Blog Posts ──
  const blogPostRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date).toISOString() : buildDate,
    changeFrequency: 'monthly' as const,
    priority: 0.70,
  }));

  // ── 3. High-Intent Master Keyword Hub Pages (Strictly domain-isolated) ──
  const pseoRoutes: MetadataRoute.Sitemap = matrix.slice(0, 1500).map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: buildDate,
    changeFrequency: (page.category === 'Master Real Estate Hub' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: page.category === 'Master Real Estate Hub' ? 0.90 : 0.80,
  }));

  return [...corePillarPages, ...blogPostRoutes, ...pseoRoutes];
}
