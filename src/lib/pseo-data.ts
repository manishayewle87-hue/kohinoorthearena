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

// ── 75 Micro-Markets: Pimpri Chinchwad + Pune Corridor ────────────────
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
  // Extended Pune corridor high-search areas
  "hadapsar", "kharadi", "magarpatta", "viman-nagar", "koregaon-park",
  "kalyani-nagar", "undri", "kondhwa", "wanowrie", "bibwewadi",
  "warje", "kothrud", "deccan", "erandwane", "pune-cantonment",
];

// ── Competitor & Landmark Context (E-E-A-T Semantic Authority) ─────────
const COMPETITOR_CONTEXT: Record<string, string> = {
  "pimpri": "Directly connected to PCMC Metro (2.4 km) and Kohinoor World Towers (2 km), outclassing standalone projects.",
  "wakad": "Vastly superior 80,000 Sq.Ft. sports infrastructure compared to typical Wakad high-rises.",
  "hinjewadi": "Only 15 minutes to Hinjewadi IT Park Phase 1-3 via NH-48 without the daily Hinjewadi traffic choke.",
  "pcmc": "The flagship joint venture township by Mahalaxmi Group and Kohinoor Group.",
  "chinchwad": "Spacious sports township alternative to congested Chinchwad station properties.",
  "ravet": "Managed by ILESEUM Sports with 80,000 Sq.Ft. of active spaces not found in Ravet.",
  "baner": "Sports township lifestyle offering larger carpet areas than equivalent Baner apartments.",
  "kharadi": "Stronger capital appreciation and 4.5-5.2% rental yield driven by PCMC's industrial and IT spine.",
  "viman-nagar": "Direct metro & highway connectivity without Viman Nagar density premiums.",
  "hadapsar": "Master-planned sports ecosystem delivering unmatched lifestyle quality for growing families.",
  "koregaon-park": "World-class sports infrastructure at accessible starting prices starting ₹1.20 Crore.",
};

// ── BHK Configurations ────────────────────────────────────────────────
const BHK_CONFIGS = [
  { val: "2-bhk", display: "2 BHK", price: "1.20 Cr", category: "2 BHK" },
  { val: "3-bhk", display: "3 BHK", price: "1.75 Cr", category: "3 BHK" },
  { val: "4-bhk", display: "4 BHK", price: "2.95 Cr", category: "4 BHK" },
];

// ── Intent Signals (20 Purchase & Compliance Dimensions) ──────────────
const INTENTS = [
  "premium", "luxury", "ultra-luxury", "best", "new",
  "investment", "high-return", "nri-investment", "buy",
  "maharera-approved", "rera-registered",
  "sports-township", "gated-community", "high-rise", "family",
  "new-launch", "under-construction", "ready-to-move",
  "it-professional", "affordable-luxury",
];

