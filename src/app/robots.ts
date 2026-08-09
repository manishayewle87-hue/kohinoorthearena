import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);

  if (host.includes('vercel.app')) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: [
      // ── Googlebot: Full access + JS/CSS for rendering ──
      {
        userAgent: 'Googlebot',
        allow: ['/', '/_next/static/', '/_next/image/', '/assets/'],
        disallow: ['/api/'],
      },
      // ── Googlebot-Image: Full image access ──
      {
        userAgent: 'Googlebot-Image',
        allow: ['/assets/', '/_next/image/'],
      },
      // ── Googlebot-Video: Full access ──
      {
        userAgent: 'Googlebot-Video',
        allow: ['/'],
        disallow: ['/api/'],
      },
      // ── Googlebot-News: Full access ──
      {
        userAgent: 'Googlebot-News',
        allow: ['/blog/'],
        disallow: ['/api/'],
      },
      // ── Bingbot: Allow with crawl awareness ──
      {
        userAgent: 'bingbot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      // ── Global Search Engines (Apple, Yandex, Baidu, DuckDuckGo) ──
      {
        userAgent: ['Applebot', 'YandexBot', 'Baiduspider', 'DuckDuckBot', 'Slurp'],
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      // ── Block AI scrapers ──
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'ChatGPT-User', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'anthropic-ai', disallow: '/' },
      { userAgent: 'Claude-Web', disallow: '/' },
      { userAgent: 'Bytespider', disallow: '/' },
      { userAgent: 'PetalBot', disallow: '/' },
      // ── Block aggressive SEO crawlers ──
      { userAgent: 'AhrefsBot', disallow: '/' },
      { userAgent: 'SemrushBot', disallow: '/' },
      { userAgent: 'DotBot', disallow: '/' },
      { userAgent: 'MJ12bot', disallow: '/' },
      { userAgent: 'DataForSeoBot', disallow: '/' },
      // ── Generic bots: Allow main content, block internals ──
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/api/lead',
          '/api/cron',
          '/api/test-email',
          '/api/google-index',
        ],
      },
    ],
    sitemap: cfg.sitemapUrl,
    host: cfg.canonical,
  };
}
