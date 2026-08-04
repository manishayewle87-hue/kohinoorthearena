// ─────────────────────────────────────────────────────────────────
// DOMAIN CONFIGURATION — Single Source of Truth
//
// Both kohinoorthearena.in and mahalaxmithearena.in are served from
// the same Next.js codebase. This file controls exactly how each
// domain behaves: its SEO metadata, schema, brand, and routing.
// ─────────────────────────────────────────────────────────────────

export type DomainConfig = {
  brand: string;               // Developer / builder name
  coDevName: string;           // Joint venture partner name
  projectName: string;         // Full project name
  arenaName: string;           // Short display name for the arena
  tagline: string;
  canonical: string;
  sitemapUrl: string;
  ogImage: string;
  title: string;
  description: string;
  keywords: string[];
  primarySlug: string;         // The page this domain's root '/' maps to
  mahaRera: string;
  contactPhone: string;
  address: {
    street: string;
    locality: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    landmark: string;
  };
  projectConfig: {
    towers: number;
    units: number;
    floors: number;
    sportsSqFt: string;
    startingPrice: string;
    topPrice: string;
    bhkOptions: string;        // e.g. '2, 3 & 4 BHK'
    possessionYear: string;
    managedBy: string;         // Sports management company
  };
  schemaOrg: {
    websiteUrl: string;
    orgName: string;
    logoUrl: string;
  };
  googleVerification: string;
};

const SHARED_KEYWORDS = [
  'Mahalaxmi The Arena', 'Kohinoor The Arena', 'Life in Motion Pimpri',
  'Pimpri Real Estate', 'PCMC real estate', 'Flats in Pimpri',
  'Luxury apartments in Pimpri', 'Buy flat in Pimpri', '2 BHK in Pimpri',
  '3 BHK in Pimpri', '4 BHK flats in Pimpri', 'Premium apartments PCMC',
  'Flats near PCMC Metro', 'Sports township Pimpri', 'New launch Pimpri',
];

