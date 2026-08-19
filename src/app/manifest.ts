import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getDomainConfig } from '@/lib/domain-config';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const headersList = await headers();
  const host = headersList.get('host') || 'kohinoorthearena.vercel.app';
  const cfg = getDomainConfig(host);

  return {
    name: `${cfg.projectName} by ${cfg.brand}`,
    short_name: cfg.arenaName,
    description: cfg.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0D0818',
    theme_color: '#DFFE00',
    icons: [
      {
        src: '/api/favicon',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
