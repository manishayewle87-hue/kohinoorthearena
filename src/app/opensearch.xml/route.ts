import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export const runtime = 'edge';

export async function GET() {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>${cfg.projectName}</ShortName>
  <Description>Search 2, 3 &amp; 4 BHK luxury residences and sports township properties in Pimpri Chinchwad, Pune by ${cfg.brand}.</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <OutputEncoding>UTF-8</OutputEncoding>
  <Image width="16" height="16" type="image/svg+xml">${cfg.canonical}/api/favicon</Image>
  <Url type="text/html" template="${cfg.canonical}/blog?q={searchTerms}"/>
  <Url type="application/opensearchdescription+xml" rel="self" template="${cfg.canonical}/opensearch.xml"/>
  <Contact>info@${cfg.canonical.replace('https://www.', '')}</Contact>
  <Developer>${cfg.brand} &amp; ${cfg.coDevName}</Developer>
  <Attribution>&copy; 2026 ${cfg.projectName}. All rights reserved.</Attribution>
  <AdultContent>false</AdultContent>
  <Language>en-IN</Language>
</OpenSearchDescription>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/opensearchdescription+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
