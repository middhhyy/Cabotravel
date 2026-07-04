import bali from "@/assets/dest-bali.webp";
import kerala from "@/assets/dest-kerala.webp";
import maldives from "@/assets/dest-maldives.webp";
import kashmir from "@/assets/dest-kashmir.webp";
import dubai from "@/assets/dest-dubai.webp";
import thailand from "@/assets/dest-thailand.webp";

export interface GuestStory {
  id: string;
  name: string;
  username: string;
  platform: string;
  time: string;
  caption: string;
  img: string; // Can be a preset name or external URL
  likes: string;
  comments: string;
  destination: string;
  height: string;
}

export const DESTINATION_PRESETS: Record<string, string> = {
  Bali: bali,
  Kerala: kerala,
  Maldives: maldives,
  Kashmir: kashmir,
  Dubai: dubai,
  Thailand: thailand,
};

const DEFAULT_STORIES: GuestStory[] = [
  {
    id: "1",
    name: "Priya Sharma",
    username: "@priya_explorer",
    platform: "Instagram",
    time: "2 days ago",
    caption:
      "Watching the sun rise over Ubud rice fields. Absolutely magical morning orchestrated by @cabotours! 🌅✨",
    img: "Bali",
    likes: "512",
    comments: "42",
    destination: "Bali",
    height: "h-[360px] md:h-[400px]",
  },
  {
    id: "2",
    name: "Arun Kumar",
    username: "@arun.travels",
    platform: "TripAdvisor",
    time: "4 days ago",
    caption:
      "Drifted along the quiet backwaters of Alleppey. Pure bliss and slow living at its best. 🛶🌴",
    img: "Kerala",
    likes: "342",
    comments: "28",
    destination: "Kerala",
    height: "h-[320px] md:h-[350px]",
  },
  {
    id: "3",
    name: "John Doe",
    username: "@johndoe",
    platform: "Google Reviews",
    time: "1 week ago",
    caption:
      "A gorgeous private villa in Maldives. Incredible coral reefs and turquoise waters right under our deck. 🐠🌊",
    img: "Maldives",
    likes: "189",
    comments: "12",
    destination: "Maldives",
    height: "h-[340px] md:h-[380px]",
  },
  {
    id: "4",
    name: "Sara K.",
    username: "@sara_k",
    platform: "Instagram",
    time: "5 days ago",
    caption:
      "Snowline mornings in Gulmarg. Breathtaking views, and cabo took care of everything! ❄️🏔️",
    img: "Kashmir",
    likes: "295",
    comments: "19",
    destination: "Kashmir",
    height: "h-[360px] md:h-[410px]",
  },
  {
    id: "5",
    name: "Sarah & Mark",
    username: "@dubai_diaries",
    platform: "TripAdvisor",
    time: "1 week ago",
    caption:
      "Looking out at the futuristic cityscape at night. Absolutely unforgettable experience. 🌃✨",
    img: "Dubai",
    likes: "410",
    comments: "31",
    destination: "Dubai",
    height: "h-[320px] md:h-[360px]",
  },
  {
    id: "6",
    name: "Rahul Verma",
    username: "@thailand_vibes",
    platform: "Instagram",
    time: "3 days ago",
    caption:
      "Island hopping in Phi Phi. Clear jade water, longtail boat rides. Everything was seamless! 🏝️⛵",
    img: "Thailand",
    likes: "254",
    comments: "15",
    destination: "Thailand",
    height: "h-[350px] md:h-[390px]",
  },
];

export const getStories = (): GuestStory[] => {
  if (typeof window === "undefined") return DEFAULT_STORIES;
  const stored = localStorage.getItem("cabo_guest_stories");
  if (!stored) {
    localStorage.setItem("cabo_guest_stories", JSON.stringify(DEFAULT_STORIES));
    return DEFAULT_STORIES;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_STORIES;
  }
};

export const saveStories = (stories: GuestStory[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cabo_guest_stories", JSON.stringify(stories));
  }
};

export const getStoryImage = (img: string): string => {
  return DESTINATION_PRESETS[img] || img;
};
