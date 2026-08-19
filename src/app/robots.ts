import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);

  // ── Block ALL bots on Vercel preview / staging ──
  if (host.includes('vercel.app') || host.includes('localhost')) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [
      // ════════════════════════════════════════════════════
      // TIER 1: Google — Full privileged access
      // Allows JS/CSS rendering for Core Web Vitals scoring
      // ════════════════════════════════════════════════════
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/_next/static/',
          '/_next/image/',
          '/assets/',
          '/api/og',        // Dynamic OG image generation — must be crawlable
        ],
        disallow: [
          '/api/lead',
          '/api/cron',
          '/api/test-email',
          '/api/google-index',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/', '/assets/', '/_next/image/', '/api/og'],
      },
      {
        userAgent: 'Googlebot-Video',
        allow: ['/'],
        disallow: ['/api/lead', '/api/cron'],
      },
      {
        userAgent: 'Googlebot-News',
        allow: ['/blog/'],
        disallow: ['/api/'],
      },
      // Google AdsBot — needed for Google Ads Quality Score
      {
        userAgent: 'AdsBot-Google',
        allow: ['/'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'AdsBot-Google-Mobile',
        allow: ['/'],
        disallow: ['/api/'],
      },

      // ════════════════════════════════════════════════════
      // TIER 2: Major Global Search Engines
      // ════════════════════════════════════════════════════
      {
        userAgent: 'bingbot',
        allow: ['/', '/api/og'],
        disallow: ['/api/lead', '/api/cron', '/api/test-email', '/_next/'],
      },
      {
        userAgent: 'Slurp',          // Yahoo Search
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'DuckDuckBot',    // DuckDuckGo
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'Baiduspider',    // Baidu (China)
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'YandexBot',      // Yandex (Russia, CIS)
        allow: ['/', '/api/og'],
        disallow: ['/api/lead', '/api/cron', '/_next/'],
      },
      {
        userAgent: 'Applebot',       // Siri / Spotlight / Apple Maps
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'Teoma',          // Ask.com
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'Sogou',          // Sogou (China #2)
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },

      // ════════════════════════════════════════════════════
      // TIER 3: Social / Rich Preview Crawlers
      // Must be allowed so OG cards render on WhatsApp/LinkedIn
      // ════════════════════════════════════════════════════
      {
        userAgent: 'facebookexternalhit',
        allow: ['/', '/api/og', '/assets/'],
        disallow: ['/api/lead', '/api/cron'],
      },
      {
        userAgent: 'Twitterbot',
        allow: ['/', '/api/og', '/assets/'],
        disallow: ['/api/lead', '/api/cron'],
      },
      {
        userAgent: 'LinkedInBot',
        allow: ['/', '/api/og', '/assets/'],
        disallow: ['/api/lead', '/api/cron'],
      },
      {
        userAgent: 'WhatsApp',
        allow: ['/', '/api/og', '/assets/'],
        disallow: ['/api/lead', '/api/cron'],
      },

      // ════════════════════════════════════════════════════
      // TIER 4: BLOCK — AI Scrapers (content theft)
      // ════════════════════════════════════════════════════
      { userAgent: 'GPTBot',          disallow: '/' },
      { userAgent: 'ChatGPT-User',    disallow: '/' },
      { userAgent: 'CCBot',           disallow: '/' },
      { userAgent: 'anthropic-ai',    disallow: '/' },
      { userAgent: 'Claude-Web',      disallow: '/' },
      { userAgent: 'ClaudeBot',       disallow: '/' },
      { userAgent: 'cohere-ai',       disallow: '/' },
      { userAgent: 'PerplexityBot',   disallow: '/' },
      { userAgent: 'Bytespider',      disallow: '/' },
      { userAgent: 'PetalBot',        disallow: '/' },
      { userAgent: 'omgili',          disallow: '/' },
      { userAgent: 'Diffbot',         disallow: '/' },
      { userAgent: 'ImagesiftBot',    disallow: '/' },

      // ════════════════════════════════════════════════════
      // TIER 5: BLOCK — Aggressive SEO crawlers (quota thieves)
      // ════════════════════════════════════════════════════
      { userAgent: 'AhrefsBot',       disallow: '/' },
      { userAgent: 'SemrushBot',      disallow: '/' },
      { userAgent: 'DotBot',          disallow: '/' },
      { userAgent: 'MJ12bot',         disallow: '/' },
      { userAgent: 'DataForSeoBot',   disallow: '/' },
      { userAgent: 'BLEXBot',         disallow: '/' },
      { userAgent: 'MegaIndex',       disallow: '/' },
      { userAgent: 'SEOkicks',        disallow: '/' },
      { userAgent: 'Screaming Frog SEO Spider', disallow: '/' },

      // ════════════════════════════════════════════════════
      // TIER 6: Default — Allow good bots, block internals
      // ════════════════════════════════════════════════════
      {
        userAgent: '*',
        allow: ['/', '/api/og'],
        disallow: [
          '/api/lead',
          '/api/cron',
          '/api/test-email',
          '/api/google-index',
          '/_next/',
        ],
      },
    ],
    sitemap: [
      cfg.sitemapUrl,
      `${cfg.canonical}/sitemap/0.xml`,
    ],
    host: cfg.canonical,
  };
}
