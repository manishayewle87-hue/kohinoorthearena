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
  ga4Id: string;           // GA4 Measurement ID from env
  metaPixelId: string;     // Meta Pixel ID from env
  aggregateRating: {
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
  };
  sameAs: string[];        // Knowledge Graph entity links
};

// ── Master Keyword Bank (Google, AI Search & Multilingual Search Compliance) ──
const MASTER_SHARED_KEYWORDS = [
  // 1. Core Project & Joint Venture
  'Mahalaxmi Kohinoor Pimpri', 'Mahalaxmi Kohinoor Pimpri Pune', 'Mahalaxmi Kohinoor project',
  'Mahalaxmi Kohinoor project Pimpri', 'Mahalaxmi Kohinoor Life in Motion', 'Life in Motion Pimpri',
  'Life in Motion Pune', 'Life in Motion Mahalaxmi Kohinoor', 'Mahalaxmi Group Kohinoor Group Pimpri',
  'Mahalaxmi Kohinoor township', 'Mahalaxmi Kohinoor sports township', 'Mahalaxmi Kohinoor residential project',
  'Mahalaxmi Kohinoor new project', 'Mahalaxmi Kohinoor upcoming project', 'Mahalaxmi Kohinoor new launch',
  'Mahalaxmi Kohinoor pre launch', 'Mahalaxmi Kohinoor booking', 'Mahalaxmi Kohinoor property',
  'Mahalaxmi Kohinoor flats', 'Mahalaxmi Kohinoor apartments', 'Mahalaxmi Kohinoor homes',

  // 2. Life in Motion Brand Signals
  'Life in Motion Chinchwad', 'Life in Motion PCMC', 'Life in Motion residential project',
  'Life in Motion apartments', 'Life in Motion flats', 'Life in Motion township',
  'Life in Motion price', 'Life in Motion floor plan', 'Life in Motion brochure',
  'Life in Motion amenities', 'Life in Motion location', 'Life in Motion RERA',

  // 3. Configurations (2 BHK & 3 BHK)
  'Mahalaxmi Kohinoor 2 BHK', 'Mahalaxmi Kohinoor 2 BHK Pimpri', 'Mahalaxmi Kohinoor 2 BHK Pune',
  'Mahalaxmi Kohinoor 2 BHK price', 'Mahalaxmi Kohinoor 2 BHK booking', 'Mahalaxmi Kohinoor 2 BHK floor plan',
  'Mahalaxmi Kohinoor 3 BHK', 'Mahalaxmi Kohinoor 3 BHK Pimpri', 'Mahalaxmi Kohinoor 3 BHK Pune',
  'Mahalaxmi Kohinoor 3 BHK price', 'Mahalaxmi Kohinoor 3 BHK booking', 'Mahalaxmi Kohinoor 3 BHK floor plan',
  'Life in Motion 2 BHK', 'Life in Motion 2 BHK Pimpri', 'Life in Motion 3 BHK', 'Life in Motion 3 BHK Pimpri',
  '2 BHK flats in Pimpri', '2 BHK flats in Pimpri Pune', '3 BHK flats in Pimpri', '3 BHK flats in Pimpri Pune',
  '2 BHK apartments in Pimpri', '3 BHK apartments in Pimpri', 'luxury 2 BHK Pimpri', 'luxury 3 BHK Pimpri',
  'premium 2 BHK Pimpri', 'premium 3 BHK Pimpri', 'spacious 2 BHK Pimpri', 'spacious 3 BHK Pimpri',

  // 4. Landmarks & Metro Connectivity
  'flats near PCMC Metro', 'flats near PCMC Metro Station', 'apartments near PCMC Metro Station',
  'flats near Pimpri Metro', 'flats near Pimpri Metro Station', 'apartments near Pimpri Metro Station',
  'flats near Pimpri railway station', 'apartments near Pimpri railway station', 'flats near Chinchwad railway station',
  '2 BHK near PCMC Metro', '3 BHK near PCMC Metro', '2 BHK near Pimpri Metro', '3 BHK near Pimpri Metro',
  '2 BHK near Pimpri Railway Station', '3 BHK near Pimpri Railway Station',
  'residential projects near PCMC Metro', 'residential projects near Pimpri Metro',
  'property near Mumbai Pune Highway', 'flats near Old Mumbai Pune Highway',
  'flats near Aditya Birla Hospital', 'flats near Podar International School', 'flats near City One Mall',
  'flats near Bhosari MIDC', 'flats near Chakan MIDC',

  // 5. Kohinoor World Towers & Commercial Proximity
  'Kohinoor World Towers Pimpri', 'Kohinoor World Tower Pimpri', 'KWT Pimpri',
  'property near Kohinoor World Towers', 'flats near Kohinoor World Towers', 'apartments near Kohinoor World Towers',
  'residential property near Kohinoor World Towers', 'commercial property Pimpri', 'office space Pimpri',

  // 6. Purchase, Cost & Buyer Intent
  'Mahalaxmi Kohinoor price', 'Mahalaxmi Kohinoor price list', 'Mahalaxmi Kohinoor flat price',
  'Mahalaxmi Kohinoor cost', 'Mahalaxmi Kohinoor payment plan', 'Mahalaxmi Kohinoor floor plan',
  'Mahalaxmi Kohinoor brochure', 'Mahalaxmi Kohinoor location', 'Mahalaxmi Kohinoor amenities',
  'Mahalaxmi Kohinoor possession', 'Mahalaxmi Kohinoor RERA', 'Mahalaxmi Kohinoor site visit',
  'Mahalaxmi Kohinoor sample flat', 'Mahalaxmi Kohinoor reviews', 'buy flat in Pimpri', 'book flat Pimpri',

  // 7. Marathi & Hinglish High-Volume Search Keywords
  'Pimpri madhe flat', 'Pimpri madhe ghar', 'Pimpri madhe property', 'Pimpri madhye flat',
  'Pimpri madhye ghar', 'Pimpri madhe 2 BHK', 'Pimpri madhe 3 BHK', 'Pimpri madhye 2 BHK',
  'Pimpri madhye 3 BHK', 'Pimpri new project', 'Pimpri upcoming project', 'Pimpri flat booking',
  'PCMC madhe flat', 'PCMC madhye flat', 'Pimpri metro javal flat', 'Pimpri railway station javal flat',
  'Chinchwad railway station javal flat', 'PCMC metro javal flat', 'Mahalaxmi Kohinoor Pimpri Marathi',
  'Life in Motion Pimpri Marathi', 'Kohinoor Pimpri flat Marathi', 'Pimpri madhe navin flat',
  'Pimpri madhe ghar kuthe gheu', 'Pimpri madhe best flat', 'Pimpri madhe investment sathi flat',

  // 8. High-Intent Questions / Google SGE & AI Overviews
  'Mahalaxmi Kohinoor price kya hai', 'Mahalaxmi Kohinoor booking kaise kare',
  'Mahalaxmi Kohinoor location kaha hai', 'Life in Motion price kya hai', 'Pimpri mein best flat kaunsa hai',
  'Pimpri mein 2 BHK kaha milega', 'Pimpri mein 3 BHK kaha milega', 'PCMC metro ke paas flat',

  // 9. Investment & ROI
  'best property investment Pimpri', 'best real estate investment Pimpri', 'property appreciation Pimpri',
  'rental yield Pimpri property', 'sports township Pune', 'sports township Pimpri',
];

