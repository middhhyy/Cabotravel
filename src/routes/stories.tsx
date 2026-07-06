import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { PageHeader } from "@/components/site/PageHeader";
import { getStories, getStoryImage, GuestStory } from "@/utils/stories";
import { getLikesStateServerFn, toggleLikeServerFn } from "@/services/testimonials/functions";
import { trackEvent } from "@/lib/analytics";
import { getOptimizedImageUrl } from "@/lib/utils";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Guest Travel Stories & Reviews | Cabo Tours & Travels" },
      {
        name: "description",
        content:
          "Read real guest travel stories, verified reviews, and holiday diaries from travelers who booked custom international and domestic packages with Cabo Tours.",
      },
      { property: "og:title", content: "Guest Travel Stories & Reviews | Cabo Tours & Travels" },
      {
        property: "og:description",
        content:
          "Read real guest travel stories, verified reviews, and holiday diaries from travelers who booked custom packages with Cabo Tours.",
      },
      { property: "og:url", content: "https://cabotours.in/stories" },
      { property: "og:image", content: "https://cabotours.in/social-preview.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Guest Travel Stories & Reviews | Cabo Tours & Travels" },
      {
        name: "twitter:description",
        content:
          "Read real guest travel stories, verified reviews, and holiday diaries from travelers who booked custom packages.",
      },
      { name: "twitter:image", content: "https://cabotours.in/social-preview.png" },
    ],
    links: [{ rel: "canonical", href: "https://cabotours.in/stories" }],
  }),
  component: StoriesPage,
});

