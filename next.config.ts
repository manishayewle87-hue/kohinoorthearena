import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['nodemailer'],
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
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net https://cdn.jsdelivr.net",
              "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com",
              "font-src 'self' https://cdn.jsdelivr.net https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "frame-src 'self' https://www.google.com",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://graph.facebook.com",
            ].join('; '),
          },
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

