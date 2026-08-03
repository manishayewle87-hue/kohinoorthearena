import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getAllPosts } from '@/lib/blog';
import { generatePSEOMatrix } from '@/lib/pseo-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  // Core Pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  ];

  // Blog Posts
  const posts = getAllPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Programmatic SEO Matrix Pages
  const matrix = generatePSEOMatrix();
  const matrixRoutes = matrix.map((page) => ({
    url: `${baseUrl}/flats-in-pune/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9, // High priority for long-tail SEO
  }));

  return [...routes, ...blogRoutes, ...matrixRoutes];
}
