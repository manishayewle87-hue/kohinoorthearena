import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { submitBatchUrls } from '@/lib/google-indexing';
import { generatePSEOMatrix } from '@/lib/pseo-data';
import { getBlogPosts } from '@/lib/blog';
import { ALL_DOMAINS } from '@/lib/domain-config';
import { getPendingLeads, markLeadSent, recordLeadFailure } from '@/lib/lead-queue';

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
    'e4d531723bb826a44b40f42f431ae24bccb5211f6f34f71b7b85d4cbb0a50134',
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
    leadOutbox: { pending: number; flushed: number; errors: number };
    totalUrls: number;
    submitted: number;
    failed: number;
    results: unknown[];
  } = {
    timestamp: new Date().toISOString(),
    sitemapPing: 'pending',
    leadOutbox: { pending: 0, flushed: 0, errors: 0 },
    totalUrls: 0,
    submitted: 0,
    failed: 0,
    results: [],
  };

  // ── STEP 1: Flush & Retry Pending Leads from Fail-Safe Outbox ────
  const pendingLeads = getPendingLeads();
  report.leadOutbox.pending = pendingLeads.length;

  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const LEAD_RECIPIENT_EMAIL = process.env.LEAD_RECIPIENT_EMAIL || 'propsmartrealty@gmail.com';

  if (pendingLeads.length > 0 && EMAIL_USER && EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      });

      for (const lead of pendingLeads) {
        try {
          await transporter.sendMail({
            from: `"The Arena Leads (Outbox Flush)" <${EMAIL_USER}>`,
            to: LEAD_RECIPIENT_EMAIL,
            replyTo: lead.email || EMAIL_USER,
            subject: `[RETRY QUEUE] 🏠 Property Enquiry: ${lead.name} — ${lead.configuration || 'The Arena'} (${lead.domain})`,
            html: `
              <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:10px;overflow:hidden;">
                <div style="background:#0D0818;padding:20px;text-align:center;">
                  <h2 style="color:#DFFE00;margin:0;">🏠 Outbox Flushed Lead</h2>
                  <p style="color:#fff;margin:6px 0 0 0;font-size:13px;">Origin: <strong>${lead.domain}</strong> (Queued at ${lead.timestamp})</p>
                </div>
                <div style="padding:20px;background:#fff;">
                  <p><strong>Name:</strong> ${lead.name}</p>
                  <p><strong>Phone:</strong> <a href="tel:${lead.phone}">${lead.phone}</a></p>
                  <p><strong>Config:</strong> ${lead.configuration || '—'}</p>
                  <p><strong>Email:</strong> ${lead.email || '—'}</p>
                  <p><strong>Source:</strong> ${lead.source || 'Direct'}</p>
                  <p><strong>Original IP:</strong> ${lead.ip}</p>
                </div>
              </div>
            `,
          });
          markLeadSent(lead.id);
          report.leadOutbox.flushed += 1;
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          recordLeadFailure(lead.id, msg);
          report.leadOutbox.errors += 1;
        }
      }
    } catch (err) {
      console.error('[CRON][LEAD_OUTBOX] Error creating SMTP transport:', err);
    }
  }

  // ── STEP 2: Ping Search Engines with Sitemaps ───────────────────
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

  // ── STEP 3: Submit URLs to Google Indexing API ──────────────────
  const allUrls = buildUrlList();
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
    report.results = [{ note: 'GOOGLE_INDEXING_CLIENT_EMAIL not set. Skipping direct Indexing API calls.' }];
  } else {
    const results = await submitBatchUrls(urlsToSubmit);
    report.results = results;
    report.submitted = results.filter(r => r.status === 'submitted').length;
    report.failed = results.filter(r => r.status === 'failed').length;
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`[CRON] Complete in ${duration}s. Outbox flushed: ${report.leadOutbox.flushed}, Indexing submitted: ${report.submitted}`);

  return NextResponse.json({ ...report, durationSeconds: duration }, { status: 200 });
}
