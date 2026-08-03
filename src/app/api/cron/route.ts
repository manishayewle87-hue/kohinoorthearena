import { NextResponse } from 'next/server';
import { submitBatchUrls } from '@/lib/google-indexing';
import { generatePSEOMatrix } from '@/lib/pseo-data';
import { getBlogPosts } from '@/lib/blog';
import { ALL_DOMAINS } from '@/lib/domain-config';

export const runtime = 'nodejs';

const CORE_PATHS = [
  '',
  '/blog',
  '/privacy-policy',
  '/terms',
  '/kohinoor-the-arena-pimpri-chinchwad-pune',
  '/mahalaxmi-the-arena-luxury-flats-in-pimpri',
  '/life-in-motion-pimpri-sports-township-pcmc',
];

function buildUrlList(): string[] {
  const urls: string[] = [];
  const pseoPages = generatePSEOMatrix();
  const posts = getBlogPosts();

  // Submit all paths across ALL custom domains
  for (const baseUrl of ALL_DOMAINS) {
    CORE_PATHS.forEach(p => urls.push(`${baseUrl}${p}`));
    pseoPages.forEach(p => urls.push(`${baseUrl}/flats-in-pune/${p.slug}`));
    posts.forEach(p => urls.push(`${baseUrl}/blog/${p.slug}`));
  }

  return urls;
}

export async function GET(request: Request) {
  // ── Security: Verify cron secret ──
  const authHeader = request.headers.get('authorization');
  const CRON_SECRET = process.env.CRON_SECRET;

  if (!CRON_SECRET || authHeader !== `Bearer ${CRON_SECRET}`) {
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
  // Cap at 180/day to stay safely under Google's 200/day free tier limit
  const urlsToSubmit = allUrls.slice(0, 180);
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
