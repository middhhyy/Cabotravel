import { destinations } from "./destinations";
import { supabase } from "./supabase";
import munnarImg from "@/assets/pkg-munnar-hills.webp";
import backwatersImg from "@/assets/pkg-kerala-backwaters.webp";
import thekkadyImg from "@/assets/pkg-thekkady-wildlife.webp";
import fortKochiImg from "@/assets/pkg-fort-kochi-culture.webp";
import kovalamImg from "@/assets/pkg-kovalam-beach.webp";
import vagamonImg from "@/assets/pkg-vagamon-adventure.webp";
import tamilNaduImg from "@/assets/dest-tamil-nadu.webp";
import trivandrumImg from "@/assets/pkg-trivandrum-heritage.webp";
import TheyyamImg from "@/assets/pkg-theyyam-experience.jpg";

export type Pkg = {
  slug: string;
  title: string;
  destinationSlug: string;
  category:
    | "Backwaters"
    | "Hill Station"
    | "Beach"
    | "Heritage"
    | "Wildlife"
    | "Ayurveda"
    | "Honeymoon"
    | "Adventure"
    | "Culture";
  nights: number;
  days: number;
  price: string;
  priceValue: number;
  inclusions: string[];
  itinerary: { day: number; title: string; detail: string }[];
  image?: string;
};

const PKG_IMAGES: Record<string, string> = {
  "explore-munnar": munnarImg,
  "kerala-highlights-getaway": backwatersImg,
  "kerala-nature-backwaters-escape": thekkadyImg,
  "kerala-grand-explorer": fortKochiImg,
  "kerala-ultimate-escape": kovalamImg,
  "kerala-grand-discovery": vagamonImg,
  "kerala-tamil-nadu-grand-escape": tamilNaduImg,
  "south-india-explorer": trivandrumImg,
  "south-india-temple-coastal-escape": tamilNaduImg,
  "kannur-theyyam-experience": TheyyamImg,
};

