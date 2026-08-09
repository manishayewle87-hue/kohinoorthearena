import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getDomainConfig } from '@/lib/domain-config';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // ── 1. SEO Consolidation: Strip www. and 301 Redirect ──
  if (hostname.startsWith('www.')) {
    const strippedHostname = hostname.replace(/^www\./, '');
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const redirectUrl = `${protocol}://${strippedHostname}${url.pathname}${url.search}`;
    return NextResponse.redirect(redirectUrl, 301);
  }

  // ── 2. Domain Firewall: Prevent Spoofing ──
  // Strip port for localhost development
  const cleanHost = hostname.split(':')[0];
  const isVercelPreview = cleanHost.endsWith('.vercel.app');
  const isLocalhost = cleanHost === 'localhost' || cleanHost === '127.0.0.1';
  
  // Acceptable primary domains
  const ALLOWED_DOMAINS = ['kohinoorthearena.in', 'mahalaxmithearena.in'];
  
  // If traffic hits an unauthorized domain (not allowed, not Vercel, not local)
  if (!ALLOWED_DOMAINS.includes(cleanHost) && !isVercelPreview && !isLocalhost) {
    // 301 redirect rogue domains back to the primary brand to capture SEO equity
    url.hostname = 'kohinoorthearena.in';
    return NextResponse.redirect(url, 301);
  }

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
