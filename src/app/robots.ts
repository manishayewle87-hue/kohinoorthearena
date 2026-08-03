import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);

  // If this is a Vercel preview URL — block everything
  if (host.includes('vercel.app')) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }

  return {
    rules: [
      {
        // Allow all bots to crawl main content
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // Block API routes
          '/_next/',         // Block Next.js internals
          '/api/lead',       // Explicitly block lead capture endpoint
          '/api/cron',       // Block cron handler
          '/api/test-email', // Block test endpoint
          '/api/google-index', // Block indexing trigger
        ],
      },
      {
        // Give Googlebot full access to crawl JS/CSS for rendering
        userAgent: 'Googlebot',
        allow: [
          '/_next/static/',
          '/_next/image/',
          '/assets/',
        ],
        disallow: [
          '/api/',
        ],
      },
    ],
    sitemap: cfg.sitemapUrl,
    host: cfg.canonical,
  };
}

