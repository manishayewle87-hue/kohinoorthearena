export type PSEOPageData = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keyword: string;
  price: string;
  bhk: string;
  location: string;
  category: string;
};

// ── 65 Micro-Markets: Pimpri Chinchwad + Pune Corridor ────────────────
const MICRO_MARKETS = [
  // Core PCMC
  "pimpri", "chinchwad", "akurdi", "nigdi", "pradhikaran", "ravet", "punawale",
  "tathawade", "wakad", "moshi", "dudulgaon", "talawade", "thergaon",
  "pimple-saudagar", "pimple-nilakh", "sangvi", "bhosari", "charholi", "dehu-road",
  "mamurdi", "pcmc", "hinjewadi", "hinjewadi-phase-1", "hinjewadi-phase-2",
  "hinjewadi-phase-3", "baner", "balewadi", "aundh", "pashan", "sus", "bavdhan",
  "kiwale", "marunji", "nerhe", "kasarsai", "chakan", "talegaon", "vadgaon-maval",
  "khed-shivapur", "shirgaon", "gahunje", "bhumkar-chowk", "dange-chowk",
  "kalewadi", "pimple-gurav", "nashik-phata", "ksb-chowk", "chikhali", "chinchwad-station",
  "pimpri-station", "finolex-chowk", "nehrunagar", "sant-tukaram-nagar",
  "vallabhnagar", "kasarwadi", "dapodi", "bopkhel", "dighi", "alandi", "markal",
  // NEW: Extended Pune corridor high-search areas
  "hadapsar", "kharadi", "magarpatta", "viman-nagar", "koregaon-park",
  "kalyani-nagar", "undri", "kondhwa", "wanowrie", "bibwewadi",
  "warje", "kothrud", "deccan", "erandwane", "pune-cantonment",
];

// ── Competitor Context (E-E-A-T comparison targeting) ─────────────────
const COMPETITOR_CONTEXT: Record<string, string> = {
  "pimpri": "Superior to Mahindra Lifespaces and Kohinoor Shangrila in sports infrastructure.",
  "wakad": "Vastly superior sports amenities vs standard Wakad gated communities.",
  "hinjewadi": "Only 15 minutes from Hinjewadi IT Park, without the congestion premium.",
  "pcmc": "The definitive crown jewel of PCMC real estate.",
  "chinchwad": "A master-planned alternative to cramped Chinchwad-station developments.",
  "ravet": "80,000 Sq.Ft. of sports space unavailable in any other Ravet project.",
  "baner": "Premium sports township vs. standard Baner high-rises at same price bracket.",
  "kharadi": "Better ROI and rental yield than Kharadi IT corridor apartments.",
  "viman-nagar": "Airport proximity and metro access without Viman Nagar price inflation.",
  "hadapsar": "Sports township lifestyle not found in Hadapsar residential projects.",
  "koregaon-park": "World-class sports infrastructure at half the Koregaon Park premium.",
};

// ── BHK Configurations ────────────────────────────────────────────────
const BHK_CONFIGS = [
  { val: "2-bhk", display: "2 BHK", price: "88.5 L", category: "2 BHK" },
  { val: "3-bhk", display: "3 BHK", price: "1.28 Cr", category: "3 BHK" },
  { val: "4-bhk", display: "4 BHK", price: "2.15 Cr", category: "4 BHK" },
];

// ── Intent Signals (expanded to 20) ──────────────────────────────────
const INTENTS = [
  // Purchase intent
  "premium", "luxury", "ultra-luxury", "best", "new",
  // Investor intent
  "investment", "high-return", "nri-investment", "buy",
  // Compliance signals
  "maharera-approved", "rera-registered",
  // Lifestyle
  "sports-township", "gated-community", "high-rise", "family",
  // Stage signals
  "new-launch", "under-construction", "ready-to-move",
  // Audience-specific
  "it-professional", "affordable-luxury",
];

// ── Property Type Vocabulary (expanded to 18) ─────────────────────────
const PROPERTY_TYPES = [
  "real-estate", "property", "properties", "homes", "flats", "apartments",
  "projects", "township", "gated-community", "residences", "residential-projects",
  "luxury-flats", "penthouse", "duplex", "flat", "apartment", "housing", "homes-for-sale",
];

