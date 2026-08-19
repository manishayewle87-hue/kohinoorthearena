// ─────────────────────────────────────────────────────────────────
// Automated SEO & Google Ecosystem Verification Suite
// ─────────────────────────────────────────────────────────────────

import { generatePSEOMatrix } from '../src/lib/pseo-data.ts';
import { DOMAIN_CONFIGS } from '../src/lib/domain-config.ts';

console.log('\n🔍 RUNNING ULTRA SEO & DUAL-DOMAIN AUDIT SUITE...\n');

let errors = 0;
let passes = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passes++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    errors++;
  }
}

// 1. Check Domains Configuration
const domains = Object.keys(DOMAIN_CONFIGS);
assert(domains.includes('kohinoorthearena.in'), 'Domain kohinoorthearena.in exists in config');
assert(domains.includes('mahalaxmithearena.in'), 'Domain mahalaxmithearena.in exists in config');

for (const [d, cfg] of Object.entries(DOMAIN_CONFIGS)) {
  assert(cfg.canonical.startsWith('https://www.'), `${d} canonical has https://www. prefix`);
  assert(cfg.mahaRera.length > 5, `${d} has valid MahaRERA registration number`);
  assert(cfg.keywords.length >= 20, `${d} has enriched keyword bank (${cfg.keywords.length} terms)`);
  assert(cfg.sameAs.length >= 5, `${d} has knowledge graph sameAs links`);
  assert(cfg.address.landmark.includes('PCMC Metro'), `${d} includes PCMC Metro landmark`);
}

// 2. Check PSEO Matrix Generation
const matrix = generatePSEOMatrix();
assert(matrix.length >= 10000, `PSEO matrix generated ${matrix.length} high-intent pages`);

// Verify Master Keyword Hub pages exist
const expectedSlugs = [
  'mahalaxmi-kohinoor-pimpri',
  'mahalaxmi-kohinoor-2-bhk-pimpri',
  'mahalaxmi-kohinoor-3-bhk-pimpri',
  'flats-near-pcmc-metro-station-pimpri',
  '2-bhk-near-pcmc-metro-pimpri',
  'property-near-kohinoor-world-towers-pimpri',
  'pimpri-madhe-flat-kharedi',
  'pcmc-metro-javal-flat',
  'mahalaxmi-kohinoor-price-list-and-floor-plans',
  'pimpri-real-estate-investment-guide-2026',
];

for (const slug of expectedSlugs) {
  const found = matrix.find(p => p.slug === slug);
  assert(!!found, `Master Keyword Hub page exists: /${slug}`);
}

// Check for slug uniqueness
const slugSet = new Set(matrix.map(p => p.slug));
assert(slugSet.size === matrix.length, `All ${matrix.length} PSEO slugs are strictly unique (no duplicate URLs)`);

console.log(`\n========================================`);
console.log(`AUDIT RESULTS: ${passes} Passed | ${errors} Failed`);
console.log(`========================================\n`);

if (errors > 0) {
  process.exit(1);
} else {
  console.log('🌟 ALL SEO AUDIT ASSERTIONS COMPLIED WITH 100% SUCCESS.\n');
}
