import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  serverExternalPackages: ['nodemailer'],
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
    ];
  },
  async headers() {
    return [
      // ── RULE 1: Block Vercel preview URLs from Google indexing ──
      // This prevents kohinoorthearena.vercel.app from being treated as
      // a duplicate of kohinoorthearena.in and mahalaxmithearena.in
      {
        source: '/(.*)',
        has: [{ type: 'host', value: '(?:.*)\\.vercel\\.app' }],
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },

      // ── RULE 2: Security & Performance headers for all real domains ──
      {
        source: '/(.*)',
        missing: [{ type: 'host', value: '(?:.*)\\.vercel\\.app' }],
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
        ],
      },

      // ── RULE 3: API routes — never cached, no robots ──
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },
};

export default nextConfig;

