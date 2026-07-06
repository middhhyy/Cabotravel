import { destinations } from "./destinations";
import backwatersImg from "@/assets/pkg-kerala-backwaters.webp";
import munnarImg from "@/assets/pkg-munnar-hills.webp";
import kovalamImg from "@/assets/pkg-kovalam-beach.webp";
import trivandrumImg from "@/assets/pkg-trivandrum-heritage.webp";
import thekkadyImg from "@/assets/pkg-thekkady-wildlife.webp";
import ayurvedaImg from "@/assets/pkg-ayurveda-wellness.webp";
import wayanadImg from "@/assets/pkg-wayanad-romantic.webp";
import vagamonImg from "@/assets/pkg-vagamon-adventure.webp";
import fortKochiImg from "@/assets/pkg-fort-kochi-culture.webp";

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

export const packages: Pkg[] = [
  {
    slug: "kerala-backwaters-escape",
    title: "Kerala Backwaters Escape",
    destinationSlug: "kerala",
    category: "Backwaters",
    nights: 5,
    days: 6,
    price: "₹24,900",
    priceValue: 24900,
    image: backwatersImg,
    inclusions: [
      "Luxury Houseboat Night",
      "Premium Resort Stays",
      "All Private Transfers",
      "Daily Breakfast",
      "Backwater Cruise",
      "Traditional Welcome",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Kochi",
        detail: "Airport pickup, Fort Kochi heritage walk and welcome dinner.",
      },
      {
        day: 2,
        title: "Kochi to Alleppey",
        detail: "Board the luxury houseboat, cruise through scenic backwaters.",
      },
      {
        day: 3,
        title: "Alleppey to Kumarakom",
        detail: "Check-in at a luxury lakeside resort, bird sanctuary visit.",
      },
      {
        day: 4,
        title: "Kumarakom Wellness",
        detail: "Ayurvedic massage and traditional village canoe tour.",
      },
      {
        day: 5,
        title: "Kumarakom to Kochi",
        detail: "Return to Kochi, shopping and evening Kathakali performance.",
      },
      {
        day: 6,
        title: "Departure",
        detail: "Transfer to Kochi airport.",
      },
    ],
  },
  {
    slug: "munnar-hills-retreat",
    title: "Munnar Hills Retreat",
    destinationSlug: "kerala",
    category: "Hill Station",
    nights: 4,
    days: 5,
    price: "₹18,500",
    priceValue: 18500,
    image: munnarImg,
    inclusions: [
      "Misty Hill Stays",
      "Tea Estate Tour",
      "Private Cab Guide",
      "Daily Breakfast",
      "Eravikulam Entry Ticket",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Kochi & Drive to Munnar",
        detail: "Scenic waterfalls enroute, check-in at hill resort.",
      },
      {
        day: 2,
        title: "Munnar Tea Trail",
        detail: "Tea plantation walk, Tea Museum, and Mattupetty Dam.",
      },
      {
        day: 3,
        title: "Eravikulam National Park",
        detail: "Spot the endangered Nilgiri Tahr, Anamudi peak views.",
      },
      {
        day: 4,
        title: "Lakkam Waterfalls & Marayoor",
        detail: "Sandalwood forest drive and waterfalls excursion.",
      },
      {
        day: 5,
        title: "Departure",
        detail: "Drive back to Kochi airport.",
      },
    ],
  },
  {
    slug: "kovalam-beach-getaway",
    title: "Kovalam Beach Getaway",
    destinationSlug: "kerala",
    category: "Beach",
    nights: 4,
    days: 5,
    price: "₹21,900",
    priceValue: 21900,
    image: kovalamImg,
    inclusions: [
      "Beachfront Resort Stays",
      "Ayurvedic Foot Massage",
      "All Airport Transfers",
      "Daily Breakfast",
      "Sunset Cruise",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Trivandrum & Transfer to Kovalam",
        detail: "Beachfront check-in, leisure evening.",
      },
      {
        day: 2,
        title: "Kovalam Sightseeing",
        detail: "Lighthouse beach, Hawah beach, and Samudra beach.",
      },
      {
        day: 3,
        title: "Poovar Island Day Trip",
        detail: "Estuary cruise, golden sand beach, and mangrove forest.",
      },
      {
        day: 4,
        title: "Wellness & Leisure",
        detail: "Rejuvenating Ayurvedic massage, beachside seafood dinner.",
      },
      {
        day: 5,
        title: "Departure",
        detail: "Transfer to Trivandrum airport.",
      },
    ],
  },
  {
    slug: "trivandrum-heritage-experience",
    title: "Trivandrum Heritage Experience",
    destinationSlug: "kerala",
    category: "Heritage",
    nights: 4,
    days: 5,
    price: "₹19,900",
    priceValue: 19900,
    image: trivandrumImg,
    inclusions: [
      "Heritage Hotel Stay",
      "Padmanabhaswamy Temple Tour",
      "Private Guided Walk",
      "Daily Breakfast",
      "Kuthiramalika Palace entry",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Trivandrum",
        detail: "Check-in at heritage hotel, evening city orientation.",
      },
      {
        day: 2,
        title: "Royal Heritage Tour",
        detail: "Sree Padmanabhaswamy Temple visit, Kuthiramalika Palace.",
      },
      {
        day: 3,
        title: "Art & History",
        detail: "Napier Museum, Chitra Art Gallery, and Kanakakkunnu Palace.",
      },
      {
        day: 4,
        title: "Kovalam Excursion",
        detail: "Day trip to Kovalam beach, evening sunset tea.",
      },
      {
        day: 5,
        title: "Departure",
        detail: "Airport transfer.",
      },
    ],
  },
  {
    slug: "thekkady-wildlife-adventure",
    title: "Thekkady Wildlife Adventure",
    destinationSlug: "kerala",
    category: "Wildlife",
    nights: 4,
    days: 5,
    price: "₹17,900",
    priceValue: 17900,
    image: thekkadyImg,
    inclusions: [
      "Jungle Resort Stays",
      "Periyar Boat Safari",
      "Spice Plantation Tour",
      "Daily Breakfast",
      "Kalaripayattu Show",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Kochi & Drive to Thekkady",
        detail: "Check-in at jungle resort, evening plantation walk.",
      },
      {
        day: 2,
        title: "Periyar National Park",
        detail: "Early morning boat safari to spot wild elephants, bison.",
      },
      {
        day: 3,
        title: "Spice & Adventure",
        detail: "Spice shopping, elephant ride, and Kalaripayattu martial arts show.",
      },
      {
        day: 4,
        title: "Gavi Jungle Excursion",
        detail: "Full day jeep safari, trekking, and canoeing in Gavi.",
      },
      {
        day: 5,
        title: "Departure",
        detail: "Drive to Kochi or Madurai airport.",
      },
    ],
  },
  {
    slug: "ayurveda-wellness-retreat",
    title: "Ayurveda & Wellness Retreat",
    destinationSlug: "kerala",
    category: "Ayurveda",
    nights: 3,
    days: 4,
    price: "₹29,900",
    priceValue: 29900,
    image: ayurvedaImg,
    inclusions: [
      "Ayurvedic Eco-Resort",
      "Daily Wellness Sessions",
      "Organic Sattvic Meals",
      "Consultation with Doctor",
      "Yoga Sessions",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive & Consult",
        detail: "Wellness resort check-in, detailed doctor consultation, light massage.",
      },
      {
        day: 2,
        title: "Rejuvenation Therapy",
        detail: "Morning yoga, Abhyanga oil massage, and herbal steam bath.",
      },
      {
        day: 3,
        title: "Detox & Meditation",
        detail: "Shirodhara therapy, guided meditation, and organic food cooking demo.",
      },
      {
        day: 4,
        title: "Departure",
        detail: "Final consultation and transfer to airport.",
      },
    ],
  },
  {
    slug: "wayanad-romantic-escape",
    title: "Wayanad Romantic Escape",
    destinationSlug: "kerala",
    category: "Honeymoon",
    nights: 5,
    days: 6,
    price: "₹31,900",
    priceValue: 31900,
    image: wayanadImg,
    inclusions: [
      "Treehouse/Villa Stay",
      "Candlelight Dinner",
      "Private Valley Guide",
      "Daily Breakfast",
      "Honeymoon Cake & Decor",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Calicut & Drive to Wayanad",
        detail: "Scenic ghat pass drive, luxury villa check-in.",
      },
      {
        day: 2,
        title: "Banasura Sagar Dam",
        detail: "Speedboat ride on India's largest earth dam, Karlad lake.",
      },
      {
        day: 3,
        title: "Edakkal Caves & Trek",
        detail: "Cave exploration, romantic sunset viewpoint walk.",
      },
      {
        day: 4,
        title: "Pookode Lake & Lakkidi",
        detail: "Pedal boating, viewpoint visit, and romantic candlelight dinner.",
      },
      {
        day: 5,
        title: "Soochipara Waterfalls",
        detail: "Walk through tea gardens and swimming in waterfalls pool.",
      },
      {
        day: 6,
        title: "Departure",
        detail: "Transfer to Calicut airport.",
      },
    ],
  },
  {
    slug: "vagamon-adventure-trails",
    title: "Vagamon Adventure Trails",
    destinationSlug: "kerala",
    category: "Adventure",
    nights: 3,
    days: 4,
    price: "₹15,900",
    priceValue: 15900,
    image: vagamonImg,
    inclusions: [
      "Adventure Resort Stay",
      "Paragliding Session",
      "Off-road Jeep Safari",
      "Daily Breakfast",
      "Pine Forest Trek",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Kochi & Drive to Vagamon",
        detail: "Green meadows check-in, sunset pine forest walk.",
      },
      {
        day: 2,
        title: "Paragliding & Meadows",
        detail: "Thrilling paragliding flight (tandem), Vagamon Kurisumala.",
      },
      {
        day: 3,
        title: "Off-Road Safari",
        detail: "Extreme 4x4 jeep safari to Uluppuni waterfalls and views.",
      },
      {
        day: 4,
        title: "Departure",
        detail: "Scenic return drive to Kochi airport.",
      },
    ],
  },
  {
    slug: "fort-kochi-heritage-walk",
    title: "Fort Kochi Heritage Walk",
    destinationSlug: "kerala",
    category: "Culture",
    nights: 3,
    days: 4,
    price: "₹12,900",
    priceValue: 12900,
    image: fortKochiImg,
    inclusions: [
      "Boutique Heritage Stays",
      "Guided Heritage Walk",
      "Kathakali Performance",
      "Daily Breakfast",
      "Chinese Net Experience",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Kochi",
        detail: "Boutique hotel check-in, sunset walk near Chinese fishing nets.",
      },
      {
        day: 2,
        title: "Fort Kochi & Mattancherry",
        detail: "Jewish Synagogue, Dutch Palace, St. Francis Church.",
      },
      {
        day: 3,
        title: "Arts & Culture",
        detail: "Kathakali dance theatre, cooking class for authentic Kerala spices.",
      },
      {
        day: 4,
        title: "Departure",
        detail: "Transfer to Kochi airport.",
      },
    ],
  },
];

export function getPackage(slug: string) {
  return packages.find((p) => p.slug === slug);
}

export function destinationFor(pkg: Pkg) {
  return destinations.find((d) => d.slug === pkg.destinationSlug)!;
}