export const PACKAGES_FALLBACK: Pkg[] = [
  {
    slug: "explore-munnar",
    title: "Explore Munnar",
    destinationSlug: "kerala",
    category: "Hill Station",
    nights: 2,
    days: 3,
    price: "₹7,500",
    priceValue: 7500,
    image: munnarImg,
    inclusions: [
      "Misty Hill Resort Stay",
      "Tea Plantation Walk",
      "Mattupetty Dam Visit",
      "Daily Breakfast",
      "Cochin Pickup & Drop",
    ],
    itinerary: [
      { day: 1, title: "Arrive Cochin & Drive to Munnar", detail: "Scenic waterfalls enroute, check-in at hill resort." },
      { day: 2, title: "Munnar Tea Trail", detail: "Tea plantation walk, Tea Museum, and Mattupetty Dam." },
      { day: 3, title: "Departure", detail: "Drive back to Cochin airport." },
    ],
  },
  {
    slug: "kerala-highlights-getaway",
    title: "Kerala Highlights Getaway",
    destinationSlug: "kerala",
    category: "Backwaters",
    nights: 3,
    days: 4,
    price: "₹9,999",
    priceValue: 9999,
    image: backwatersImg,
    inclusions: [
      "Luxury Houseboat Night",
      "Munnar Hill Stay",
      "Backwater Cruise",
      "Daily Breakfast",
      "Private Vehicle Transfers",
    ],
    itinerary: [
      { day: 1, title: "Cochin to Munnar", detail: "Scenic waterfalls drive, hill resort check-in." },
      { day: 2, title: "Munnar Sightseeing", detail: "Tea estates, Echo point, and Mattupetty Dam." },
      { day: 3, title: "Munnar to Alleppey", detail: "Board luxury houseboat, overnight backwater cruise." },
      { day: 4, title: "Departure", detail: "Transfer to Cochin airport." },
    ],
  },
  {
    slug: "kerala-nature-backwaters-escape",
    title: "Kerala Nature & Backwaters Escape",
    destinationSlug: "kerala",
    category: "Wildlife",
    nights: 4,
    days: 5,
    price: "₹11,999",
    priceValue: 11999,
    image: thekkadyImg,
    inclusions: [
      "Periyar Jungle Resort",
      "Houseboat Backwater Night",
      "Spice Plantation Tour",
      "Daily Breakfast",
      "Private Cab Transfers",
    ],
    itinerary: [
      { day: 1, title: "Cochin to Munnar", detail: "Drive through waterfalls and tea gardens." },
      { day: 2, title: "Munnar to Thekkady", detail: "Periyar National Park boating and spice tour." },
      { day: 3, title: "Thekkady to Alleppey", detail: "Board houseboat for backwaters experience." },
      { day: 4, title: "Alleppey Relaxation", detail: "Lakeside resort stay and canoeing." },
      { day: 5, title: "Departure", detail: "Transfer to Cochin airport." },
    ],
  },
  {
    slug: "kerala-grand-explorer",
    title: "Kerala Grand Explorer",
    destinationSlug: "kerala",
    category: "Culture",
    nights: 5,
    days: 6,
    price: "₹16,999",
    priceValue: 16999,
    image: fortKochiImg,
    inclusions: [
      "Fort Kochi Heritage Walk",
      "Munnar & Thekkady Stays",
      "Houseboat Night Cruise",
      "Trivandrum City Tour",
      "Daily Breakfast",
    ],
    itinerary: [
      { day: 1, title: "Arrive Cochin", detail: "Fort Kochi heritage walk and dinner." },
      { day: 2, title: "Cochin to Munnar", detail: "Tea plantation drive and checking in." },
      { day: 3, title: "Munnar to Thekkady", detail: "Periyar wildlife and spice tour." },
      { day: 4, title: "Thekkady to Alleppey", detail: "Houseboat cruise and night stay." },
      { day: 5, title: "Alleppey to Trivandrum", detail: "Padmanabhaswamy temple and city tour." },
      { day: 6, title: "Departure", detail: "Transfer to Trivandrum airport." },
    ],
  },
  {
    slug: "kerala-ultimate-escape",
    title: "Kerala Ultimate Escape",
    destinationSlug: "kerala",
    category: "Beach",
    nights: 6,
    days: 7,
    price: "₹18,999",
    priceValue: 18999,
    image: kovalamImg,
    inclusions: [
      "Beachfront Resort Stay",
      "Varkala Cliff View",
      "Alleppey Houseboat Night",
      "Munnar & Thekkady Stays",
      "Daily Breakfast",
    ],
    itinerary: [
      { day: 1, title: "Cochin to Munnar", detail: "Hill station drive and stay." },
      { day: 2, title: "Munnar Sightseeing", detail: "Tea estates and Eravikulam park." },
      { day: 3, title: "Munnar to Thekkady", detail: "Periyar wildlife and spice gardens." },
      { day: 4, title: "Thekkady to Alleppey", detail: "Houseboat backwaters cruise." },
      { day: 5, title: "Alleppey to Varkala", detail: "Varkala red cliff beach and sunset." },
      { day: 6, title: "Varkala to Kovalam", detail: "Lighthouse beach relaxation." },
      { day: 7, title: "Departure", detail: "Transfer to Trivandrum airport." },
    ],
  },
  {
    slug: "kerala-grand-discovery",
    title: "Kerala Grand Discovery",
    destinationSlug: "kerala",
    category: "Adventure",
    nights: 7,
    days: 8,
    price: "₹21,999",
    priceValue: 21999,
    image: vagamonImg,
    inclusions: [
      "Munnar & Vagamon Stays",
      "Periyar Jungle Trek",
      "Alleppey Houseboat Stay",
      "Varkala & Trivandrum Tours",
      "Kanyakumari Sunset Tour",
    ],
    itinerary: [
      { day: 1, title: "Cochin to Munnar", detail: "Check in & local waterfalls." },
      { day: 2, title: "Munnar Exploration", detail: "Tea museum & Eravikulam park." },
      { day: 3, title: "Munnar to Thekkady", detail: "Spices tour & boat ride." },
      { day: 4, title: "Thekkady to Alleppey", detail: "Backwater cruise & night stay." },
      { day: 5, title: "Alleppey to Varkala", detail: "Cliff view & sunset." },
      { day: 6, title: "Varkala to Trivandrum", detail: "City tour & temple visit." },
      { day: 7, title: "Trivandrum to Kanyakumari", detail: "Vivekananda rock memorial." },
      { day: 8, title: "Departure", detail: "Transfer to Trivandrum airport." },
    ],
  },
  {
    slug: "kerala-tamil-nadu-grand-escape",
    title: "Kerala & Tamil Nadu Grand Escape",
    destinationSlug: "kerala",
    category: "Culture",
    nights: 8,
    days: 9,
    price: "₹24,999",
    priceValue: 24999,
    image: tamilNaduImg,
    inclusions: [
      "Complete Kerala Circuit",
      "Kanyakumari Sunset View",
      "Madurai Meenakshi Temple Visit",
      "Alleppey Houseboat Night",
      "Daily Breakfast",
    ],
    itinerary: [
      { day: 1, title: "Arrive Cochin", detail: "Drive to Munnar." },
      { day: 2, title: "Munnar Sightseeing", detail: "Tea estates & dam." },
      { day: 3, title: "Munnar to Thekkady", detail: "Spice gardens." },
      { day: 4, title: "Thekkady to Alleppey", detail: "Houseboat stay." },
      { day: 5, title: "Alleppey to Varkala", detail: "Cliff beach." },
      { day: 6, title: "Varkala to Trivandrum", detail: "Padmanabhaswamy Temple." },
      { day: 7, title: "Trivandrum to Kanyakumari", detail: "Sunset point." },
      { day: 8, title: "Kanyakumari to Madurai", detail: "Meenakshi Temple." },
      { day: 9, title: "Departure", detail: "Drop at Madurai airport/railway station." },
    ],
  },
  {
    slug: "south-india-explorer",
    title: "South India Explorer",
    destinationSlug: "kerala",
    category: "Culture",
    nights: 9,
    days: 10,
    price: "₹26,999",
    priceValue: 26999,
    image: trivandrumImg,
    inclusions: [
      "Grand South India Circuit",
      "Kerala Hills & Backwaters",
      "Kanyakumari & Rameswaram",
      "Madurai Meenakshi Temple",
      "All Transfers & Breakfast",
    ],
    itinerary: [
      { day: 1, title: "Arrive Cochin", detail: "Transfer to Munnar." },
      { day: 2, title: "Munnar Sightseeing", detail: "Tea trails & waterfalls." },
      { day: 3, title: "Thekkady", detail: "Periyar boating & spice tour." },
      { day: 4, title: "Alleppey", detail: "Overnight houseboat cruise." },
      { day: 5, title: "Varkala & Trivandrum", detail: "Cliff beach & city tour." },
      { day: 6, title: "Trivandrum to Kanyakumari", detail: "Rock memorial & sunset." },
      { day: 7, title: "Kanyakumari to Madurai", detail: "Meenakshi temple." },
      { day: 8, title: "Madurai to Rameswaram", detail: "Pamban bridge & temple." },
      { day: 9, title: "Rameswaram Sightseeing", detail: "Dhanushkodi tour." },
      { day: 10, title: "Departure", detail: "Drop at Madurai airport." },
    ],
  },
  {
    slug: "south-india-temple-coastal-escape",
    title: "South India Temple & Coastal Escape",
    destinationSlug: "kerala",
    category: "Culture",
    nights: 4,
    days: 5,
    price: "₹12,999",
    priceValue: 12999,
    image: tamilNaduImg,
    inclusions: [
      "Trivandrum City & Temple",
      "Kanyakumari Memorial",
      "Rameswaram Temple & Beach",
      "Madurai Meenakshi Temple",
      "Daily Breakfast",
    ],
    itinerary: [
      { day: 1, title: "Arrive Trivandrum", detail: "Padmanabhaswamy temple & Kovalam." },
      { day: 2, title: "Trivandrum to Kanyakumari", detail: "Vivekananda rock memorial." },
      { day: 3, title: "Kanyakumari to Rameswaram", detail: "Ramanathaswamy temple." },
      { day: 4, title: "Rameswaram to Madurai", detail: "Meenakshi Amman temple." },
      { day: 5, title: "Departure", detail: "Transfer to Madurai airport." },
    ],
  },
  {
    slug: "kannur-theyyam-experience",
    title: "Kannur Theyyam Experience",
    destinationSlug: "kerala",
    category: "Culture",
    nights: 1,
    days: 2,
    price: "₹4,999",
    priceValue: 4999,
    image: TheyyamImg,
    inclusions: [
      "Theyyam Ritual Tour",
      "Kannur Beach Stay",
      "Local Sightseeing",
      "Daily Breakfast",
      "Kannur Pickup & Drop",
    ],
    itinerary: [
      { day: 1, title: "Arrive Kannur & Theyyam Night", detail: "Check-in, evening and night Theyyam ritual performance." },
      { day: 2, title: "Kannur Sightseeing & Departure", detail: "St. Angelo Fort, Drive-in Beach & departure." },
    ],
  },
];

export async function getPackages(): Promise<Pkg[]> {
  try {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) return PACKAGES_FALLBACK;

    return data.map((row: any) => ({
      slug: row.slug,
      title: row.title,
      destinationSlug: row.destination_slug,
      category: row.category,
      nights: row.nights,
      days: row.days,
      price: row.price,
      priceValue: row.price_value,
      inclusions: row.inclusions || [],
      itinerary: row.itinerary || [],
      image: PKG_IMAGES[row.slug] || row.image || undefined,
    }));
  } catch (err) {
    console.error("Error fetching packages:", err);
    return PACKAGES_FALLBACK;
  }
}

export function getPackage(slug: string) {
  return PACKAGES_FALLBACK.find((p) => p.slug === slug);
}

export function destinationFor(pkg: Pkg) {
  return destinations.find((d) => d.slug === pkg.destinationSlug)!;
}

export const packages = PACKAGES_FALLBACK;
