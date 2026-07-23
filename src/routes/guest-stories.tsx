import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Star, Search, Filter, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { PageHeader } from "@/components/site/PageHeader";
import { supabase } from "@/lib/supabase";
import { getOptimizedImageUrl } from "@/lib/utils";

export const Route = createFileRoute("/guest-stories")({
  head: () => ({
    meta: [
      { title: "Traveler Experiences & Guest Stories | Cabo Tours" },
      {
        name: "description",
        content:
          "Read authentic travel reviews, guest stories, and holiday diaries from travelers who explored the world with Cabo Tours & Travels.",
      },
    ],
  }),
  component: GuestStoriesPage,
});

interface StoryImage {
  image_url: string;
}

interface GuestStoryData {
  id: string;
  name: string;
  username: string | null;
  avatar_url: string | null;
  country: string | null;
  destination: string;
  story: string;
  rating: number;
  trip_date: string;
  created_at: string;
  status: string;
  slug: string;
  likes: number;
  guest_story_images?: StoryImage[];
}

function GuestStoriesPage() {
  const [stories, setStories] = useState<GuestStoryData[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Pagination state
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("guest_stories")
          .select(`
            *,
            guest_story_images (
              image_url
            )
          `)
          .eq("status", "approved")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setStories(data || []);
      } catch (err) {
        console.error("Error fetching guest stories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Unique list of destinations for dropdown filter
  const destinationsList = useMemo(() => {
    const set = new Set<string>();
    stories.forEach((s) => {
      if (s.destination) set.add(s.destination);
    });
    return Array.from(set).sort();
  }, [stories]);

  // Filter & Sort Stories
  const processedStories = useMemo(() => {
    let result = [...stories];

    // Search query filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.destination.toLowerCase().includes(q) ||
          s.story.toLowerCase().includes(q) ||
          (s.country && s.country.toLowerCase().includes(q))
      );
    }

    // Destination filter
    if (destinationFilter) {
      result = result.filter((s) => s.destination === destinationFilter);
    }

    // Rating filter
    if (ratingFilter) {
      const minRating = parseInt(ratingFilter);
      result = result.filter((s) => s.rating >= minRating);
    }

    // Sort order
    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [stories, search, destinationFilter, ratingFilter, sortOrder]);

  const displayedStories = processedStories.slice(0, visibleCount);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <main className="bg-background min-h-screen text-foreground pb-24">
      <SiteNav transparentOnTop />

      <PageHeader
        eyebrow="Explore Diaries"
        title={
          <>
            Guest Travel
            <br />
            Stories.
          </>
        }
        subtitle="Unfiltered, genuine holiday diaries and photos shared directly by our travelers."
      />

      {/* Filter and Control Bar */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 mt-12 mb-8">
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 flex flex-col gap-6 md:flex-row md:items-center justify-between">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-white/35" />
            <input
              type="text"
              placeholder="Search by traveler name, story, destination..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(6); // reset pagination
              }}
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-brand focus:outline-none transition-colors"
            />
          </div>

          {/* Filters Select row */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Destination filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-brand" />
              <select
                value={destinationFilter}
                onChange={(e) => {
                  setDestinationFilter(e.target.value);
                  setVisibleCount(6);
                }}
                className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white/80 focus:outline-none focus:border-brand"
              >
                <option value="">All Destinations</option>
                {destinationsList.map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div className="flex items-center gap-2">
              <Star className="h-3.5 w-3.5 text-accent fill-accent" />
              <select
                value={ratingFilter}
                onChange={(e) => {
                  setRatingFilter(e.target.value);
                  setVisibleCount(6);
                }}
                className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white/80 focus:outline-none focus:border-brand"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars only</option>
                <option value="4">4 Stars & above</option>
                <option value="3">3 Stars & above</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-3.5 w-3.5 text-white/50" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white/80 focus:outline-none focus:border-brand"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10">
        {loading ? (
          <div className="text-center py-24 text-white/40 text-xs uppercase tracking-[0.2em] animate-pulse">
            Loading stories...
          </div>
        ) : processedStories.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.01] border border-dashed border-white/10 rounded-3xl">
            <p className="text-sm text-white/40">No stories match your criteria.</p>
            <button
              onClick={() => {
                setSearch("");
                setDestinationFilter("");
                setRatingFilter("");
              }}
              className="text-xs text-brand hover:underline mt-2"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedStories.map((story, i) => {
                const coverImage = story.guest_story_images?.[0]?.image_url;
                return (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
                    className="flex flex-col justify-between bg-white/[0.02] border border-white/10 rounded-[24px] p-5 shadow-lg hover:border-brand/30 transition-all hover:bg-white/[0.04]"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand/40 to-brand/10 border border-brand/20 flex items-center justify-center font-display text-xs text-white font-semibold">
                          {getInitials(story.name)}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white/90 leading-none">
                            {story.name}
                          </div>
                          <div className="text-[10px] text-white/40 mt-1">
                            {story.username || `@traveler_${story.name.toLowerCase().replace(/\s+/g, "")}`}
                            {story.country && ` • ${story.country}`}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: story.rating }).map((_, idx) => (
                            <Star key={idx} className="w-3 h-3 text-accent fill-accent" />
                          ))}
                        </div>
                        <span className="text-[9px] text-white/40">
                          {new Date(story.trip_date).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Image (4:3 aspect ratio, rounded, max-h 220px) */}
                    {coverImage && (
                      <div className="relative aspect-[4/3] w-full max-h-[220px] rounded-xl overflow-hidden mb-4 border border-white/5">
                        <img
                          src={getOptimizedImageUrl(coverImage, { width: 400, quality: 75 })}
                          alt={story.destination}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      </div>
                    )}

                    {/* Body */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-medium text-brand mb-1 uppercase tracking-wider">
                          📍 {story.destination}
                        </p>
                        <p className="text-xs text-white/70 leading-relaxed line-clamp-3">
                          {story.story}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                        <Link
                          to={`/guest-stories/$slug`}
                          params={{ slug: story.slug }}
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand tracking-wider uppercase hover:text-white transition cursor-pointer"
                        >
                          Read Full Story →
                        </Link>
                        <span className="text-[10px] text-white/30">
                          ❤ {story.likes || 0}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Load More Button */}
            {processedStories.length > visibleCount && (
              <div className="flex justify-center mt-12">
                <Button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3.5 border border-white/10 hover:border-brand/40 bg-white/[0.02] hover:bg-brand/5 text-[11px] tracking-[0.2em] uppercase text-white hover:text-brand rounded-full transition-all duration-300 w-full max-w-xs text-center"
                >
                  Load More Stories
                </Button>
              </div>
            )}
          </div>
        )}
      </section>

      <SiteFooter />
      <WhatsAppFab />
    </main>
  );
}
