import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getBlogPosts } from '@/lib/blog';
import { generatePSEOMatrix } from '@/lib/pseo-data';
import { getDomainConfig } from '@/lib/domain-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);
  const baseUrl = cfg.canonical;

  const now = new Date();

  // Core Pages & Brand Silo Landing Pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
      images: [`${baseUrl}/assets/images/hero.jpg`],
    },
    {
      url: `${baseUrl}/kohinoor-the-arena-pimpri-chinchwad-pune`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
      images: [`${baseUrl}/assets/images/hero.jpg`],
    },
    {
      url: `${baseUrl}/mahalaxmi-the-arena-luxury-flats-in-pimpri`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
      images: [`${baseUrl}/assets/images/hero.jpg`],
    },
    {
      url: `${baseUrl}/life-in-motion-pimpri-sports-township-pcmc`,
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

  // Blog Posts
  const posts = getBlogPosts();
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,

  }));

  // Programmatic SEO Matrix Pages
  const matrix = generatePSEOMatrix();
  const matrixRoutes: MetadataRoute.Sitemap = matrix.map((page) => ({
    url: `${baseUrl}/flats-in-pune/${page.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
    images: [`${baseUrl}/assets/images/hero.jpg`],
  }));

  return [...routes, ...blogRoutes, ...matrixRoutes];
}