export const DOMAIN_CONFIGS: Record<string, DomainConfig> = {
  // ── Kohinoor Domain ───────────────────────────────────────────
  'kohinoorthearena.in': {
    brand: 'Kohinoor Group',
    coDevName: 'Mahalaxmi Group',
    projectName: 'Kohinoor The Arena',
    arenaName: 'Kohinoor The Arena',
    tagline: 'Life in Motion | Pimpri Chinchwad, Pune',
    canonical: 'https://www.kohinoorthearena.in',
    sitemapUrl: 'https://www.kohinoorthearena.in/sitemap.xml',
    ogImage: 'https://www.kohinoorthearena.in/assets/images/hero.jpg',
    title: 'Kohinoor The Arena by Kohinoor Group | Life in Motion | 2, 3 & 4 BHK in Pimpri Chinchwad, Pune',
    description: 'Kohinoor The Arena by Kohinoor Group & Mahalaxmi Group — PCMC\'s premier sports township in Pimpri Chinchwad, Pune. 2, 3 & 4 BHK luxury residences across 11 towers with an 80,000 Sq. Ft. active sports ecosystem managed by ILESEUM. Near PCMC Metro & KWT.',
    keywords: [
      'Kohinoor The Arena',
      'Kohinoor Pimpri',
      'Kohinoor Pune Pimpri',
      'Kohinoor project Pimpri',
      'Kohinoor residential project Pimpri',
      'Kohinoor flats Pimpri',
      'Kohinoor apartments Pimpri',
      'Kohinoor property Pimpri',
      'Kohinoor new project Pimpri',
      'Kohinoor upcoming project Pimpri',
      'Kohinoor new launch Pimpri',
      'Kohinoor World Towers Pimpri',
      'Kohinoor World Tower Pimpri',
      'Kohinoor Arena PCMC',
      'Kohinoor Arena Pune',
      'Kohinoor Group real estate Pune',
      'Kohinoor Arena 2 BHK Pimpri',
      'Kohinoor Arena 3 BHK Pimpri Chinchwad',
      'Kohinoor Arena 4 BHK PCMC',
      ...MASTER_SHARED_KEYWORDS,
    ],
    primarySlug: '/kohinoor-the-arena-pimpri',
    mahaRera: 'P5210005XXXX',
    contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91-7711993434',
    address: {
      street: 'The Arena, Sports Township, Pimpri',
      locality: 'Pimpri-Chinchwad',
      city: 'Pune',
      region: 'Maharashtra',
      postalCode: '411018',
      country: 'IN',
      landmark: '2.4 km from PCMC Metro Station, 2 km from Kohinoor World Towers',
    },
    projectConfig: {
      towers: 11,
      units: 2500,
      floors: 30,
      sportsSqFt: '80,000',
      startingPrice: '₹1.20 Cr',
      topPrice: '₹2.95 Cr',
      bhkOptions: '2, 3 & 4 BHK',
      possessionYear: '2027',
      managedBy: 'ILESEUM Sports Management',
    },
    schemaOrg: {
      websiteUrl: 'https://www.kohinoorthearena.in',
      orgName: 'Kohinoor Group',
      logoUrl: 'https://www.kohinoorthearena.in/assets/images/kohinoor-logo.svg',
    },
    googleVerification: '2ra2pGDEk6-2G2LYEGVQG6f5zRnF_3UG_gMJWAwAbE8',
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID || 'G-PLACEHOLDER',
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '0',
    aggregateRating: { ratingValue: 4.8, reviewCount: 127, bestRating: 5 },
    sameAs: [
      'https://www.facebook.com/KohinoorGroup',
      'https://www.linkedin.com/company/kohinoor-group',
      'https://www.instagram.com/kohinoor_group',
      'https://www.99acres.com/kohinoor-the-arena-pimpri-prpfid16960',
      'https://www.magicbricks.com/property-for-sale/residential-properties/pimpri-chinchwad-pune',
      'https://en.wikipedia.org/wiki/Pimpri-Chinchwad'
    ],
  },

  // ── Mahalaxmi Domain ──────────────────────────────────────────
  'mahalaxmithearena.in': {
    brand: 'Mahalaxmi Group',
    coDevName: 'Kohinoor Group',
    projectName: 'Mahalaxmi The Arena',
    arenaName: 'Mahalaxmi The Arena',
    tagline: 'Life in Motion | Pimpri, Pune',
    canonical: 'https://www.mahalaxmithearena.in',
    sitemapUrl: 'https://www.mahalaxmithearena.in/sitemap.xml',
    ogImage: 'https://www.mahalaxmithearena.in/assets/images/hero.jpg',
    title: 'Mahalaxmi The Arena by Mahalaxmi Group | Life in Motion | 2, 3 & 4 BHK in Pimpri, Pune',
    description: 'Mahalaxmi The Arena by Mahalaxmi Group & Kohinoor Group — Pimpri\'s ultra-modern sports township in Pune. 2, 3 & 4 BHK luxury residences across 11 towers with an 80,000 Sq. Ft. active sports ecosystem managed by ILESEUM. Near PCMC Metro & KWT.',
    keywords: [
      'Mahalaxmi The Arena',
      'Mahalaxmi Kohinoor Pimpri',
      'Mahalaxmi Group Pimpri',
      'Mahalaxmi Group Pune',
      'Mahalaxmi Arena PCMC',
      'Mahalaxmi Group real estate Pune',
      'Mahalaxmi Arena 2 BHK Pimpri',
      'Mahalaxmi Arena 3 BHK Pune',
      'Mahalaxmi Arena 4 BHK PCMC',
      'Life in Motion Pimpri Pune',
      'Mahalaxmi Kohinoor township',
      'Mahalaxmi Kohinoor project',
      ...MASTER_SHARED_KEYWORDS,
    ],
    primarySlug: '/mahalaxmi-the-arena-pimpri',
    mahaRera: 'P5210005XXXX',
    contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91-7711993434',
    address: {
      street: 'The Arena, Sports Township, Pimpri',
      locality: 'Pimpri',
      city: 'Pune',
      region: 'Maharashtra',
      postalCode: '411018',
      country: 'IN',
      landmark: '2.4 km from PCMC Metro Station, 2 km from Kohinoor World Towers',
    },
    projectConfig: {
      towers: 11,
      units: 2500,
      floors: 30,
      sportsSqFt: '80,000',
      startingPrice: '₹1.20 Cr',
      topPrice: '₹2.95 Cr',
      bhkOptions: '2, 3 & 4 BHK',
      possessionYear: '2027',
      managedBy: 'ILESEUM Sports Management',
    },
    schemaOrg: {
      websiteUrl: 'https://www.mahalaxmithearena.in',
      orgName: 'Mahalaxmi Group',
      logoUrl: 'https://www.mahalaxmithearena.in/assets/images/mahalaxmi-logo.svg',
    },
    googleVerification: '_px3Bz_W6ls9fFGFy-vocVmcJ-t5mcdVUjo5T2B9TY0',
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID || 'G-PLACEHOLDER',
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '0',
    aggregateRating: { ratingValue: 4.8, reviewCount: 127, bestRating: 5 },
    sameAs: [
      'https://www.facebook.com/MahalaxmiGroup',
      'https://www.linkedin.com/company/mahalaxmi-group',
      'https://www.instagram.com/mahalaxmi_group',
      'https://www.99acres.com/mahalaxmi-the-arena-pimpri',
      'https://www.magicbricks.com/property-for-sale/residential-properties/pimpri-chinchwad-pune',
      'https://en.wikipedia.org/wiki/Pimpri-Chinchwad'
    ],
  },
};

// Fallback for vercel.app preview / localhost
const FALLBACK_CONFIG: DomainConfig = DOMAIN_CONFIGS['kohinoorthearena.in'];

export function getDomainConfig(host: string): DomainConfig {
  const cleanHost = host.split(':')[0].toLowerCase();

  // 1. Exact match
  if (DOMAIN_CONFIGS[cleanHost]) return DOMAIN_CONFIGS[cleanHost];

  // 2. Strip www. prefix and match
  const withoutWww = cleanHost.replace(/^www\./, '');
  if (DOMAIN_CONFIGS[withoutWww]) return DOMAIN_CONFIGS[withoutWww];

  return FALLBACK_CONFIG;
}

// Returns all canonical URLs across all domains
export const ALL_DOMAINS = Object.values(DOMAIN_CONFIGS).map(c => c.canonical);
