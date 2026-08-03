import { NextResponse } from 'next/server';
import { submitUrlToGoogle } from '@/lib/google-indexing';

export const runtime = 'nodejs';

// ──────────────────────────────────────────────────────────
// Manual Google Indexing API Trigger
//
// POST /api/google-index
// Body: { "url": "https://kohinoorthearena.in/flats-in-pune/buy-2-bhk-pimpri", "secret": "YOUR_SECRET" }
//
// Use this to instantly submit a single new page or blog post
// to Google without waiting for the daily cron job.
// ──────────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const body = await request.json() as { url?: string; secret?: string; type?: 'URL_UPDATED' | 'URL_DELETED' };

    // ── Auth ──
    const INDEXING_SECRET = process.env.INDEXING_SECRET;
    if (!INDEXING_SECRET || body.secret !== INDEXING_SECRET) {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }

    // ── Validate URL ──
    if (!body.url) {
      return NextResponse.json({ error: 'url is required in request body.' }, { status: 422 });
    }

    let urlObj: URL;
    try {
      urlObj = new URL(body.url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format.' }, { status: 422 });
    }

    // Only allow indexing our own domains
    const allowedHosts = ['kohinoorthearena.in', 'mahalaxmithearena.in', 'kohinoorthearena.vercel.app'];
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
