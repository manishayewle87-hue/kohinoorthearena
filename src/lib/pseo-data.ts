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

const MICRO_MARKETS = [
  "pimpri", "chinchwad", "akurdi", "nigdi", "pradhikaran", "ravet", "punawale", 
  "tathawade", "wakad", "moshi", "dudulgaon", "talawade", "thergaon", 
  "pimple-saudagar", "pimple-nilakh", "sangvi", "bhosari", "charholi", "dehu-road", 
  "mamurdi", "pcmc", "hinjewadi", "hinjewadi-phase-1", "hinjewadi-phase-2", 
  "hinjewadi-phase-3", "baner", "balewadi", "aundh", "pashan", "sus", "bavdhan", 
  "kiwale", "marunji", "nerhe", "kasarsai", "chakan", "talegaon", "vadgaon-maval",
  "khed-shivapur", "shirgaon", "gahunje", "bhumkar-chowk", "dange-chowk", 
  "kalewadi", "pimple-gurav", "nashik-phata", "ksb-chowk", "chikhali", "chinchwad-station",
  "pimpri-station", "finolex-chowk", "nehrunagar", "sant-tukaram-nagar", 
  "vallabhnagar", "kasarwadi", "dapodi", "bopkhel", "dighi", "alandi", "markal"
];

// Competitor Entity Hijacking Map (Injecting comparison semantics naturally)
const COMPETITOR_CONTEXT: Record<string, string> = {
  "pimpri": "Better connectivity than Mahindra Lifespaces and Kohinoor Shangrila.",
  "wakad": "Offering vastly superior sports amenities compared to standard Wakad projects.",
  "hinjewadi": "Just 15 minutes away from Hinjewadi IT Park traffic, offering serene luxury.",
  "pcmc": "The definitive crown jewel of PCMC, outclassing all regional developments.",
  "chinchwad": "A master-planned alternative to cramped Chinchwad properties.",
  "ravet": "Upgraded luxury and 80,000 Sq.Ft. of sports space not found in Ravet."
};

const BHK_CONFIGS = [
  { val: "2-bhk", display: "2 BHK", price: "88.5 L", category: "2 BHK" },
  { val: "3-bhk", display: "3 BHK", price: "1.28 Cr", category: "3 BHK" },
  { val: "4-bhk", display: "4 BHK", price: "2.15 Cr", category: "4 BHK" }
];

const INTENTS = [
  "premium", "luxury", "best", "ultra-luxury", "new", "investment",
  "ready-possession-alternative", "maharera-approved", "sports-township",
  "new-launch", "gated-community", "high-rise"
];

const PROPERTY_TYPES = [
  "real-estate", "property", "properties", "homes", "flats", "apartments",
  "projects", "township", "gated-community", "residences", "residential-projects",
  "luxury-flats", "penthouse", "duplex"
];

