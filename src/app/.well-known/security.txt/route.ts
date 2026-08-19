import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export const runtime = 'edge';

export async function GET() {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);

  const securityTxt = `Contact: mailto:security@${cfg.canonical.replace('https://www.', '')}
Contact: https://${cfg.canonical.replace('https://', '')}/privacy-policy
Expires: 2027-12-31T23:59:59.000Z
Preferred-Languages: en, mr, hi
Canonical: ${cfg.canonical}/.well-known/security.txt
Policy: ${cfg.canonical}/privacy-policy
Hiring: ${cfg.canonical}/careers
Acknowledgments: ${cfg.canonical}/humans.txt
`;

  return new NextResponse(securityTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=604800, s-maxage=604800',
    },
  });
}
