import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { generatePSEOMatrix } from '@/lib/pseo-data';
import { DOMAIN_CONFIGS } from '@/lib/domain-config';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date().toISOString();
  const allRoutes: MetadataRoute.Sitemap = [];

  const matrix = generatePSEOMatrix();
  const posts = getBlogPosts();

  // Generate sitemap entries for all registered production domains
  for (const [, cfg] of Object.entries(DOMAIN_CONFIGS)) {
    const baseUrl = cfg.canonical;

    // ── 1. Core Pillar Pages ──
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

    // ── 3. High-Intent Master Keyword Hub Pages ──
    // Include top high-priority hubs (under 50,000 total URLs to stay 100% compliant with standard XML sitemap)
    const pseoRoutes: MetadataRoute.Sitemap = matrix.slice(0, 1000).map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: buildDate,
      changeFrequency: (page.category === 'Master Real Estate Hub' ? 'daily' : 'weekly') as 'daily' | 'weekly',
      priority: page.category === 'Master Real Estate Hub' ? 0.90 : 0.80,
    }));

    allRoutes.push(...corePillarPages, ...blogPostRoutes, ...pseoRoutes);
  }

  return allRoutes;
}
