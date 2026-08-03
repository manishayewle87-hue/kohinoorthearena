import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Get hostname from the request (e.g. kohinoorthearena.in, mahalaxmithearena.in)
  const hostname = request.headers.get('host') || '';

  // Only rewrite the root path '/' to serve different silos
  if (url.pathname === '/') {
    if (hostname.includes('kohinoorthearena.in')) {
      url.pathname = '/kohinoor-the-arena-pimpri-chinchwad-pune';
      return NextResponse.rewrite(url);
    } 
    
    if (hostname.includes('mahalaxmithearena.in')) {
      url.pathname = '/mahalaxmi-the-arena-luxury-flats-in-pimpri';
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (public assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
