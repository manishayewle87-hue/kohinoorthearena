import { NextResponse } from 'next/server';
import { getDomainConfig } from '@/lib/domain-config';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const host = request.headers.get('host') || 'kohinoorthearena.in';
  const cfg = getDomainConfig(host);

  const txt = `/* TEAM */
Developer: ${cfg.brand}
Joint Venture: ${cfg.coDevName}
Project: ${cfg.projectName}
Location: ${cfg.address.locality}, ${cfg.address.city}, ${cfg.address.country}
Contact: ${cfg.contactPhone}

/* SITE */
Last update: ${new Date().toISOString().split('T')[0]}
Language: English
MahaRERA: ${cfg.mahaRera}
Canonical URL: ${cfg.canonical}
Doctype: HTML5
IDE: Antigravity IDE

/* SOCIAL & GRAPH */
SameAs:
${cfg.sameAs.join('\n')}
`;

  return new NextResponse(txt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
