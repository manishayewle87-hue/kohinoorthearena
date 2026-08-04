import { NextResponse } from 'next/server';
import { submitUrlToGoogle, submitBatchUrls } from '@/lib/google-indexing';
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

function buildAllUrls(): string[] {
  const urls: string[] = [];
  const pseoPages = generatePSEOMatrix();
  const posts = getBlogPosts();
  for (const baseUrl of ALL_DOMAINS) {
    CORE_PATHS.forEach(p => urls.push(`${baseUrl}${p}`));
    pseoPages.forEach(p => urls.push(`${baseUrl}/flats-in-pune/${p.slug}`));
    posts.forEach(p => urls.push(`${baseUrl}/blog/${p.slug}`));
  }
  return urls;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { url?: string; secret?: string; batch?: boolean; type?: 'URL_UPDATED' | 'URL_DELETED' };
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

    if (!body.url) {
      return NextResponse.json({ error: 'url is required in request body.' }, { status: 422 });
    }

    let urlObj: URL;
    try { urlObj = new URL(body.url); } catch {
      return NextResponse.json({ error: 'Invalid URL format.' }, { status: 422 });
    }

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
