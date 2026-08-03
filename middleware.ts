import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getDomainConfig } from '@/lib/domain-config';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // ── Get domain config for this host ──
  const cfg = getDomainConfig(hostname);

  // ── Inject x-domain header so Server Components can read domain without calling headers() ──
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-arena-domain', hostname);
  requestHeaders.set('x-arena-brand', cfg.brand);
  requestHeaders.set('x-arena-canonical', cfg.canonical);

  // ── Domain-based root routing ──
  // Each custom domain's '/' serves its own brand-specific page
  if (url.pathname === '/') {
    if (cfg.primarySlug && cfg.primarySlug !== '/') {
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