function StoriesPage() {
  const [stories, setStories] = useState<GuestStory[]>([]);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [likesCounts, setLikesCounts] = useState<Record<string, number>>({});

  const getOrCreateSessionId = () => {
    if (typeof window === "undefined") return "";
    let sessionId = localStorage.getItem("cabo_session_id");
    if (!sessionId) {
      sessionId = "sess-" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("cabo_session_id", sessionId);
    }
    return sessionId;
  };

  useEffect(() => {
    const loadedStories = getStories();

    // Fetch approved feedback from Supabase
    import("@/lib/supabase").then(async ({ supabase }) => {
      try {
        const { data, error } = await supabase
          .from("feedback")
          .select("*")
          .eq("status", "approved")
          .order("created_at", { ascending: false });

        if (!error && data) {
          const dbStories: GuestStory[] = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            username: `@user_${item.name.toLowerCase().replace(/\s+/g, "")}`,
            platform: "Verified Guest",
            time: new Date(item.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            }),
            caption: item.message,
            img: item.image_url || "Kerala", // Fallback to preset if null
            likes: "0",
            comments: "0",
            destination: item.rating ? `⭐ ${item.rating} Rating` : "Cabo Trip",
            height: "h-[350px]"
          }));
          setStories([...dbStories, ...loadedStories]);
        } else {
          setStories(loadedStories);
        }
      } catch {
        setStories(loadedStories);
      }
    }).catch(() => {
      setStories(loadedStories);
    });

    const sessionId = getOrCreateSessionId();
    if (sessionId) {
      getLikesStateServerFn({ data: sessionId })
        .then(({ likedIds, dbCounts }) => {
          setLikedIds(new Set(likedIds));
          const updatedCounts: Record<string, number> = {};
          loadedStories.forEach((s) => {
            const base = parseInt(s.likes) || 0;
            const extra = dbCounts[s.id] || 0;
            updatedCounts[s.id] = base + extra;
          });
          setLikesCounts(updatedCounts);
        })
        .catch((err) => console.error("Error loading likes state:", err));
    } else {
      const localCounts: Record<string, number> = {};
      loadedStories.forEach((s) => {
        localCounts[s.id] = parseInt(s.likes) || 0;
      });
      setLikesCounts(localCounts);
    }
  }, []);

  const handleLikeToggle = async (storyId: string) => {
    const sessionId = getOrCreateSessionId();
    if (!sessionId) return;

    const isCurrentlyLiked = likedIds.has(storyId);
    const currentCount = likesCounts[storyId] || 0;

    // 1. Optimistic update
    const newLikedIds = new Set(likedIds);
    if (isCurrentlyLiked) {
      newLikedIds.delete(storyId);
    } else {
      newLikedIds.add(storyId);
    }
    setLikedIds(newLikedIds);

    const newCount = isCurrentlyLiked ? currentCount - 1 : currentCount + 1;
    setLikesCounts((prev) => ({
      ...prev,
      [storyId]: newCount,
    }));

    // 2. Call server
    try {
      const response = await toggleLikeServerFn({
        data: {
          testimonialId: storyId,
          sessionId,
        },
      });

      setLikesCounts((prev) => ({
        ...prev,
        [storyId]: response.newCount,
      }));
      const verifiedLikedIds = new Set(likedIds);
      if (response.liked) {
        verifiedLikedIds.add(storyId);
      } else {
        verifiedLikedIds.delete(storyId);
      }
      setLikedIds(verifiedLikedIds);
    } catch (err) {
      console.error("Error toggling like:", err);
      // Rollback
      setLikedIds(new Set(likedIds));
      setLikesCounts((prev) => ({
        ...prev,
        [storyId]: currentCount,
      }));
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Instagram":
        return (
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-tr from-yellow-500 to-purple-600 text-white p-1">
            <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </span>
        );
      case "TripAdvisor":
        return (
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#00AF87] text-white p-1">
            <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0zm0 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zm-3.5-8.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z" />
            </svg>
          </span>
        );
      default:
        return (
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#4285F4] text-white p-1 font-bold text-[9px]">
            G
          </span>
        );
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <main className="bg-background min-h-screen text-foreground">
      <SiteNav transparentOnTop />

      <PageHeader
        eyebrow="Diaries"
        title={
          <>
            All Traveler
            <br />
            Stories.
          </>
        }
        subtitle="Unedited, authentic memories from guests who explored domestic and international destinations with Cabo Tours & Travels."
      />

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <div className="flex items-center justify-between mb-10">
          <div className="text-white/60 text-xs uppercase tracking-wider font-semibold">
            Showing {stories.length} verified reviews
          </div>
          <Link
            to="/feedback"
            className="group inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-brand hover:text-white transition"
          >
            Share Your Feedback <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={story.id || story.username}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.05 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[20px] bg-white/[0.03] border border-white/10 hover:border-brand/30 p-5 shadow-2xl backdrop-blur-lg hover:-translate-y-1.5 transition-all duration-500 h-[380px]"
            >
              {/* Top Bar: User details */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand/40 to-brand/10 border border-brand/20 flex items-center justify-center font-display text-xs text-white font-semibold shadow-inner">
                    {getInitials(story.name)}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white/90 leading-none">
                      {story.name}
                    </div>
                    <div className="text-[10px] text-white/50 mt-1">{story.username}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getPlatformIcon(story.platform)}
                  <span className="text-[9px] text-white/40">{story.time}</span>
                </div>
              </div>

              {/* Caption & Image Container */}
              <div className="flex-1 flex flex-col justify-between">
                <p className="text-xs text-white/70 leading-relaxed mb-4 line-clamp-3">{story.caption}</p>
                <div className="relative flex-1 rounded-[14px] overflow-hidden border border-white/5 min-h-[140px]">
                  <ProgressiveImage
                    src={getStoryImage(story.img)}
                    alt={story.destination}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                </div>
              </div>

              {/* Interaction row */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                <div className="flex items-center gap-4 text-[10px] text-white/60">
                  <button
                    onClick={() => handleLikeToggle(story.id)}
                    className={`flex items-center gap-1.5 transition duration-300 ${likedIds.has(story.id)
                      ? "text-brand hover:text-brand"
                      : "hover:text-brand text-white/60"
                      }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors duration-300 ${likedIds.has(story.id)
                        ? "fill-brand text-brand"
                        : "fill-none group-hover:fill-brand/20 group-hover:text-brand"
                        }`}
                    />
                    <span>{likesCounts[story.id] ?? story.likes}</span>
                  </button>
                </div>
                <div className="inline-flex items-center gap-1 text-[9px] tracking-wider uppercase text-brand font-semibold">
                  📍 {story.destination}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFab />
    </main>
  );
}

function ProgressiveImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="absolute inset-0 w-full h-full bg-white/[0.03] overflow-hidden">
      {!loaded && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_infinite]"
          style={{ backgroundSize: "200% 100%" }}
        />
      )}
      <img
        src={getOptimizedImageUrl(src, { width: 320, quality: 75 })}
        alt={alt}
        loading="eager"
        width={320}
        height={180}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
