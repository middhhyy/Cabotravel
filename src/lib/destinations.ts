import kerala from "@/assets/dest-kerala.webp";
import kashmir from "@/assets/dest-kashmir.webp";
import dubai from "@/assets/dest-dubai.webp";
import bali from "@/assets/dest-bali.webp";
import destFlightTickets from "@/assets/dest-flight-tickets.webp";
import destVisaTickets from "@/assets/dest-visa-tickets.webp";
import keralaCabService from "@/assets/kerala-cab-service.webp";
import destDomesticPackages from "@/assets/dest-domestic-packages.webp";
import destInternationalPackages from "@/assets/dest-international-packages.webp";

export const keralaHero = "https://skzdfvoxoymuczcplwhl.supabase.co/storage/v1/object/public/feedback-photos/site-assets/hero-alleppey-backwaters.webp";
export const kashmirHero = "https://skzdfvoxoymuczcplwhl.supabase.co/storage/v1/object/public/feedback-photos/site-assets/hero-kashmir-dallake.webp";
export const dubaiHero = "https://skzdfvoxoymuczcplwhl.supabase.co/storage/v1/object/public/feedback-photos/site-assets/hero-dubai-skyline.webp";
import baliHero from "@/assets/dest-bali.webp";
import destFlightTicketsHero from "@/assets/dest-flight-tickets.webp";
import destVisaTicketsHero from "@/assets/dest-visa-tickets.webp";

export type Destination = {
  slug: string;
  name: string;
  region: string;
  country: string;
  image: string;
  heroImage?: string;
  tagline: string;
  description: string;
  highlights: string[];
  bestTime: string;
  duration: string;
  startingFrom: string;
  href?: string;
};

export const destinations: Destination[] = [
  {
    slug: "kerala",
    name: "Kerala",
    region: "Domestic",
    country: "India",
    image: kerala,
    heroImage: keralaHero,
    tagline: "God's Own Country",
    description:
      "Experience the best of Kerala holiday tours. Drift through palm-lined backwaters on a teakwood houseboat, sip Munnar tea, and explore local cliffs and heritage with our reliable taxi rentals in Calicut and across Kerala.",
    highlights: [
      "Alleppey Houseboats",
      "Munnar Tea Estates",
      "Kovalam Beach",
      "Periyar Wildlife",
      "Ayurveda Retreats",
    ],
    bestTime: "Sep – Mar",
    duration: "5 – 7 nights",
    startingFrom: "₹18,900",
  },
  {
    slug: "kashmir",
    name: "Kerala Cab Services",
    region: "Transport",
    country: "Kerala",
    image: keralaCabService,
    heroImage: kashmirHero,
    tagline: "Travel Anywhere, Anytime",
    description:
      "Glide across mirror-calm Dal Lake on a shikara, wander Mughal gardens framed by the Himalayas, and wake to snowfall in Gulmarg's pine valleys.",
    highlights: [
      "Dal Lake Shikara",
      "Gulmarg Gondola",
      "Pahalgam Valleys",
      "Sonmarg Glaciers",
      "Mughal Gardens",
    ],
    bestTime: "Mar – Oct",
    duration: "6 nights",
    startingFrom: "₹26,500",
  },
  {
    slug: "domestic-packages",
    name: "Domestic Packages",
    region: "Domestic",
    country: "India",
    image: destDomesticPackages,
    heroImage: dubaiHero,
    tagline: "Explore Incredible India",
    description:
      "Explore the vast beauty and diversity of India, from backwaters to hills and palaces.",
    highlights: ["Munnar Hills", "Goa Beaches", "Hampi Ruins", "Taj Mahal", "Himalayan Valleys"],
    bestTime: "Sep - Apr",
    duration: "Various",
    startingFrom: "₹15,000",
  },
  {
    slug: "international-packages",
    name: "International Packages",
    region: "International",
    country: "Worldwide",
    image: destInternationalPackages,
    heroImage: destInternationalPackages,
    tagline: "Explore the World",
    description:
      "Explore the rich culture, scenery, and wonders of the world with Cabo's curated international packages.",
    highlights: [],
    bestTime: "Year Round",
    duration: "Various",
    startingFrom: "₹42,500",
  },
  {
    slug: "flight-tickets",
    name: "Flight Tickets",
    region: "Book Now",
    country: "Flights",
    image: destFlightTickets,
    heroImage: destFlightTicketsHero,
    tagline: "Best Fares, Anywhere",
    description: "Book flight tickets to anywhere in the world at the best fares.",
    highlights: [],
    bestTime: "Year Round",
    duration: "Anywhere",
    startingFrom: "Best Fares",
    href: "https://wa.me/917736406630?text=Hi%2C%20I%27m%20interested%20in%20booking%20flight%20tickets",
  },
  {
    slug: "visa-tickets",
    name: "Visa & Tickets",
    region: "Assistance",
    country: "Visa & Tickets",
    image: destVisaTickets,
    heroImage: destVisaTicketsHero,
    tagline: "Hassle-Free Documentation",
    description: "End-to-end visa assistance and flight ticketing support for worldwide travel.",
    highlights: [],
    bestTime: "Year Round",
    duration: "Assistance",
    startingFrom: "Documentation",
    href: "https://wa.me/917736406630?text=Hi%2C%20I%27m%20interested%20in%20visa%20and%20ticket%20assistance",
  },
];

export const baliDetail: Destination = {
  slug: "bali",
  name: "Bali",
  region: "International",
  country: "Indonesia",
  image: bali,
  heroImage: baliHero,
  tagline: "Island of the Gods",
  description:
    "Wake to mist rolling over Ubud's emerald rice terraces, surf Uluwatu's golden coast and experience our premium Bali international holiday packages from Kerala.",
  highlights: [
    "Ubud Rice Terraces",
    "Uluwatu Temple",
    "Nusa Penida",
    "Seminyak Sunsets",
    "Tegallalang",
  ],
  bestTime: "Apr – Oct",
  duration: "6 nights",
  startingFrom: "₹54,500",
};

export function getDestination(slug: string) {
  if (slug === "bali") return baliDetail;
  return destinations.find((d) => d.slug === slug);
}
