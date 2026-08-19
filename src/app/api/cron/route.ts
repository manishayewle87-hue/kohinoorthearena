import { NextResponse } from 'next/server';
import { submitBatchUrls } from '@/lib/google-indexing';
import { generatePSEOMatrix } from '@/lib/pseo-data';
import { getBlogPosts } from '@/lib/blog';
import { ALL_DOMAINS } from '@/lib/domain-config';

export const runtime = 'nodejs';

const CORE_PATHS = [
  '',                              // Homepage
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

function buildUrlList(): string[] {
  const urls: string[] = [];
  const pseoPages = generatePSEOMatrix();
  const posts = getBlogPosts();

  // Submit all paths across ALL custom domains
  for (const baseUrl of ALL_DOMAINS) {
    CORE_PATHS.forEach(p => urls.push(`${baseUrl}${p}`));
    pseoPages.forEach(p => urls.push(`${baseUrl}/${p.slug}`));
    posts.forEach(p => urls.push(`${baseUrl}/blog/${p.slug}`));
  }

  return urls;
}

export async function GET(request: Request) {
  // ── Security: Verify cron secret via Bearer, custom header, or query param ──
  const url = new URL(request.url);
  const querySecret = url.searchParams.get('secret');
  const authHeader = request.headers.get('authorization') || '';
  const xCronSecret = request.headers.get('x-cron-secret') || '';
  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.substring(7).trim() : authHeader.trim();

  const validSecrets = [
    process.env.CRON_SECRET,
    process.env.INDEXING_SECRET,
    'e4d531723bb826a44b40f42f431ae24bccb5211f6f34f71b7b85d4cbb0a50134', // fallback matching generated key
  ].filter(Boolean) as string[];

  const providedToken = bearerToken || xCronSecret || querySecret || '';

  const isAuthorized = validSecrets.some(s => s && providedToken === s);

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const startTime = Date.now();
  const report: {
    timestamp: string;
    sitemapPing: string;
    totalUrls: number;
    submitted: number;
    failed: number;
    results: unknown[];
  } = {
    timestamp: new Date().toISOString(),
    sitemapPing: 'pending',
    totalUrls: 0,
    submitted: 0,
    failed: 0,
    results: [],
  };

  // ── Step 1: Ping Google Sitemap for all domains ──────────
  const sitemapPings: string[] = [];
  for (const domain of ALL_DOMAINS) {
    try {
      const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(`${domain}/sitemap.xml`)}`;
      const pingRes = await fetch(pingUrl);
      sitemapPings.push(`${domain}: ${pingRes.ok ? `✅ ${pingRes.status}` : `⚠️ ${pingRes.status}`}`);
    } catch (err) {
      sitemapPings.push(`${domain}: ❌ ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  report.sitemapPing = sitemapPings.join(' | ');

  // ── Step 2: Build URL list & submit to Indexing API ──────
  const allUrls = buildUrlList();
  
  // Cycle through all 15,000+ URLs using the current day of the year
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  const batchSize = 180;
  const startIndex = (dayOfYear * batchSize) % allUrls.length;
  const urlsToSubmit = allUrls.slice(startIndex, startIndex + batchSize);
  
  report.totalUrls = allUrls.length;

  const GOOGLE_INDEXING_CLIENT_EMAIL = process.env.GOOGLE_INDEXING_CLIENT_EMAIL;
  if (!GOOGLE_INDEXING_CLIENT_EMAIL) {
    report.results = [{ note: 'GOOGLE_INDEXING_CLIENT_EMAIL not set. Skipping Indexing API submissions.' }];
  } else {
    const results = await submitBatchUrls(urlsToSubmit);
    report.results = results;
    report.submitted = results.filter(r => r.status === 'submitted').length;
    report.failed = results.filter(r => r.status === 'failed').length;
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`[CRON] Indexing job complete in ${duration}s. Submitted: ${report.submitted}, Failed: ${report.failed}`);

  return NextResponse.json({ ...report, durationSeconds: duration }, { status: 200 });
}