// ── Property Type Vocabulary (18 Search Patterns) ─────────────────────
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
          description: `Discover ${intentDisplay.toLowerCase()} ${ptypeDisplay.toLowerCase()} in ${locDisplay}. The Arena by Mahalaxmi & Kohinoor Group — 80,000 sq.ft. sports township with 2, 3 & 4 BHK luxury residences. ${edge}`,
          keyword: `${intent.replace(/-/g, ' ')} ${ptype.replace(/-/g, ' ')} ${loc.replace(/-/g, ' ')}`,
          price: "1.20 Cr",
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
          description: `Looking for ${intentDisplay.toLowerCase()} ${bhk.display} flats in ${locDisplay}? The Arena offers premium ${bhk.display} homes starting ₹${bhk.price} with an 80,000 Sq.Ft. sports ecosystem by ILESEUM. ${edge}`,
          keyword: `${intent.replace(/-/g, ' ')} ${bhk.display.toLowerCase()} flats in ${loc.replace(/-/g, ' ')}`,
          price: bhk.price,
          bhk: bhk.display,
          location: locDisplay,
          category: bhk.display,
        });
      }
    }
  }

  // ── LAYER 3: Price-Range Segment Pages ────────────────────────────
  const PRICE_RANGES = [
    { slug: "flats-1-2-crore", label: "Flats Starting 1.2 Crore", price: "1.20 Cr", bhk: "2 BHK" },
    { slug: "flats-under-1-5-crore", label: "Flats Under 1.5 Crore", price: "1.20 Cr", bhk: "2 BHK" },
    { slug: "flats-under-2-crore", label: "Flats Under 2 Crore", price: "1.75 Cr", bhk: "3 BHK" },
    { slug: "luxury-flats-above-2-crore", label: "Luxury Flats Above 2 Crore", price: "2.95 Cr", bhk: "4 BHK" },
    { slug: "flats-1-5-crore", label: "Flats at 1.5 Crore", price: "1.75 Cr", bhk: "3 BHK" },
    { slug: "flats-2-crore", label: "Flats at 2 Crore", price: "2.05 Cr", bhk: "3 BHK" },
  ];

  for (const pr of PRICE_RANGES) {
    for (const loc of MICRO_MARKETS.slice(0, 25)) {
      const locDisplay = capitalize(loc.replace(/-/g, ' '));
      pages.push({
        slug: `${pr.slug}-${loc}`,
        title: `${pr.label} in ${locDisplay} PCMC | The Arena`,
        h1: `${pr.label} in ${locDisplay}`,
        description: `Find ${pr.label.toLowerCase()} in ${locDisplay}. The Arena offers premium ${pr.bhk} residences starting ₹${pr.price} in Pimpri Chinchwad's premier sports township near PCMC Metro.`,
        keyword: `${pr.label.toLowerCase()} in ${loc.replace(/-/g, ' ')}`,
        price: pr.price,
        bhk: pr.bhk,
        location: locDisplay,
        category: pr.label,
      });
    }
  }

  // ── LAYER 4: MASTER KEYWORD INJECTION GRID (User-Specified Master Terms) ──
  const masterCustomPages = [
    // 1. Core Project & Joint Venture
    { slug: "mahalaxmi-kohinoor-pimpri", title: "Mahalaxmi Kohinoor Pimpri | Official Joint Venture Project Pune", h1: "Mahalaxmi Kohinoor Pimpri Project", keyword: "mahalaxmi kohinoor pimpri", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Pimpri, PCMC" },
    { slug: "mahalaxmi-kohinoor-pimpri-pune", title: "Mahalaxmi Kohinoor Pimpri Pune | Sports Township & Residences", h1: "Mahalaxmi Kohinoor Pimpri Pune", keyword: "mahalaxmi kohinoor pimpri pune", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Pimpri Pune" },
    { slug: "mahalaxmi-kohinoor-life-in-motion", title: "Mahalaxmi Kohinoor Life in Motion | 80000 Sq.Ft. Sports Ecosystem", h1: "Mahalaxmi Kohinoor Life in Motion", keyword: "mahalaxmi kohinoor life in motion", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Pimpri Chinchwad" },
    { slug: "mahalaxmi-kohinoor-sports-township", title: "Mahalaxmi Kohinoor Sports Township Pimpri | Active Living Hub", h1: "Mahalaxmi Kohinoor Sports Township", keyword: "mahalaxmi kohinoor sports township", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Pimpri" },
    { slug: "mahalaxmi-group-kohinoor-group-pimpri", title: "Mahalaxmi Group & Kohinoor Group Joint Venture Pimpri", h1: "Mahalaxmi Group & Kohinoor Group Project", keyword: "mahalaxmi group kohinoor group pimpri", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Pimpri PCMC" },
    { slug: "mahalaxmi-kohinoor-new-launch-pimpri", title: "Mahalaxmi Kohinoor New Launch Pimpri 2026 | EOI & Booking Open", h1: "Mahalaxmi Kohinoor New Launch", keyword: "mahalaxmi kohinoor new launch", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Pimpri" },
    { slug: "mahalaxmi-kohinoor-booking-and-sample-flat", title: "Mahalaxmi Kohinoor Booking & Sample Flat Visit Pimpri", h1: "Mahalaxmi Kohinoor Booking & Sample Flat", keyword: "mahalaxmi kohinoor booking", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Pimpri" },

    // 2. 2 BHK & 3 BHK Master Combinations
    { slug: "mahalaxmi-kohinoor-2-bhk-pimpri", title: "Mahalaxmi Kohinoor 2 BHK Flats in Pimpri Pune | Floor Plan & Price", h1: "Mahalaxmi Kohinoor 2 BHK in Pimpri", keyword: "mahalaxmi kohinoor 2 bhk pimpri", price: "1.20 Cr", bhk: "2 BHK", location: "Pimpri" },
    { slug: "mahalaxmi-kohinoor-3-bhk-pimpri", title: "Mahalaxmi Kohinoor 3 BHK Luxury Residences Pimpri | Starting ₹1.75 Cr", h1: "Mahalaxmi Kohinoor 3 BHK in Pimpri", keyword: "mahalaxmi kohinoor 3 bhk pimpri", price: "1.75 Cr", bhk: "3 BHK", location: "Pimpri" },
    { slug: "life-in-motion-2-bhk-pimpri", title: "Life in Motion 2 BHK Flats in Pimpri | Sports Township Homes", h1: "Life in Motion 2 BHK Pimpri", keyword: "life in motion 2 bhk pimpri", price: "1.20 Cr", bhk: "2 BHK", location: "Pimpri" },
    { slug: "life-in-motion-3-bhk-pimpri", title: "Life in Motion 3 BHK Luxury Apartments Pimpri | Premium Living", h1: "Life in Motion 3 BHK Pimpri", keyword: "life in motion 3 bhk pimpri", price: "1.75 Cr", bhk: "3 BHK", location: "Pimpri" },
    { slug: "2-bhk-flats-in-pimpri-pune", title: "2 BHK Flats in Pimpri Pune | Premium High-Rise Residences", h1: "2 BHK Flats in Pimpri Pune", keyword: "2 bhk flats in pimpri pune", price: "1.20 Cr", bhk: "2 BHK", location: "Pimpri Pune" },
    { slug: "3-bhk-flats-in-pimpri-pune", title: "3 BHK Flats in Pimpri Pune | Luxury 3 BHK Apartments", h1: "3 BHK Flats in Pimpri Pune", keyword: "3 bhk flats in pimpri pune", price: "1.75 Cr", bhk: "3 BHK", location: "Pimpri Pune" },
    { slug: "luxury-2-bhk-flats-pimpri", title: "Luxury 2 BHK Flats in Pimpri | Gated Sports Community", h1: "Luxury 2 BHK Flats in Pimpri", keyword: "luxury 2 bhk pimpri", price: "1.20 Cr", bhk: "2 BHK", location: "Pimpri" },
    { slug: "luxury-3-bhk-flats-pimpri", title: "Luxury 3 BHK Flats in Pimpri | 11 High-Rise Towers & Club", h1: "Luxury 3 BHK Flats in Pimpri", keyword: "luxury 3 bhk pimpri", price: "1.75 Cr", bhk: "3 BHK", location: "Pimpri" },

    // 3. Landmark & Connectivity Hubs
    { slug: "flats-near-pcmc-metro-station-pimpri", title: "Flats Near PCMC Metro Station Pimpri | 2 & 3 BHK Luxury Residences", h1: "Flats Near PCMC Metro Station Pimpri", keyword: "flats near pcmc metro station pimpri", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Near PCMC Metro" },
    { slug: "2-bhk-near-pcmc-metro-pimpri", title: "2 BHK Near PCMC Metro Pimpri | Walk to Metro Station | The Arena", h1: "2 BHK Near PCMC Metro Pimpri", keyword: "2 bhk near pcmc metro pimpri", price: "1.20 Cr", bhk: "2 BHK", location: "PCMC Metro Corridor" },
    { slug: "3-bhk-near-pcmc-metro-pimpri", title: "3 BHK Near PCMC Metro Pimpri | Premium Luxury Living | The Arena", h1: "3 BHK Near PCMC Metro Pimpri", keyword: "3 bhk near pcmc metro pimpri", price: "1.75 Cr", bhk: "3 BHK", location: "PCMC Metro Corridor" },
    { slug: "flats-near-pimpri-metro-station", title: "Flats Near Pimpri Metro Station Pune | New Launch Residences", h1: "Flats Near Pimpri Metro Station", keyword: "flats near pimpri metro station", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Pimpri Metro Station" },
    { slug: "flats-near-pimpri-railway-station", title: "Flats Near Pimpri Railway Station | Excellent Pune-Mumbai Connectivity", h1: "Flats Near Pimpri Railway Station", keyword: "flats near pimpri railway station", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Pimpri Railway Corridor" },
    { slug: "flats-near-chinchwad-railway-station", title: "Flats Near Chinchwad Railway Station Pune | Luxury Township", h1: "Flats Near Chinchwad Railway Station", keyword: "flats near chinchwad railway station", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Chinchwad Station" },
    { slug: "property-near-kohinoor-world-towers-pimpri", title: "Property Near Kohinoor World Towers Pimpri (KWT) | The Arena", h1: "Property Near Kohinoor World Towers Pimpri", keyword: "property near kohinoor world towers", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Near KWT Pimpri" },
    { slug: "flats-near-kohinoor-world-towers-pimpri", title: "Flats Near Kohinoor World Towers Pimpri | Walk to Work Luxury", h1: "Flats Near Kohinoor World Towers", keyword: "flats near kohinoor world towers pimpri", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "KWT Corridor Pimpri" },
    { slug: "flats-near-mumbai-pune-highway-pimpri", title: "Flats Near Old Mumbai-Pune Highway Pimpri | Seamless Connectivity", h1: "Flats Near Old Mumbai-Pune Highway", keyword: "flats near mumbai pune highway", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Old Mumbai-Pune Highway" },
    { slug: "flats-near-aditya-birla-hospital-pimpri", title: "Flats Near Aditya Birla Memorial Hospital Pimpri | The Arena", h1: "Flats Near Aditya Birla Hospital", keyword: "flats near aditya birla hospital", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Aditya Birla Hospital Area" },
    { slug: "flats-near-chakan-midc-and-bhosari-midc", title: "Flats Near Bhosari MIDC & Chakan Industrial Corridor | The Arena", h1: "Flats Near Bhosari & Chakan MIDC", keyword: "flats near bhosari midc", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "MIDC Corridor" },

    // 4. Marathi & Hinglish High-Volume Search Keywords
    { slug: "pimpri-madhe-flat-kharedi", title: "Pimpri Madhe Flat Kharedi | Pimpri Madhe 2 & 3 BHK Ghar | The Arena", h1: "पिंपरी मध्ये फ्लॅट खरेदी — The Arena Pimpri", keyword: "pimpri madhe flat", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Pimpri (पिंपरी)" },
    { slug: "pimpri-madhe-2-bhk-flat", title: "Pimpri Madhe 2 BHK Flat | Best 2 BHK in Pimpri Chinchwad | The Arena", h1: "Pimpri Madhe 2 BHK Flat — पिंपरी मध्ये २ बीएचके", keyword: "pimpri madhe 2 bhk", price: "1.20 Cr", bhk: "2 BHK", location: "Pimpri PCMC" },
    { slug: "pimpri-madhe-3-bhk-flat", title: "Pimpri Madhe 3 BHK Flat | Luxury 3 BHK Ghar Pimpri | The Arena", h1: "Pimpri Madhe 3 BHK Flat — पिंपरी मध्ये ३ बीएचके", keyword: "pimpri madhe 3 bhk", price: "1.75 Cr", bhk: "3 BHK", location: "Pimpri PCMC" },
    { slug: "pcmc-metro-javal-flat", title: "PCMC Metro Javal Flat | Pimpri Metro Javal Ghar | The Arena Sports Township", h1: "PCMC व पिंपरी मेट्रो जवळ फ्लॅट्स", keyword: "pcmc metro javal flat", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "PCMC Metro Corridor" },
    { slug: "pimpri-railway-station-javal-flat", title: "Pimpri Railway Station Javal Flat | Chinchwad Station Javal Ghar", h1: "पिंपरी व चिंचवड रेल्वे स्टेशन जवळ फ्लॅट", keyword: "pimpri railway station javal flat", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Pimpri Station Area" },
    { slug: "pimpri-madhye-navin-project", title: "Pimpri Madhye Navin Project 2026 | New Launch in Pimpri PCMC", h1: "पिंपरी मधील नवीन प्रोजेक्ट्स — The Arena", keyword: "pimpri madhye navin project", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Pimpri Chinchwad" },
    { slug: "pimpri-madhe-ghar-kuthe-gheu", title: "Pimpri Madhe Ghar Kuthe Gheu? Best Area for Flat in Pimpri 2026", h1: "पिंपरी मध्ये घर कुठे घेऊ? बेस्ट लोकेशन गाईड", keyword: "pimpri madhe ghar kuthe gheu", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Pimpri Pune" },
    { slug: "pimpri-madhe-investment-sathi-flat", title: "Pimpri Madhe Investment Sathi Flat | High Rental Yield in PCMC", h1: "पिंपरी मध्ये इन्व्हेस्टमेंटसाठी फ्लॅट्स", keyword: "pimpri madhe investment sathi flat", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Pimpri PCMC" },

    // 5. High-Intent Questions / Google SGE & AI Overviews
    { slug: "mahalaxmi-kohinoor-price-list-and-floor-plans", title: "Mahalaxmi Kohinoor Price List, Payment Plan & Floor Plans 2026", h1: "Mahalaxmi Kohinoor Price List & Floor Plans", keyword: "mahalaxmi kohinoor price list", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Pimpri" },
    { slug: "best-residential-projects-in-pimpri-pune", title: "Best Residential Projects in Pimpri Pune 2026 | Top Townships", h1: "Best Residential Projects in Pimpri Pune", keyword: "best residential project in pimpri pune", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Pimpri Pune" },
    { slug: "pimpri-mein-best-flat-kaunsa-hai", title: "Pimpri Mein Best Flat Kaunsa Hai? 2 & 3 BHK Sports Township Comparison", h1: "Pimpri Mein Best Flat Kaunsa Hai — The Arena", keyword: "pimpri mein best flat kaunsa hai", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Pimpri PCMC" },
    { slug: "pimpri-real-estate-investment-guide-2026", title: "Pimpri Real Estate Investment Guide 2026 | ROI, Rental Yield & Metro", h1: "Pimpri Real Estate Investment Guide 2026", keyword: "pimpri real estate investment", price: "1.20 Cr", bhk: "2, 3 & 4 BHK", location: "Pimpri PCMC" },
    { slug: "commercial-property-near-kohinoor-world-towers-pimpri", title: "Commercial Property & Office Spaces Near Kohinoor World Towers Pimpri", h1: "Commercial Property Near Kohinoor World Towers", keyword: "commercial property near kohinoor world towers", price: "1.20 Cr", bhk: "Commercial & Resid.", location: "KWT Pimpri" },
  ];

  for (const cp of masterCustomPages) {
    const edge = COMPETITOR_CONTEXT["pimpri"] || "Setting a new benchmark for luxury living in PCMC.";
    pages.push({
      slug: cp.slug,
      title: cp.title,
      h1: cp.h1,
      description: `Explore ${cp.h1} at The Arena by Mahalaxmi Group and Kohinoor Group. Featuring 2, 3 & 4 BHK luxury residences in an 80,000 Sq.Ft. sports township near PCMC Metro & KWT. Starting at ₹${cp.price}. ${edge}`,
      keyword: cp.keyword,
      price: cp.price,
      bhk: cp.bhk,
      location: cp.location,
      category: "Master Real Estate Hub",
    });
  }

  // Deduplicate by slug
  _cachedMatrix = Array.from(new Map(pages.map(item => [item.slug, item])).values());
  _cachedMap = new Map(_cachedMatrix.map(p => [p.slug, p]));
  return _cachedMatrix;
}

let _cachedMatrix: PSEOPageData[] | null = null;
let _cachedMap: Map<string, PSEOPageData> | null = null;

export function getPSEOPageData(slug: string): PSEOPageData | undefined {
  if (!_cachedMap) {
    generatePSEOMatrix();
  }
  return _cachedMap?.get(slug);
}

function capitalize(s: string) {
  return s.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
