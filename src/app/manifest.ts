import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mahalaxmi The Arena',
    short_name: 'The Arena',
    description: 'Premium 2, 3 & 4 BHK Sports Township in PCMC, Pune.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D0818',
    theme_color: '#DFFE00',
    icons: [
      {
        src: '/assets/images/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/assets/images/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/images/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      }
    ],
  };
}
