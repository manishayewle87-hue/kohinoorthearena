import { NextResponse } from 'next/server';
import { submitBatchUrls, submitUrlToGoogle } from '@/lib/google-indexing';
import { generatePSEOMatrix } from '@/lib/pseo-data';
import { getBlogPosts } from '@/lib/blog';

export const runtime = 'nodejs';

// ──────────────────────────────────────────────────────────
// Vercel Cron Job Handler
//
// Schedule (set in vercel.json): "0 1 * * *"  → 1:00 AM UTC daily (6:30 AM IST)
//
// What it does every day at 6:30 AM IST:
//   1. Builds the full URL list: core pages + all pSEO pages + all blog posts
//   2. Pings Google Search Console's sitemap endpoint
//   3. Submits up to 180 URLs to Google Indexing API (stays under 200/day free tier limit)
//   4. Returns a detailed JSON report of every submission
//
// Security: Protected by CRON_SECRET env var (set in Vercel)
// Vercel automatically sends this as Authorization: Bearer <CRON_SECRET>
// ──────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kohinoorthearena.vercel.app';

function buildUrlList(): string[] {
  const urls: string[] = [];

  // Core pages
  const corePages = [
    '',
    '/blog',
    '/privacy-policy',
    '/terms',
    '/kohinoor-the-arena-pimpri-chinchwad-pune',
    '/mahalaxmi-the-arena-luxury-flats-in-pimpri',
    '/life-in-motion-pimpri-sports-township-pcmc',
  ];
  corePages.forEach(p => urls.push(`${BASE_URL}${p}`));

  // pSEO matrix pages
  const pseoPages = generatePSEOMatrix();
  pseoPages.forEach(p => urls.push(`${BASE_URL}/flats-in-pune/${p.slug}`));

  // Blog posts
  const posts = getBlogPosts();
  posts.forEach(p => urls.push(`${BASE_URL}/blog/${p.slug}`));

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

  // ── Step 1: Ping Google Sitemap ──────────────────────────
  try {
    const sitemapUrl = `${BASE_URL}/sitemap.xml`;
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    const pingRes = await fetch(pingUrl, { method: 'GET' });
    report.sitemapPing = pingRes.ok ? `✅ Pinged (${pingRes.status})` : `⚠️ Failed (${pingRes.status})`;
  } catch (err) {
    report.sitemapPing = `❌ Error: ${err instanceof Error ? err.message : String(err)}`;
  }

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
