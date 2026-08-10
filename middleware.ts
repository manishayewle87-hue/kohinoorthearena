import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getDomainConfig } from '@/lib/domain-config';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  // Use Vercel's host if x-forwarded-host is present
  const forwardedHost = request.headers.get('x-forwarded-host');
  const finalHost = forwardedHost || hostname;

  // ── Get domain config for this host ──
  const cfg = getDomainConfig(finalHost);

  // ── Inject headers so Server Components can read them ──
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-arena-domain', finalHost);
  requestHeaders.set('x-arena-brand', cfg.brand);
  requestHeaders.set('x-arena-canonical', cfg.canonical);

  // ── Edge Personalization (Intent Extraction) ──
  const utmTerm = request.nextUrl.searchParams.get('utm_term');
  const utmCampaign = request.nextUrl.searchParams.get('utm_campaign');
  const intent = utmTerm || utmCampaign || '';
  requestHeaders.set('x-arena-intent', intent);

  // ── Domain-based root routing ──
  if (request.nextUrl.pathname === '/') {
    if (cfg.primarySlug && cfg.primarySlug !== '/') {
      const url = request.nextUrl.clone();
      url.pathname = cfg.primarySlug;
      return NextResponse.rewrite(url, {
        request: { headers: requestHeaders },
      });
    }
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
