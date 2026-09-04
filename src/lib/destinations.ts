import { cld } from "./cloudinary";
import { supabase } from "./supabase";
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
    image: cld("dest-kerala_ttbnaa", 640),
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
    name: "VISA",
    region: "Assistance",
    country: "VISA",
    image: destVisaTickets,
    heroImage: destVisaTicketsHero,
    tagline: "Hassle-Free Documentation",
    description: "End-to-end visa assistance and documentation support for worldwide travel.",
    highlights: [],
    bestTime: "Year Round",
    duration: "Assistance",
    startingFrom: "Documentation",
    href: "https://wa.me/917736406630?text=Hi%2C%20I%27m%20interested%20in%20visa%20assistance",
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

export const DEST_IMAGES: Record<string, string> = {
  kerala: kerala,
  kashmir: keralaCabService,
  "domestic-packages": destDomesticPackages,
  "international-packages": destInternationalPackages,
  "flight-tickets": destFlightTickets,
  "visa-tickets": destVisaTickets,
  bali: bali,
};

export const DEST_HERO_IMAGES: Record<string, string> = {
  kerala: keralaHero,
  kashmir: kashmirHero,
  "domestic-packages": dubaiHero,
  "international-packages": destInternationalPackages,
  "flight-tickets": destFlightTicketsHero,
  "visa-tickets": destVisaTicketsHero,
  bali: baliHero,
};

export async function getDestinations(): Promise<Destination[]> {
  try {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    const serviceSlugs = ["flight-tickets", "visa-tickets"];
    const validDestinations = data ? data.filter((d: any) => !serviceSlugs.includes(d.slug)) : [];
    if (validDestinations.length === 0) return destinations.filter((d) => !serviceSlugs.includes(d.slug));

    return validDestinations.map((d: any) => ({
      slug: d.slug,
      name: d.name,
      region: d.region,
      country: d.country,
      image: DEST_IMAGES[d.slug] || d.image,
      heroImage: DEST_HERO_IMAGES[d.slug] || d.hero_image || undefined,
      tagline: d.tagline || "",
      description: d.description || "",
      highlights: d.highlights || [],
      bestTime: d.best_time || "",
      duration: d.duration || "",
      startingFrom: d.starting_from || "",
      href: d.href || undefined,
    }));
  } catch (err) {
    console.error("Error fetching destinations from Supabase:", err);
    return destinations;
  }
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  try {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .eq("slug", slug)
      .eq("active", true)
      .limit(1)
      .single();

    if (error) throw error;
    if (!data) return getDestination(slug) || null;

    return {
      slug: data.slug,
      name: data.name,
      region: data.region,
      country: data.country,
      image: DEST_IMAGES[data.slug] || data.image,
      heroImage: DEST_HERO_IMAGES[data.slug] || data.hero_image || undefined,
      tagline: data.tagline || "",
      description: data.description || "",
      highlights: data.highlights || [],
      bestTime: data.best_time || "",
      duration: data.duration || "",
      startingFrom: data.starting_from || "",
      href: data.href || undefined,
    };
  } catch (err) {
    console.error(`Error fetching destination slug ${slug}:`, err);
    return getDestination(slug) || null;
  }
}

export function getDestination(slug: string) {
  if (slug === "bali") return baliDetail;
  return destinations.find((d) => d.slug === slug);
}
