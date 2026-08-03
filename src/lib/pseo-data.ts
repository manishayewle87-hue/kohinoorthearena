export type PSEOPageData = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keyword: string;
  price: string;
  bhk: string;
  location: string;
};

// The Programmatic Matrix Permutations
const bhkOptions = [
  { val: "2-bhk", display: "2 BHK", price: "88.5 L", intent: ["luxury", "premium"] },
  { val: "3-bhk", display: "3 BHK", price: "1.28 Cr", intent: ["luxury", "premium", "spacious"] },
  { val: "4-bhk", display: "4 BHK", price: "2.15 Cr", intent: ["ultra-luxury", "penthouse"] }
];

const locations = [
  { val: "pimpri", display: "Pimpri" },
  { val: "pimpri-chinchwad", display: "Pimpri Chinchwad" },
  { val: "pcmc", display: "PCMC" },
  { val: "near-pcmc-metro", display: "Near PCMC Metro" },
  { val: "pune", display: "Pune" }
];

const prefixes = ["buy", "ready-possession", "upcoming", "new-launch"];

export function generatePSEOMatrix(): PSEOPageData[] {
  const pages: PSEOPageData[] = [];

  for (const bhk of bhkOptions) {
    for (const loc of locations) {
      for (const intent of bhk.intent) {
        // e.g. 3-bhk-luxury-flats-in-pimpri
        const slug1 = `${bhk.val}-${intent}-flats-in-${loc.val}`;
        pages.push({
          slug: slug1,
          title: `${bhk.display} ${capitalize(intent)} Flats in ${loc.display} | Mahalaxmi The Arena`,
          h1: `${bhk.display} ${capitalize(intent)} Flats in ${loc.display}`,
          description: `Looking for ${bhk.display} ${intent} flats in ${loc.display}? Discover Mahalaxmi The Arena. Premium residences starting from ₹ ${bhk.price}.`,
          keyword: `${bhk.val} ${intent} flats in ${loc.val}`,
          price: bhk.price,
          bhk: bhk.display,
          location: loc.display
        });
        
        // e.g. 3-bhk-apartments-in-pimpri-chinchwad
        const slug2 = `${bhk.val}-apartments-in-${loc.val}`;
        pages.push({
          slug: slug2,
          title: `Buy ${bhk.display} Apartments in ${loc.display} | Kohinoor Group`,
          h1: `${bhk.display} Apartments in ${loc.display}`,
          description: `Explore premium ${bhk.display} apartments in ${loc.display}. Life in Motion sports township by Mahalaxmi Group and Kohinoor Group.`,
          keyword: `${bhk.val} apartments in ${loc.val}`,
          price: bhk.price,
          bhk: bhk.display,
          location: loc.display
        });
      }
    }
  }

  // Deduplicate by slug
  const uniquePages = Array.from(new Map(pages.map(item => [item.slug, item])).values());
  return uniquePages;
}

export function getPSEOPageData(slug: string): PSEOPageData | undefined {
  const matrix = generatePSEOMatrix();
  return matrix.find(p => p.slug === slug);
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
