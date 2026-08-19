import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  serverExternalPackages: ['nodemailer'],
  compress: true,

  // ── Permanent 301 redirects for old slug variants ──────────────────
  async redirects() {
    return [
      {
        source: '/life-in-motion-pimpri-sports-township-pcmc',
        destination: '/life-in-motion-pimpri',
        permanent: true,
      },
      {
        source: '/kohinoor-the-arena-pimpri-chinchwad-pune',
        destination: '/kohinoor-the-arena-pimpri',
        permanent: true,
      },
      {
        source: '/mahalaxmi-the-arena-luxury-flats-in-pimpri',
        destination: '/mahalaxmi-the-arena-pimpri',
        permanent: true,
      },
      // Common trailing slash variants
      {
        source: '/kohinoor-the-arena-pimpri/',
        destination: '/kohinoor-the-arena-pimpri',
        permanent: true,
      },
      {
        source: '/mahalaxmi-the-arena-pimpri/',
        destination: '/mahalaxmi-the-arena-pimpri',
        permanent: true,
      },
      {
        source: '/blog/',
        destination: '/blog',
        permanent: true,
      },
    ];
  },

  // ── HTTP Security + Crawl Headers ──────────────────────────────────
  async headers() {
    return [
      // ── RULE 1: Hard block Vercel preview from Google ──
      {
        source: '/(.*)',
        has: [{ type: 'host', value: '(?:.*)\\.vercel\\.app' }],
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, nosnippet' },
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },

      // ── RULE 2: Production security + performance headers ──
      {
        source: '/(.*)',
        missing: [{ type: 'host', value: '(?:.*)\\.vercel\\.app' }],
        headers: [
          // Security & Isolation
          { key: 'X-Frame-Options',           value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options',    value: 'nosniff' },
          { key: 'X-DNS-Prefetch-Control',    value: 'on' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
          // Crawl hint
          { key: 'X-Robots-Tag',              value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        ],
      },

      // ── RULE 3: Static assets — long cache ──
      {
        source: '/assets/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },

      // ── RULE 4: Next.js static chunks — long cache ──
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },

      // ── RULE 5: Dynamic OG image & Favicon — cache & indexable ──
      {
        source: '/api/og',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400' },
          { key: 'X-Robots-Tag', value: 'index, follow' },
        ],
      },
      {
        source: '/api/favicon',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800' },
          { key: 'X-Robots-Tag', value: 'index, follow' },
        ],
      },

      // ── RULE 6: All other internal API routes — no cache, no index ──
      {
        source: '/api/((?!og|favicon).*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },
};

export default nextConfig;
