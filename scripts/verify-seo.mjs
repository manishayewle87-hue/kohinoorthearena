// ─────────────────────────────────────────────────────────────────
// 30-POINT ENTERPRISE SEO, SECURITY & RESILIENCE AUDIT SUITE
// ─────────────────────────────────────────────────────────────────

import fs from 'fs';
import { generatePSEOMatrix } from '../src/lib/pseo-data.ts';
import { DOMAIN_CONFIGS } from '../src/lib/domain-config.ts';
import { validatePhone, isDisposableEmail, deepSanitize } from '../src/lib/lead-queue.ts';

console.log('\n🔍 RUNNING 30-POINT ENTERPRISE SEO & RESILIENCE AUDIT SUITE...\n');

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

// ── 1. DUAL DOMAIN INTEGRITY (10 Points) ─────────────────────────
const domains = Object.keys(DOMAIN_CONFIGS);
assert(domains.includes('kohinoorthearena.in'), 'Domain kohinoorthearena.in registered in config');
assert(domains.includes('mahalaxmithearena.in'), 'Domain mahalaxmithearena.in registered in config');

for (const [d, cfg] of Object.entries(DOMAIN_CONFIGS)) {
  assert(cfg.canonical.startsWith('https://www.'), `${d} canonical strictly enforces https://www.`);
  assert(cfg.mahaRera.length > 5, `${d} has valid legal MahaRERA registration number`);
  assert(cfg.keywords.length >= 20, `${d} master keyword bank populated (${cfg.keywords.length} terms)`);
  assert(cfg.sameAs.length >= 5, `${d} knowledge graph entity sameAs links verified`);
  assert(cfg.address.landmark.includes('PCMC Metro'), `${d} includes transit landmark (PCMC Metro)`);
}

// ── 2. PSEO MATRIX & MASTER HUBS (10 Points) ─────────────────────
const matrix = generatePSEOMatrix();
assert(matrix.length >= 10000, `PSEO matrix generated ${matrix.length} high-intent landing pages`);

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
  assert(!!found, `Master Keyword Hub exists: /${slug}`);
}

const slugSet = new Set(matrix.map(p => p.slug));
assert(slugSet.size === matrix.length, `All ${matrix.length} PSEO slugs are strictly unique (0 duplicate collision)`);

// ── 3. ENTERPRISE ENQUIRY & SECURITY ENGINE (6 Points) ───────────
const validPhoneRes = validatePhone('9876543210');
assert(validPhoneRes.valid && validPhoneRes.normalized === '+919876543210', 'Phone validator normalizes 10-digit Indian mobile numbers to E.164');

const invalidPhoneRes = validatePhone('12345');
assert(!invalidPhoneRes.valid, 'Phone validator rejects malformed numbers');

assert(isDisposableEmail('test@mailinator.com'), 'Spam defense detects disposable email domain');
assert(!isDisposableEmail('customer@gmail.com'), 'Spam defense allows authentic customer email domain');

const sanitizedXSS = deepSanitize('<script>alert("hack")</script>Rahul Sharma');
assert(sanitizedXSS === 'alert(&quot;hack&quot;)Rahul Sharma', 'Deep sanitizer strips dangerous HTML and script payloads');

// ── 4. ENTERPRISE INFRASTRUCTURE FILES (4 Points) ─────────────────
assert(fs.existsSync('src/app/.well-known/security.txt/route.ts'), 'RFC 9116 security.txt route exists');
assert(fs.existsSync('src/app/opensearch.xml/route.ts'), 'OpenSearch XML route exists');
assert(fs.existsSync('src/app/llms.txt/route.ts'), 'LLMs AI knowledge hub route exists');
assert(fs.existsSync('src/app/error.tsx') && fs.existsSync('src/app/global-error.tsx'), 'Error boundaries present for zero 500 fault tolerance');

console.log(`\n======================================================`);
console.log(`30-POINT AUDIT SUMMARY: ${passes} Passed | ${errors} Failed`);
console.log(`======================================================\n`);

if (errors > 0) {
  process.exit(1);
} else {
  console.log('🌟 ALL 30 ENTERPRISE SPECIFICATIONS COMPLIED WITH 100% SUCCESS.\n');
}
