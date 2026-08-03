// ─────────────────────────────────────────────────────────────────
// DOMAIN CONFIGURATION — Single Source of Truth
//
// Both kohinoorthearena.in and mahalaxmithearena.in are served from
// the same Next.js codebase. This file controls exactly how each
// domain behaves: its SEO metadata, schema, brand, and routing.
// ─────────────────────────────────────────────────────────────────

export type DomainConfig = {
  brand: string;
  projectName: string;
  tagline: string;
  canonical: string;
  sitemapUrl: string;
  ogImage: string;
  title: string;
  description: string;
  keywords: string[];
  primarySlug: string; // The page this domain's root '/' maps to
  mahaRera: string;
  contactPhone: string;
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
    projectName: 'Kohinoor The Arena',
    tagline: 'Life in Motion | Pimpri Chinchwad',
    canonical: 'https://kohinoorthearena.in',
    sitemapUrl: 'https://kohinoorthearena.in/sitemap.xml',
    ogImage: 'https://kohinoorthearena.in/assets/images/hero.jpg',
    title: 'Kohinoor The Arena | Life in Motion | 2, 3 & 4 BHK in Pimpri Chinchwad',
    description: 'Kohinoor The Arena — PCMC\'s premier sports township. Premium 2, 3 & 4 BHK luxury residences across 11 towers with an 80,000 Sq. Ft. sports ecosystem managed by ILESEUM in Pimpri Chinchwad, Pune.',
    keywords: ['Kohinoor The Arena', 'Kohinoor Pimpri', 'Kohinoor PCMC', ...SHARED_KEYWORDS],
    primarySlug: '/kohinoor-the-arena-pimpri-chinchwad-pune',
    mahaRera: 'P5210005XXXX',
    contactPhone: '+91-XXXXXXXXXX',
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
    projectName: 'Mahalaxmi The Arena',
    tagline: 'Life in Motion | Pimpri, Pune',
    canonical: 'https://mahalaxmithearena.in',
    sitemapUrl: 'https://mahalaxmithearena.in/sitemap.xml',
    ogImage: 'https://mahalaxmithearena.in/assets/images/hero.jpg',
    title: 'Mahalaxmi The Arena | Life in Motion | 2, 3 & 4 BHK in Pimpri, Pune',
    description: 'Mahalaxmi The Arena — Pimpri\'s ultra-modern sports township. Premium 2, 3 & 4 BHK luxury apartments across 11 towers with an 80,000 Sq. Ft. active sports ecosystem managed by ILESEUM in Pimpri, Pune.',
    keywords: ['Mahalaxmi The Arena', 'Mahalaxmi Pimpri', 'Mahalaxmi real estate Pune', ...SHARED_KEYWORDS],
    primarySlug: '/mahalaxmi-the-arena-luxury-flats-in-pimpri',
    mahaRera: 'P5210005XXXX',
    contactPhone: '+91-XXXXXXXXXX',
    schemaOrg: {
      websiteUrl: 'https://mahalaxmithearena.in',
      orgName: 'Mahalaxmi Group',
      logoUrl: 'https://mahalaxmithearena.in/assets/images/mahalaxmi-logo.svg',
    },
    // ⚠️ ACTION REQUIRED: Add mahalaxmithearena.in to Google Search Console separately
    // and replace this with the verification code from:
    // GSC → Settings → Ownership Verification → HTML Tag method
    googleVerification: '2ra2pGDEk6-2G2LYEGVQG6f5zRnF_3UG_gMJWAwAbE8', // Replace with mahalaxmithearena.in GSC code
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
