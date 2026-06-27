import kerala from "@/assets/dest-kerala.jpg";
import kashmir from "@/assets/dest-kashmir.jpg";
import dubai from "@/assets/dest-dubai.jpg";
import bali from "@/assets/dest-bali.jpg";
import maldives from "@/assets/dest-maldives.jpg";
import thailand from "@/assets/dest-thailand.jpg";

import keralaHero from "@/assets/hero-alleppey-backwaters.png";
import kashmirHero from "@/assets/hero-kashmir-dallake.png";
import dubaiHero from "@/assets/hero-dubai-skyline.png";
import baliHero from "@/assets/dest-bali.jpg";
import maldivesHero from "@/assets/dest-maldives.jpg";
import thailandHero from "@/assets/dest-thailand.jpg";

export type Destination = {
  slug: string;
  name: string;
  region: "Domestic" | "International";
  country: string;
  image: string;
  heroImage?: string;
  tagline: string;
  description: string;
  highlights: string[];
  bestTime: string;
  duration: string;
  startingFrom: string;
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
      "Drift through palm-lined backwaters on a teakwood houseboat, sip cardamom tea in Munnar's tea estates, and unwind on quiet Varkala cliffs as Kerala unfolds in slow, golden frames.",
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
    name: "Kashmir",
    region: "Domestic",
    country: "India",
    image: kashmir,
    heroImage: kashmirHero,
    tagline: "Paradise on Earth",
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
    slug: "dubai",
    name: "Dubai",
    region: "International",
    country: "United Arab Emirates",
    image: dubai,
    heroImage: dubaiHero,
    tagline: "City of Gold",
    description:
      "From Burj Khalifa sunsets to silent desert dunes, Dubai is a city of contrasts — curated to your tempo with private dining, dhow cruises and skyline suites.",
    highlights: ["Burj Khalifa", "Desert Safari", "Dhow Cruise", "Palm Jumeirah", "Global Village"],
    bestTime: "Nov – Mar",
    duration: "5 nights",
    startingFrom: "₹49,900",
  },
  {
    slug: "bali",
    name: "Bali",
    region: "International",
    country: "Indonesia",
    image: bali,
    heroImage: baliHero,
    tagline: "Island of the Gods",
    description:
      "Wake to mist rolling over Ubud's emerald rice terraces, surf Uluwatu's golden coast and end days in candlelit cliffside villas.",
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
  },
  {
    slug: "maldives",
    name: "Maldives",
    region: "International",
    country: "Maldives",
    image: maldives,
    heroImage: maldivesHero,
    tagline: "Atolls & Overwater Villas",
    description:
      "Private villas perched above translucent lagoons, coral gardens a single step beneath your deck, and seaplane transfers framed by atolls.",
    highlights: [
      "Overwater Villas",
      "Coral Reef Snorkel",
      "Seaplane Transfer",
      "Sandbank Picnic",
      "Spa Rituals",
    ],
    bestTime: "Nov – Apr",
    duration: "4 – 5 nights",
    startingFrom: "₹78,900",
  },
  {
    slug: "thailand",
    name: "Thailand",
    region: "International",
    country: "Thailand",
    image: thailand,
    heroImage: thailandHero,
    tagline: "Smiles, Sand & Spice",
    description:
      "Longtail boats, limestone cathedrals and waters the color of polished jade — Thailand pairs cinematic islands with electric city nights.",
    highlights: [
      "Phi Phi Islands",
      "Bangkok Markets",
      "Phuket Beaches",
      "Krabi Caves",
      "Chiang Mai Temples",
    ],
    bestTime: "Nov – Apr",
    duration: "6 nights",
    startingFrom: "₹42,500",
  },
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