export function generatePSEOMatrix(): PSEOPageData[] {
  const pages: PSEOPageData[] = [];

  // ── LAYER 1: Intent × PropertyType × Location ─────────────────────
  for (const loc of MICRO_MARKETS) {
    for (const intent of INTENTS) {
      for (const ptype of PROPERTY_TYPES) {
        const slug = `${intent}-${ptype}-${loc}`;
        const locDisplay = capitalize(loc.replace(/-/g, ' '));
        const intentDisplay = capitalize(intent.replace(/-/g, ' '));
        const ptypeDisplay = capitalize(ptype.replace(/-/g, ' '));
        const edge = COMPETITOR_CONTEXT[loc] || `Setting a new benchmark for luxury living in ${locDisplay}.`;

        pages.push({
          slug,
          title: `${intentDisplay} ${ptypeDisplay} in ${locDisplay} | The Arena PCMC`,
          h1: `${intentDisplay} ${ptypeDisplay} in ${locDisplay}`,
          description: `Discover ${intentDisplay.toLowerCase()} ${ptypeDisplay.toLowerCase()} in ${locDisplay}. The Arena — 80,000 sq.ft. sports township with 2, 3 & 4 BHK luxury residences. ${edge}`,
          keyword: `${intent.replace(/-/g, ' ')} ${ptype.replace(/-/g, ' ')} ${loc.replace(/-/g, ' ')}`,
          price: "88.5 L",
          bhk: "2, 3 & 4 BHK",
          location: locDisplay,
          category: ptypeDisplay,
        });
      }
    }
  }

  // ── LAYER 2: BHK × Intent × Location ─────────────────────────────
  for (const loc of MICRO_MARKETS) {
    for (const bhk of BHK_CONFIGS) {
      for (const intent of INTENTS) {
        const slug = `${intent}-${bhk.val}-flats-${loc}`;
        const locDisplay = capitalize(loc.replace(/-/g, ' '));
        const intentDisplay = capitalize(intent.replace(/-/g, ' '));
        const edge = COMPETITOR_CONTEXT[loc] || `A premium alternative to standard projects in ${locDisplay}.`;

        pages.push({
          slug,
          title: `Buy ${intentDisplay} ${bhk.display} Flats in ${locDisplay} | The Arena`,
          h1: `${intentDisplay} ${bhk.display} Flats in ${locDisplay}`,
          description: `Looking for ${intentDisplay.toLowerCase()} ${bhk.display} flats in ${locDisplay}? The Arena offers premium ${bhk.display} homes starting ₹${bhk.price} with an 80,000 Sq.Ft. sports ecosystem. ${edge}`,
          keyword: `${intent.replace(/-/g, ' ')} ${bhk.display.toLowerCase()} flats in ${loc.replace(/-/g, ' ')}`,
          price: bhk.price,
          bhk: bhk.display,
          location: locDisplay,
          category: bhk.display,
        });
      }
    }
  }

  // ── LAYER 3: Price-Range Pages (high Google intent) ───────────────
  const PRICE_RANGES = [
    { slug: "flats-under-1-crore", label: "Flats Under 1 Crore", price: "88.5 L", bhk: "2 BHK" },
    { slug: "flats-under-1-5-crore", label: "Flats Under 1.5 Crore", price: "1.28 Cr", bhk: "3 BHK" },
    { slug: "flats-under-2-crore", label: "Flats Under 2 Crore", price: "1.28 Cr", bhk: "3 BHK" },
    { slug: "luxury-flats-above-2-crore", label: "Luxury Flats Above 2 Crore", price: "2.15 Cr", bhk: "4 BHK" },
    { slug: "flats-80-lakh", label: "Flats at 80 Lakh", price: "88.5 L", bhk: "2 BHK" },
    { slug: "flats-90-lakh", label: "Flats at 90 Lakh", price: "88.5 L", bhk: "2 BHK" },
  ];

  for (const pr of PRICE_RANGES) {
    for (const loc of MICRO_MARKETS.slice(0, 20)) { // Top 20 micro-markets
      const locDisplay = capitalize(loc.replace(/-/g, ' '));
      pages.push({
        slug: `${pr.slug}-${loc}`,
        title: `${pr.label} in ${locDisplay} PCMC | The Arena`,
        h1: `${pr.label} in ${locDisplay}`,
        description: `Find ${pr.label.toLowerCase()} in ${locDisplay}. The Arena offers premium ${pr.bhk} residences starting ₹${pr.price} in Pimpri Chinchwad's finest sports township.`,
        keyword: `${pr.label.toLowerCase()} in ${loc.replace(/-/g, ' ')}`,
        price: pr.price,
        bhk: pr.bhk,
        location: locDisplay,
        category: pr.label,
      });
    }
  }

  // ── LAYER 4: Google Search Volume Custom Pages ────────────────────
  const customPages = [
    { slug: "buy-property-in-pimpri-chinchwad", title: "Buy Property in Pimpri Chinchwad | Premium Real Estate", h1: "Buy Property in Pimpri Chinchwad", keyword: "buy property in pimpri chinchwad", price: "88.5 L", bhk: "2, 3 & 4 BHK" },
    { slug: "premium-flats-under-1-crore-pcmc", title: "Premium Flats Under 1 Crore in PCMC | The Arena", h1: "Premium Flats Under 1 Crore in PCMC", keyword: "premium flats under 1 crore pcmc", price: "88.5 L", bhk: "2 BHK" },
    { slug: "best-property-investment-pimpri-chinchwad", title: "Best Property Investment in Pimpri Chinchwad 2026", h1: "Best Property Investment in Pimpri Chinchwad", keyword: "best property investment pimpri chinchwad", price: "88.5 L", bhk: "2, 3 & 4 BHK" },
    { slug: "premium-homes-near-pimpri-metro", title: "Premium Homes Near Pimpri Metro Station | The Arena", h1: "Premium Homes Near Pimpri Metro", keyword: "premium homes near pimpri metro", price: "88.5 L", bhk: "2, 3 & 4 BHK" },
    { slug: "nri-investment-pune-real-estate", title: "NRI Investment in Pune Real Estate 2026 | The Arena", h1: "NRI Investment — Pune Real Estate", keyword: "nri investment pune real estate", price: "1.28 Cr", bhk: "3 BHK" },
    { slug: "flats-near-hinjewadi-it-park", title: "Flats Near Hinjewadi IT Park | Luxury Residences | The Arena", h1: "Luxury Flats Near Hinjewadi IT Park", keyword: "flats near hinjewadi it park", price: "88.5 L", bhk: "2, 3 & 4 BHK" },
    { slug: "sports-township-pune", title: "Sports Township in Pune | 80000 Sqft Active Ecosystem | The Arena", h1: "Sports Township in Pune — Life in Motion", keyword: "sports township pune", price: "88.5 L", bhk: "2, 3 & 4 BHK" },
    { slug: "maharera-approved-flats-pimpri", title: "MahaRERA Approved Flats in Pimpri | The Arena", h1: "MahaRERA Approved Flats in Pimpri", keyword: "maharera approved flats pimpri", price: "88.5 L", bhk: "2, 3 & 4 BHK" },
    { slug: "luxury-apartments-pcmc-pune", title: "Luxury Apartments in PCMC Pune | Sports Township | The Arena", h1: "Luxury Apartments in PCMC Pune", keyword: "luxury apartments pcmc pune", price: "1.28 Cr", bhk: "3 BHK" },
    { slug: "new-launch-flats-pimpri-chinchwad-2026", title: "New Launch Flats in Pimpri Chinchwad 2026 | The Arena", h1: "New Launch Flats Pimpri Chinchwad 2026", keyword: "new launch flats pimpri chinchwad 2026", price: "88.5 L", bhk: "2, 3 & 4 BHK" },
    { slug: "ready-to-move-flats-pune", title: "Ready to Move Flats in Pune | PCMC Luxury Residences", h1: "Ready to Move Flats in Pune PCMC", keyword: "ready to move flats pune", price: "88.5 L", bhk: "2, 3 & 4 BHK" },
    { slug: "3-bhk-flats-pimpri-chinchwad", title: "3 BHK Flats in Pimpri Chinchwad | Buy 3 BHK | The Arena", h1: "3 BHK Flats in Pimpri Chinchwad", keyword: "3 bhk flats pimpri chinchwad", price: "1.28 Cr", bhk: "3 BHK" },
    { slug: "2-bhk-flats-pcmc", title: "2 BHK Flats in PCMC | Affordable Luxury | The Arena", h1: "2 BHK Flats in PCMC", keyword: "2 bhk flats pcmc", price: "88.5 L", bhk: "2 BHK" },
    { slug: "it-professionals-flats-pune", title: "Flats for IT Professionals in Pune | Near Hinjewadi | The Arena", h1: "Best Flats for IT Professionals in Pune", keyword: "flats for it professionals pune", price: "88.5 L", bhk: "2, 3 & 4 BHK" },
    { slug: "gated-community-pimpri", title: "Gated Community in Pimpri Chinchwad | The Arena", h1: "Premium Gated Community in Pimpri", keyword: "gated community pimpri chinchwad", price: "88.5 L", bhk: "2, 3 & 4 BHK" },
  ];

  for (const cp of customPages) {
    const edge = COMPETITOR_CONTEXT["pimpri"] || "Setting a new benchmark for luxury living in PCMC.";
    pages.push({
      slug: cp.slug,
      title: cp.title,
      h1: cp.h1,
      description: `Explore ${cp.h1} at The Arena by Kohinoor Group and Mahalaxmi Group. Premium ${cp.bhk} luxury residences in a sprawling 80,000 Sq.Ft. sports township. ${edge}`,
      keyword: cp.keyword,
      price: cp.price,
      bhk: cp.bhk,
      location: "Pimpri Chinchwad, PCMC",
      category: "Premium Real Estate",
    });
  }

  // Deduplicate by slug
  return Array.from(new Map(pages.map(item => [item.slug, item])).values());
}

export function getPSEOPageData(slug: string): PSEOPageData | undefined {
  const matrix = generatePSEOMatrix();
  return matrix.find(p => p.slug === slug);
}

function capitalize(s: string) {
  return s.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
