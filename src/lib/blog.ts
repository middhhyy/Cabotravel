import { supabase } from "./supabase";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  author: string;
  published: boolean;
  published_at: string | null;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
  updated_at?: string;
  reading_time_minutes?: number;
}

export const BLOG_CATEGORIES = [
  "All",
  "Kerala Guides",
  "International",
  "Honeymoon",
  "Travel Tips",
  "Itineraries",
] as const;

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-post-1",
    title: "The Ultimate Kerala Backwaters Guide: Alleppey vs Kumarakom Houseboats",
    slug: "kerala-backwaters-alleppey-vs-kumarakom-guide",
    excerpt:
      "Choosing between Alleppey's vibrant waterways and Kumarakom's tranquil luxury. Everything you need to know about houseboat routes, overnight stays, and authentic onboard cuisine.",
    content: `## The Magic of God's Own Country

Sailing across Kerala's emerald backwaters is an experience that lingers long after your vacation ends. Gliding past water lilies, swaying coconut palms, and quiet village shores while sipping fresh tender coconut water is a tranquil antidote to bustling city life.

However, travellers planning their first backwaters voyage often face a key dilemma: **Should you choose Alleppey (Alappuzha) or Kumarakom?**

---

### Alleppey: The Venetian Heart of Kerala
Alleppey is widely renowned as the bustling epicenter of Kerala's backwater network. 

- **Vibe:** Lively, vibrant, and rich with rural river culture.
- **Scenery:** Endless paddy fields of Kuttanad, traditional duck farms, coir-making villages, and bridges where locals wave from shore.
- **Houseboat Experience:** Countless luxury and premium houseboats dock at Punnamada and Nehru Trophy finishing points. Ideal if you want a classic, vibrant cruise with bustling village sights.

---

### Kumarakom: Serenity & Sanctuary
Located on the eastern banks of the vast Vembanad Lake, Kumarakom offers a quieter, more secluded retreat.

- **Vibe:** Peaceful, luxurious, and scenic with panoramic open-water views.
- **Scenery:** Overlooks the vast open lake and the famous Kumarakom Bird Sanctuary, home to migratory herons, cormorants, and Siberian cranes.
- **Houseboat Experience:** Premium cruiser boats and heritage converted kettuvallams that offer calm, unhurried journeys away from traffic.

---

### Key Tips Before Booking Your Houseboat

1. **Opt for a Private AC Houseboat:** Premium boats offer glass-walled air-conditioned dining and living zones with personalized onboard chefs.
2. **Traditional Karimeen Pollichathu:** Ensure your onboard menu includes freshly caught pearl spot fish marinated in Kerala spices and wrapped in banana leaves.
3. **Route Recommendation:** For 1 night, Alleppey to Champakulam or Kumarakom to Pathiramanal Island delivers the highest scenic value.

*Planning your bespoke Kerala getaway? Contact Cabo Tours & Travels for curated itineraries tailored to couples, families, and private groups.*`,
    featured_image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
    category: "Kerala Guides",
    author: "Cabo Editorial Team",
    published: true,
    published_at: "2026-02-15T09:00:00Z",
    seo_title: "Kerala Backwaters Guide: Alleppey vs Kumarakom Houseboats | Cabo Tours",
    seo_description:
      "Complete guide comparing Alleppey and Kumarakom houseboat cruises in Kerala. Discover routes, costs, authentic culinary highlights, and booking tips.",
    created_at: "2026-02-15T09:00:00Z",
    reading_time_minutes: 5,
  },
  {
    id: "blog-post-2",
    title: "7 Days in Bali: The Perfect Balance of Temples, Waterfalls & Coastal Sunsets",
    slug: "7-days-in-bali-itinerary-temples-waterfalls-coastal-sunsets",
    excerpt:
      "From the misty jungle terraces of Ubud to the cliffside temple of Uluwatu and Nusa Penida's dramatic coastline. A crafted week-long blueprint for your Bali vacation.",
    content: `## Designing the Ideal Week in the Island of the Gods

Bali is a tapestry of volcanic ridges, sacred Hindu shrines, terraced rice paddies, and world-class ocean sunsets. But because Bali's regions possess vastly different personalities, sequencing your trip correctly is essential to avoid spending hours in traffic.

Here is Cabo's field-tested 7-day luxury itinerary designed for relaxation, cultural immersion, and unforgettable vistas.

---

### Days 1–3: The Cultural Heartland of Ubud
Base yourself among the tropical rainforests and valleys of Ubud.

- **Tegallalang Rice Terraces & Jungle Swings:** Wake up early to catch the morning mist over the iconic carved paddies.
- **Tirta Empul Water Purification Temple:** Participate respectfully in the sacred springs ritual.
- **Hidden Waterfalls:** Head north to Kanto Lampo or Tibumana for secluded swimming spots before the crowds arrive.
- **Evening:** Dine in style overlooking the Petanu River gorge.

---

### Day 4: Island Escape to Nusa Penida
Take a swift 35-minute speedboat from Sanur to Nusa Penida.

- Marvel at the iconic T-Rex shaped cliff of **Kelingking Beach**.
- Swim in the natural infinity pool of **Angel's Billabong** and admire **Broken Beach**.
- Return to the mainland in the late afternoon for seaside relaxation.

---

### Days 5–7: Seminyak, Uluwatu & Coastal Luxury
Move south to the limestone cliffs and stylish beaches of Uluwatu and Seminyak.

- **Uluwatu Sunset Temple & Kecak Fire Dance:** Watch the sun dip into the Indian Ocean as the rhythmic chants echo along the amphitheater atop 70-meter cliffs.
- **Jimbaran Bay Seafood Dinner:** Candlelit dining right on the sand with grilled lobster and local sambal.
- **Beach Club Leisure:** Spend your final day lounging by cliffside infinity pools with curated music and refreshing mocktails.

---

### Visa & Travel Essentials
- **Visa on Arrival (e-VoA):** Indian and international passports can easily get the 30-day VoA online or at DPS airport.
- **Currency:** Indonesian Rupiah (IDR). Credit cards are widely accepted in Ubud and Seminyak, but carry cash for temple entry.`,
    featured_image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    category: "International",
    author: "Sara Mathew",
    published: true,
    published_at: "2026-02-28T10:30:00Z",
    seo_title: "7 Days in Bali Itinerary: Temples, Waterfalls & Coast | Cabo Tours",
    seo_description:
      "The definitive 7-day Bali travel itinerary covering Ubud, Nusa Penida, Seminyak, and Uluwatu cliffs crafted by Cabo Tours & Travels.",
    created_at: "2026-02-28T10:30:00Z",
    reading_time_minutes: 6,
  },
  {
    id: "blog-post-3",
    title: "Kashmir in All Four Seasons: When Should You Actually Visit?",
    slug: "kashmir-in-all-four-seasons-when-to-visit-guide",
    excerpt:
      "Tulip blooms in spring, cool mountain breezes in summer, golden chinar leaves in autumn, or snow-carpeted Gulmarg in winter. Discover the right season for your holiday.",
    content: `## Paradise on Earth Across the Calendar

Emperor Jahangir famously declared of Kashmir: *"If there is a paradise on earth, it is this, it is this, it is this."* 

Yet Kashmir is not a single experience—it transforms completely every three months. Here is a clear breakdown of what each season offers to help you plan your dream holiday.

---

### 1. Spring (Late March – Early May): The Great Blossom
- **Why go:** The world-famous Indira Gandhi Memorial Tulip Garden in Srinagar bursts into vibrant rainbow hues against the Zabarwan range.
- **Highlight:** Millions of tulips, almond orchards in full bloom, mild daytime temperatures (15°C–20°C), and crystal-clear Dal Lake reflections.
- **Best for:** Photographers, leisure seekers, and garden enthusiasts.

---

### 2. Summer (May – August): Cool Alpine Escapes
- **Why go:** While the plains of India swelter in summer heat, Kashmir remains comfortably crisp and sunny.
- **Highlight:** Lush green meadows of Sonamarg ("Meadow of Gold"), pony rides across Betaab Valley in Pahalgam, and trout fishing along the Lidder River.
- **Best for:** Family holidays, trekking, and school summer breaks.

---

### 3. Autumn (September – November): The Golden Chinar Glow
- **Why go:** Kashmir turns into a golden-crimson wonderland as majestic Chinar trees shed their amber leaves.
- **Highlight:** Saffron harvesting in Pampore, crisp mountain air, fresh apple orchard picking, and fewer tourist crowds.
- **Best for:** Romantic couple holidays and honeymooners seeking tranquility.

---

### 4. Winter (December – February): A Real-Life Snow Globe
- **Why go:** Gulmarg becomes Asia's premier skiing destination with heavy powder snow and the world's second-highest operating cable car (the Gulmarg Gondola).
- **Highlight:** Waking up in a wooden heritage hotel with heating and bukhari, sipping hot Kashmiri Kahwa with saffron and crushed almonds, and sledding on Apharwat Peak.
- **Best for:** Snow lovers, winter sports adventurers, and honeymooners.`,
    featured_image:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200&auto=format&fit=crop",
    category: "Itineraries",
    author: "Rohit Varma",
    published: true,
    published_at: "2026-03-01T11:00:00Z",
    seo_title: "Best Time to Visit Kashmir: Spring, Summer, Autumn or Winter | Cabo Tours",
    seo_description:
      "Find the best season to visit Kashmir. Complete weather, sightseeing, and Gondola booking guide for Srinagar, Gulmarg, and Pahalgam.",
    created_at: "2026-03-01T11:00:00Z",
    reading_time_minutes: 5,
  },
  {
    id: "blog-post-4",
    title: "Maldives Luxury on a Budget: Overwater Villas vs Beach Bungalows",
    slug: "maldives-luxury-overwater-villas-vs-beach-bungalows-guide",
    excerpt:
      "How to experience world-class Maldivian turquoise lagoons, speedboats, and all-inclusive resort dining without unnecessary expense.",
    content: `## The Secret to Booking a Smart Maldivian Honeymoon

The Maldives is famous for its turquoise atolls, powder-white sandbanks, and iconic villas perched on stilts above coral reefs. But navigating meal plans, seaplane transfers, and room categories can make a huge difference to your final trip cost and overall experience.

---

### Split Stay: The Ultimate Honeymoon Secret
Why choose between a beachfront bungalow and a lagoon overwater villa when you can enjoy both?

- **The Strategy:** Book a 4-night itinerary with **2 Nights in a Beach Pool Bungalow** followed by **2 Nights in an Overwater Sunrise/Sunset Villa**.
- **The Benefit:** Beach bungalows give you direct walk-out access to the powdery sand and lush garden shade, while the water villa offers direct lagoon snorkeling ladders and starlit infinity plunge pools. You save 30–40% compared to booking the water villa for all 4 nights!

---

### Choosing the Right Meal Plan
1. **All-Inclusive (AI):** Highly recommended for the Maldives. Since private island resorts have no outside restaurants, an all-inclusive plan covering breakfast, lunch, 3-course dinner, cocktails, and afternoon snacks eliminates unexpected checkout surprises.
2. **Full Board (FB):** Includes all 3 meals, but drinks are billed separately. Best for non-alcohol drinkers.

---

### Speedboat vs Seaplane Transfers
- **Speedboat Resorts (North & South Malé Atolls):** Fast, 20–45 minute transfers directly from Velana International Airport. No luggage weight restrictions and available 24/7.
- **Seaplane Resorts (Outer Atolls like Baa or Ari):** Offers breathtaking aerial views of coral atolls, but operates only during daylight hours and has strict 20kg luggage caps.`,
    featured_image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop",
    category: "Honeymoon",
    author: "Cabo Editorial Team",
    published: true,
    published_at: "2026-03-02T14:00:00Z",
    seo_title: "Maldives Overwater Villas vs Beach Bungalows Guide | Cabo Tours",
    seo_description:
      "Expert tips on planning a dream Maldives vacation. Learn about split stays, all-inclusive meal plans, and speedboats vs seaplane transfers.",
    created_at: "2026-03-02T14:00:00Z",
    reading_time_minutes: 4,
  },
];

type BlogPostDbRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  category: string | null;
  author: string | null;
  published: boolean | null;
  published_at: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  created_at: string;
  updated_at?: string | null;
};

export function formatDbRowToBlogPost(row: BlogPostDbRow): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || "",
    content: row.content || "",
    featured_image: row.featured_image || INITIAL_BLOG_POSTS[0].featured_image,
    category: row.category || "Travel Guide",
    author: row.author || "Cabo Editorial Team",
    published: Boolean(row.published),
    published_at: row.published_at || row.created_at,
    seo_title: row.seo_title || undefined,
    seo_description: row.seo_description || undefined,
    created_at: row.created_at,
    updated_at: row.updated_at || undefined,
    reading_time_minutes: calculateReadingTime(row.content || ""),
  };
}

export const blogKeys = {
  all: ["blog"] as const,
  lists: () => [...blogKeys.all, "list"] as const,
  list: (category?: string) => [...blogKeys.lists(), { category }] as const,
  details: () => [...blogKeys.all, "detail"] as const,
  detail: (slug: string) => [...blogKeys.details(), slug] as const,
};

export async function seedInitialBlogPostsIfEmpty(): Promise<BlogPost[]> {
  try {
    const { data: existing, error: checkErr } = await supabase
      .from("blog_posts")
      .select("id")
      .limit(1);

    if (checkErr) {
      console.warn("Table blog_posts not ready for seeding:", checkErr.message);
      return INITIAL_BLOG_POSTS;
    }

    if (existing && existing.length > 0) {
      return [];
    }

    const payloadToInsert = INITIAL_BLOG_POSTS.map(
      ({ id, reading_time_minutes, ...rest }) => ({
        ...rest,
      }),
    );

    const { data, error } = await supabase
      .from("blog_posts")
      .upsert(payloadToInsert, { onConflict: "slug", ignoreDuplicates: true })
      .select();

    if (error || !data) {
      console.warn("Seeding initial blog posts encountered an issue:", error?.message);
      return INITIAL_BLOG_POSTS;
    }

    return (data as BlogPostDbRow[]).map(formatDbRowToBlogPost);
  } catch (err) {
    console.error("Error seeding initial blog posts:", err);
    return INITIAL_BLOG_POSTS;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    let { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error) {
      console.warn("Supabase blog_posts query error, falling back to initial blog data:", error.message);
      return INITIAL_BLOG_POSTS;
    }

    if (!data || data.length === 0) {
      const seeded = await seedInitialBlogPostsIfEmpty();
      if (seeded && seeded.length > 0) {
        return seeded.filter((p) => p.published);
      }
      return INITIAL_BLOG_POSTS;
    }

    return (data as BlogPostDbRow[]).map(formatDbRowToBlogPost);
  } catch (err) {
    console.error("Error in getBlogPosts:", err);
    return INITIAL_BLOG_POSTS;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    let { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !data) {
      const fallback = INITIAL_BLOG_POSTS.find((p) => p.slug === slug);
      return fallback || null;
    }

    return formatDbRowToBlogPost(data as BlogPostDbRow);
  } catch (err) {
    console.error("Error in getBlogPostBySlug:", err);
    const fallback = INITIAL_BLOG_POSTS.find((p) => p.slug === slug);
    return fallback || null;
  }
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
