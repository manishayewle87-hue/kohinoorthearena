import { NextResponse } from 'next/server';
import { submitUrlToGoogle, submitBatchUrls } from '@/lib/google-indexing';
import { generatePSEOMatrix } from '@/lib/pseo-data';
import { getBlogPosts } from '@/lib/blog';
import { ALL_DOMAINS } from '@/lib/domain-config';

export const runtime = 'nodejs';

const CORE_PATHS = [
  '',
  '/blog',
  '/explore',
  '/market-trends',
  '/privacy-policy',
  '/terms',
  '/kohinoor-the-arena-pimpri',
  '/mahalaxmi-the-arena-pimpri',
  '/life-in-motion-pimpri',
  '/pcmc-premium-real-estate',
];

function buildAllUrls(): string[] {
  const urls: string[] = [];
  const pseoPages = generatePSEOMatrix();
  const posts = getBlogPosts();
  for (const baseUrl of ALL_DOMAINS) {
    CORE_PATHS.forEach(p => urls.push(`${baseUrl}${p}`));
    pseoPages.forEach(p => urls.push(`${baseUrl}/${p.slug}`));
    posts.forEach(p => urls.push(`${baseUrl}/blog/${p.slug}`));
  }
  return urls;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { url?: string; secret?: string; batch?: boolean; type?: 'URL_UPDATED' | 'URL_DELETED' | 'PING_SITEMAP' };
    const INDEXING_SECRET = process.env.INDEXING_SECRET;
    if (!INDEXING_SECRET || body.secret !== INDEXING_SECRET) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }

    // Batch mode: submit all URLs
    if (body.batch) {
      const allUrls = buildAllUrls();
      const results = await submitBatchUrls(allUrls.slice(0, 180));
      const submitted = results.filter(r => r.status === 'submitted').length;
      const failed = results.filter(r => r.status === 'failed').length;
      return NextResponse.json({ total: allUrls.length, submitted, failed, results }, { status: 200 });
    }

    // ── Phase 4 Indexation Velocity Engine (Multi-Engine Pinging) ──
    if (body.type === 'PING_SITEMAP') {
      const sitemapUrls = [
        'https://www.kohinoorthearena.in/sitemap.xml',
        'https://www.mahalaxmithearena.in/sitemap.xml',
      ];

      const pingResults = [];
      for (const sUrl of sitemapUrls) {
        try {
          const googlePing = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sUrl)}`);
          const bingPing = await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sUrl)}`);
          pingResults.push({ sitemap: sUrl, google: googlePing.status, bing: bingPing.status });
        } catch (e) {
          pingResults.push({ sitemap: sUrl, error: String(e) });
        }
      }
      return NextResponse.json({ success: true, message: 'Mass ping executed.', results: pingResults }, { status: 200 });
    }

    if (!body.url) {
      return NextResponse.json({ error: 'url is required in request body.' }, { status: 422 });
    }

    let urlObj: URL;
    try { urlObj = new URL(body.url); } catch {
      return NextResponse.json({ error: 'Invalid URL format.' }, { status: 422 });
    }

    // Allow both www and non-www for both domains
    const allowedHosts = [
      'kohinoorthearena.in', 'www.kohinoorthearena.in',
      'mahalaxmithearena.in', 'www.mahalaxmithearena.in',
      'kohinoorthearena.vercel.app',
    ];
    if (!allowedHosts.includes(urlObj.hostname)) {
      return NextResponse.json({ error: 'URL hostname not in allowed list.' }, { status: 403 });
    }

    const result = await submitUrlToGoogle(body.url, body.type || 'URL_UPDATED');
    return NextResponse.json(result, { status: result.status === 'submitted' ? 200 : 500 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed. Use POST.' }, { status: 405 });
}