export const DOMAIN_CONFIGS: Record<string, DomainConfig> = {
  // ── Kohinoor Domain ───────────────────────────────────────────
  'kohinoorthearena.in': {
    brand: 'Kohinoor Group',
    coDevName: 'Mahalaxmi Group',
    projectName: 'Kohinoor The Arena',
    arenaName: 'Kohinoor The Arena',
    tagline: 'Life in Motion | Pimpri Chinchwad, Pune',
    canonical: 'https://kohinoorthearena.in',
    sitemapUrl: 'https://kohinoorthearena.in/sitemap.xml',
    ogImage: 'https://kohinoorthearena.in/assets/images/hero.jpg',
    title: 'Kohinoor The Arena by Kohinoor Group | Life in Motion | 2, 3 & 4 BHK in Pimpri Chinchwad, Pune',
    description: 'Kohinoor The Arena by Kohinoor Group — PCMC\'s premier sports township in Pimpri Chinchwad, Pune. Premium 2, 3 & 4 BHK luxury residences across 11 towers with an 80,000 Sq. Ft. sports ecosystem managed by ILESEUM. MahaRERA registered.',
    keywords: [
      'Kohinoor The Arena',
      'Kohinoor Group Pimpri',
      'Kohinoor Group Pimpri Chinchwad',
      'Kohinoor Arena PCMC',
      'Kohinoor Arena Pune',
      'Kohinoor Group real estate Pune',
      'Kohinoor Arena 2 BHK Pimpri',
      'Kohinoor Arena 3 BHK Pimpri Chinchwad',
      'Kohinoor Arena 4 BHK PCMC',
      'Life in Motion Pimpri Chinchwad',
      ...SHARED_KEYWORDS,
    ],
    primarySlug: '/kohinoor-the-arena-pimpri-chinchwad-pune',
    mahaRera: 'P5210005XXXX',
    contactPhone: '+91-XXXXXXXXXX',
    address: {
      street: 'The Arena, Sports Township, Pimpri',
      locality: 'Pimpri-Chinchwad',
      city: 'Pune',
      region: 'Maharashtra',
      postalCode: '411018',
      country: 'IN',
      landmark: '2.4 km from PCMC Metro Station',
    },
    projectConfig: {
      towers: 11,
      units: 2500,
      floors: 30,
      sportsSqFt: '80,000',
      startingPrice: '₹88.5 L',
      topPrice: '₹2.15 Cr',
      bhkOptions: '2, 3 & 4 BHK',
      possessionYear: '2027',
      managedBy: 'ILESEUM Sports Management',
    },
    schemaOrg: {
      websiteUrl: 'https://kohinoorthearena.in',
      orgName: 'Kohinoor Group',
      logoUrl: 'https://kohinoorthearena.in/assets/images/kohinoor-logo.svg',
    },
    googleVerification: '2ra2pGDEk6-2G2LYEGVQG6f5zRnF_3UG_gMJWAwAbE8',
  },

  // ── Mahalaxmi Domain ──────────────────────────────────────────
  'mahalaxmithearena.in': {
    brand: 'Mahalaxmi Group',
    coDevName: 'Kohinoor Group',
    projectName: 'Mahalaxmi The Arena',
    arenaName: 'Mahalaxmi The Arena',
    tagline: 'Life in Motion | Pimpri, Pune',
    canonical: 'https://mahalaxmithearena.in',
    sitemapUrl: 'https://mahalaxmithearena.in/sitemap.xml',
    ogImage: 'https://mahalaxmithearena.in/assets/images/hero.jpg',
    title: 'Mahalaxmi The Arena by Mahalaxmi Group | Life in Motion | 2, 3 & 4 BHK in Pimpri, Pune',
    description: 'Mahalaxmi The Arena by Mahalaxmi Group — Pimpri\'s ultra-modern sports township in Pune. Premium 2, 3 & 4 BHK luxury apartments across 11 towers with an 80,000 Sq. Ft. active sports ecosystem managed by ILESEUM. MahaRERA registered.',
    keywords: [
      'Mahalaxmi The Arena',
      'Mahalaxmi Group Pimpri',
      'Mahalaxmi Group Pune',
      'Mahalaxmi Arena PCMC',
      'Mahalaxmi Group real estate Pune',
      'Mahalaxmi Arena 2 BHK Pimpri',
      'Mahalaxmi Arena 3 BHK Pune',
      'Mahalaxmi Arena 4 BHK PCMC',
      'Life in Motion Pimpri Pune',
      ...SHARED_KEYWORDS,
    ],
    primarySlug: '/mahalaxmi-the-arena-luxury-flats-in-pimpri',
    mahaRera: 'P5210005XXXX',
    contactPhone: '+91-XXXXXXXXXX',
    address: {
      street: 'The Arena, Sports Township, Pimpri',
      locality: 'Pimpri',
      city: 'Pune',
      region: 'Maharashtra',
      postalCode: '411018',
      country: 'IN',
      landmark: '2.4 km from PCMC Metro Station',
    },
    projectConfig: {
      towers: 11,
      units: 2500,
      floors: 30,
      sportsSqFt: '80,000',
      startingPrice: '₹88.5 L',
      topPrice: '₹2.15 Cr',
      bhkOptions: '2, 3 & 4 BHK',
      possessionYear: '2027',
      managedBy: 'ILESEUM Sports Management',
    },
    schemaOrg: {
      websiteUrl: 'https://mahalaxmithearena.in',
      orgName: 'Mahalaxmi Group',
      logoUrl: 'https://mahalaxmithearena.in/assets/images/mahalaxmi-logo.svg',
    },
    // mahalaxmithearena.in Google Search Console verified ✅
    googleVerification: '_px3Bz_W6ls9fFGFy-vocVmcJ-t5mcdVUjo5T2B9TY0',
  },
};

// Fallback for vercel.app preview / localhost
const FALLBACK_CONFIG: DomainConfig = DOMAIN_CONFIGS['kohinoorthearena.in'];

export function getDomainConfig(host: string): DomainConfig {
  // Strip port for localhost development
  const cleanHost = host.split(':')[0];

  // Exact match first
  if (DOMAIN_CONFIGS[cleanHost]) return DOMAIN_CONFIGS[cleanHost];

  // Partial match (handles www. prefix)
  for (const [key, config] of Object.entries(DOMAIN_CONFIGS)) {
    if (cleanHost.includes(key) || cleanHost.includes(key.replace('www.', ''))) {
      return config;
    }
  }

  return FALLBACK_CONFIG;
}

// Returns all canonical URLs across all domains (used by cron job for Indexing API)
export const ALL_DOMAINS = Object.values(DOMAIN_CONFIGS).map(c => c.canonical);
