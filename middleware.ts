import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getDomainConfig } from '@/lib/domain-config';

export function middleware(request: NextRequest) {
  try {
    const hostname = request.headers.get('host') || '';
    
    // Use Vercel's host if x-forwarded-host is present
    const forwardedHost = request.headers.get('x-forwarded-host');
    const finalHost = forwardedHost || hostname;

    // ── Get domain config for this host ──
    const cfg = getDomainConfig(finalHost);

    // ── Inject x-domain header so Server Components can read domain without calling headers() ──
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-arena-domain', finalHost);
    requestHeaders.set('x-arena-brand', cfg.brand);
    requestHeaders.set('x-arena-canonical', cfg.canonical);

    // ── Domain-based root routing ──
    if (request.nextUrl.pathname === '/') {
      if (cfg.primarySlug && cfg.primarySlug !== '/') {
        // Use the native NextURL constructor for safe rewrites on Vercel Edge
        const rewriteUrl = new URL(cfg.primarySlug, request.url);
        return NextResponse.rewrite(rewriteUrl, {
          request: { headers: requestHeaders },
        });
      }
    }

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (error) {
    console.error('Middleware crash protected:', error);
    const response = NextResponse.next();
    response.headers.set('x-middleware-protected', 'true');
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
