import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export const runtime = 'edge';

// ── Kohinoor "K" Favicon — Official Red Box with Signature "K" Insignia ──
const KOHINOOR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bgK" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0D0818;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#170e28;stop-opacity:1" />
    </linearGradient>
  </defs>
  <!-- Dark Rounded Container -->
  <rect width="100" height="100" rx="20" fill="url(#bgK)"/>
  <!-- Kohinoor Signature Red Box -->
  <rect x="14" y="24" width="72" height="72" rx="10" fill="#EF412F"/>
  <!-- Signature Geometric 'K' Mark -->
  <g transform="matrix(0.95 0 0 0.95 2 2)">
    <path fill="#FFFFFF" d="M28.36,66.48l27.83,14.27c2.16,1.11,4.8.26,5.91-1.9,1.11-2.15.26-4.8-1.9-5.9l-27.83-14.27c-2.16-1.1-4.8-.25-5.91,1.9-1.1,2.16-.25,4.81,1.9,5.91"/>
    <path fill="#FFFFFF" d="M31.16,3.18L10.21,75.72c-.54,1.88.22,3.89,1.89,4.93,1.66,1.04,3.81.85,5.27-.46l43.77-39.43c1.8-1.62,1.95-4.4.32-6.2-1.62-1.8-4.4-1.95-6.2-.32l-32.35,29.15L39.59,5.61c.67-2.33-.67-4.77-3-5.44-2.33-.67-4.76.67-5.43,3"/>
  </g>
</svg>`;

// ── Mahalaxmi "M" Favicon — Official Golden 'M' Lotus Wings Emblem ──
const MAHALAXMI_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bgM" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0D0818;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1c102c;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="goldM" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#F5D77F;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#D7AF3E;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#B88E28;stop-opacity:1" />
    </linearGradient>
  </defs>
  <!-- Dark Rounded Container -->
  <rect width="100" height="100" rx="20" fill="url(#bgM)"/>
  <!-- Golden Border Accent -->
  <rect x="3" y="3" width="94" height="94" rx="17" fill="none" stroke="url(#goldM)" stroke-width="1.5" opacity="0.4"/>
  <!-- Mahalaxmi 'M' Signature Emblem (scaled from original logo) -->
  <g transform="matrix(0.68 0 0 0.68 -8 18)" fill="url(#goldM)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M139.66 88.87H126.52C105.27 88.87 96.9 70.86 96.9 52.3V18.9C97.17 18.9 97.44 18.9 97.7 18.9C111.48 19.2 122.41 30.65 122.41 44.43V52.29C122.41 57.44 123.01 62.35 124.18 66.87C125.47 71.82 127.42 76.2 129.99 79.89C132.64 83.69 135.89 86.7 139.67 88.86L139.66 88.87Z" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M156.14 36.57V88.87C134.89 88.87 126.52 70.86 126.52 52.3V0C147.78 0 156.14 18.02 156.14 36.57Z" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M176.74 88.87H189.88C211.13 88.87 219.5 70.86 219.5 52.3V18.9C219.23 18.9 218.96 18.9 218.7 18.9C204.92 19.2 193.99 30.65 193.99 44.43V52.29C193.99 57.44 193.39 62.35 192.22 66.87C190.93 71.82 188.98 76.2 186.41 79.89C183.76 83.69 180.51 86.7 176.73 88.86L176.74 88.87Z" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M160.26 36.57V88.87C181.51 88.87 189.88 70.86 189.88 52.3V0C168.62 0 160.26 18.02 160.26 36.57Z" />
  </g>
</svg>`;

export async function GET() {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const cfg = getDomainConfig(host);

  const isKohinoor = cfg.brand.toLowerCase().includes('kohinoor');
  const svg = isKohinoor ? KOHINOOR_SVG : MAHALAXMI_SVG;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