export function generatePSEOMatrix(): PSEOPageData[] {
  const pages: PSEOPageData[] = [];

  // Generate generic intent + location pages (e.g. premium-real-estate-pimpri)
  for (const loc of MICRO_MARKETS) {
    for (const intent of INTENTS) {
      for (const ptype of PROPERTY_TYPES) {
        const slug = `${intent}-${ptype}-${loc}`;
        const locDisplay = capitalize(loc.replace(/-/g, ' '));
        const intentDisplay = capitalize(intent.replace(/-/g, ' '));
        const ptypeDisplay = capitalize(ptype.replace(/-/g, ' '));
        const competitorEdge = COMPETITOR_CONTEXT[loc] || `Setting a new benchmark for luxury living in ${locDisplay}.`;

        pages.push({
          slug,
          title: `${intentDisplay} ${ptypeDisplay} in ${locDisplay} | The Arena PCMC`,
          h1: `${intentDisplay} ${ptypeDisplay} in ${locDisplay}`,
          description: `Discover ${intentDisplay} ${ptypeDisplay} in ${locDisplay}. Explore The Arena, an 80,000 sq.ft. sports township offering 2, 3 & 4 BHK luxury residences. ${competitorEdge}`,
          keyword: `${intent.replace(/-/g, ' ')} ${ptype.replace(/-/g, ' ')} ${loc.replace(/-/g, ' ')}`,
          price: "88.5 L",
          bhk: "2, 3 & 4 BHK",
          location: locDisplay,
          category: ptypeDisplay
        });
      }
    }
  }

  // Generate BHK specific pages (e.g. premium-3-bhk-flats-wakad)
  for (const loc of MICRO_MARKETS) {
    for (const bhk of BHK_CONFIGS) {
      for (const intent of INTENTS) {
        const ptype = "flats";
        const slug = `${intent}-${bhk.val}-${ptype}-${loc}`;
        const locDisplay = capitalize(loc.replace(/-/g, ' '));
        const intentDisplay = capitalize(intent.replace(/-/g, ' '));
        const competitorEdge = COMPETITOR_CONTEXT[loc] || `A premium alternative to standard projects in ${locDisplay}.`;

        pages.push({
          slug,
          title: `Buy ${intentDisplay} ${bhk.display} ${capitalize(ptype)} in ${locDisplay} | The Arena`,
          h1: `${intentDisplay} ${bhk.display} ${capitalize(ptype)} in ${locDisplay}`,
          description: `Looking for ${intentDisplay.toLowerCase()} ${bhk.display} ${ptype} in ${locDisplay}? The Arena offers premium ${bhk.display} homes with an 80,000 Sq. Ft. sports ecosystem. Starting at ₹${bhk.price}. ${competitorEdge}`,
          keyword: `${intent.replace(/-/g, ' ')} ${bhk.display.toLowerCase()} ${ptype} in ${loc.replace(/-/g, ' ')}`,
          price: bhk.price,
          bhk: bhk.display,
          location: locDisplay,
          category: bhk.display
        });
      }
    }
  }

  // Add specific high-volume custom pages from the master list
  const customPages = [
    { slug: 'buy-property-in-pimpri-chinchwad', title: 'Buy Property in Pimpri Chinchwad | Premium Real Estate', h1: 'Buy Property in Pimpri Chinchwad', keyword: 'buy property in pimpri chinchwad' },
    { slug: 'premium-flats-under-1-crore-pcmc', title: 'Premium Flats Under 1 Crore in PCMC | The Arena', h1: 'Premium Flats Under 1 Crore in PCMC', keyword: 'premium flats under 1 crore pcmc' },
    { slug: 'best-property-investment-pimpri-chinchwad', title: 'Best Property Investment in Pimpri Chinchwad', h1: 'Best Property Investment in Pimpri Chinchwad', keyword: 'best property investment pimpri chinchwad' },
    { slug: 'premium-homes-near-pimpri-metro', title: 'Premium Homes Near Pimpri Metro Station', h1: 'Premium Homes Near Pimpri Metro', keyword: 'premium homes near pimpri metro' }
  ];

  for (const cp of customPages) {
    pages.push({
      slug: cp.slug,
      title: cp.title,
      h1: cp.h1,
      description: `Explore ${cp.h1} at The Arena by Kohinoor Group and Mahalaxmi Group. Featuring 2, 3 & 4 BHK luxury residences in a sprawling sports township.`,
      keyword: cp.keyword,
      price: "88.5 L",
      bhk: "2, 3 & 4 BHK",
      location: "PCMC",
      category: "Premium Real Estate"
    });
  }

  // Deduplicate by slug
  const uniquePages = Array.from(new Map(pages.map(item => [item.slug, item])).values());
  return uniquePages;
}

// Optimization: Rather than building the whole array on every dynamic request, we just look up the slug dynamically
export function getPSEOPageData(slug: string): PSEOPageData | undefined {
  // Try to parse the slug instead of generating the entire matrix if possible, 
  // but generating the array is fast enough in Node for 10-20k items.
  const matrix = generatePSEOMatrix();
  return matrix.find(p => p.slug === slug);
}

function capitalize(s: string) {
  return s.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
