import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Calendar, Globe, Share2, Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { supabase } from "@/lib/supabase";
import { packages } from "@/lib/packages";
import { getOptimizedImageUrl } from "@/lib/utils";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/guest-stories/$slug")({
  loader: async ({ params }) => {
    try {
      const { data, error } = await supabase
        .from("guest_stories")
        .select(`
          *,
          guest_story_images (
            id,
            image_url,
            storage_path
          )
        `)
        .eq("slug", params.slug)
        .eq("status", "approved")
        .single();

      if (error || !data) {
        throw notFound();
      }
      return data;
    } catch {
      throw notFound();
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name}'s Travel Story to ${loaderData?.destination} | Cabo Tours` },
      {
        name: "description",
        content: loaderData?.story ? loaderData.story.slice(0, 155) + "..." : "Authentic guest travel stories.",
      },
    ],
  }),
  component: GuestStoryDetail,
});

function GuestStoryDetail() {
  const story = Route.useLoaderData() as any;
  const [copied, setCopied] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = story.guest_story_images || [];

  const handleShare = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    trackEvent("share_story", "engagement");
    setTimeout(() => setCopied(false), 2000);
  };

  // Find related travel packages based on destination keyword matching
  const relatedPackages = packages
    .filter((p) => {
      const storyDest = story.destination.toLowerCase();
      const pkgTitle = p.title.toLowerCase();
      const pkgDest = p.destination?.toLowerCase() || "";
      return pkgTitle.includes(storyDest) || pkgDest.includes(storyDest) || storyDest.includes(pkgDest);
    })
    .slice(0, 3);

  // Fallback packages if no destination matches
  const fallbackPackages = packages.slice(0, 3);
  const displayPackages = relatedPackages.length > 0 ? relatedPackages : fallbackPackages;

  return (
    <main className="bg-background min-h-screen text-foreground pb-24">
      <SiteNav transparentOnTop />

      {/* Header Section */}
      <section className="relative py-20 md:py-24 lg:py-32 bg-[oklch(0.12_0.01_250)] border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[140px] mix-blend-screen" />
        </div>

        <div className="mx-auto max-w-5xl px-6 lg:px-10 relative z-10">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Link
              to="/guest-stories"
              className="text-xs uppercase tracking-wider text-brand hover:text-white transition"
            >
              ← Back to Stories
            </Link>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="text-xs text-white/50 uppercase tracking-wider">
              📍 {story.destination}
            </span>
          </div>

          <h1 className="font-display uppercase text-3xl md:text-5xl lg:text-6xl text-white leading-none mb-8">
            My Journey To <br />
            <span className="text-brand">{story.destination}</span>
          </h1>

          <div className="flex flex-wrap items-center justify-between border-t border-white/10 pt-6 gap-6">
            {/* User Meta */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand/40 to-brand/10 border border-brand/20 flex items-center justify-center font-display text-lg text-white font-semibold shadow-md shrink-0">
                {story.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
              </div>
              <div>
                <div className="text-sm font-semibold text-white/90 leading-tight">
                  {story.name}
                </div>
                <div className="text-xs text-white/50 mt-1 flex items-center gap-1.5">
                  <span>{story.username || `@traveler_${story.name.toLowerCase().replace(/\s+/g, "")}`}</span>
                  {story.country && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {story.country}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Travel Stats */}
            <div className="flex flex-wrap gap-6 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand" />
                <div>
                  <div className="text-white/40 text-[9px] uppercase tracking-wider">Date of Trip</div>
                  <div className="text-white font-semibold">
                    {new Date(story.trip_date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2">
                <div className="flex flex-col">
                  <div className="text-white/40 text-[9px] uppercase tracking-wider">Traveler Rating</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < story.rating ? "text-accent fill-accent" : "text-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Share button */}
              <button
                onClick={handleShare}
                className="bg-white/5 hover:bg-brand/10 border border-white/10 hover:border-brand/40 rounded-xl px-4 flex items-center justify-center gap-2 text-white/80 hover:text-brand transition cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                <span className="font-semibold uppercase tracking-wider text-[10px]">Share Story</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Gallery */}
      <section className="mx-auto max-w-5xl px-6 lg:px-10 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Story Column */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-display uppercase tracking-wider text-white border-b border-white/10 pb-3">
              The Journey Diary
            </h2>
            <div className="text-sm leading-relaxed text-white/80 space-y-4 whitespace-pre-wrap font-sans font-light">
              {story.story}
            </div>
            
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 mt-8 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand/20 text-brand text-xs">✓</span>
              <span className="text-xs text-white/60 font-medium">Verified Traveler Review</span>
            </div>
          </div>

          {/* Gallery Column */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xl font-display uppercase tracking-wider text-white border-b border-white/10 pb-3">
              Trip Gallery
            </h2>

            {images.length === 0 ? (
              <div className="aspect-[4/3] bg-white/[0.02] border border-white/10 rounded-2xl flex items-center justify-center text-xs text-white/40">
                No photos uploaded for this story.
              </div>
            ) : (
              <div className="space-y-4">
                {/* Main Active Image */}
                <div className="relative aspect-[4/3] w-full bg-black/40 rounded-2xl overflow-hidden border border-white/10 group">
                  <img
                    src={getOptimizedImageUrl(images[activeImageIndex]?.image_url, {
                      width: 600,
                      quality: 80,
                    })}
                    alt={`Trip photo ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  
                  {/* Gallery Arrows if more than 1 image */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/75 hover:bg-black text-white rounded-full border border-white/15 cursor-pointer hover:scale-105 transition"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/75 hover:bg-black text-white rounded-full border border-white/15 cursor-pointer hover:scale-105 transition"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails row */}
                {images.length > 1 && (
                  <div className="flex flex-wrap gap-2">
                    {images.map((img: any, idx: number) => (
                      <button
                        key={img.id}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-16 h-16 rounded-xl overflow-hidden border transition cursor-pointer ${
                          activeImageIndex === idx
                            ? "border-brand scale-95"
                            : "border-white/10 hover:border-white/30"
                        }`}
                      >
                        <img
                          src={getOptimizedImageUrl(img.image_url, { width: 120, quality: 70 })}
                          alt="Thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Tour Packages */}
      <section className="mx-auto max-w-5xl px-6 lg:px-10 mt-24 border-t border-white/10 pt-16">
        <h2 className="font-display uppercase text-2xl text-white mb-8">
          Related Tour Packages
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayPackages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-brand/40 transition duration-300 group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-brand text-black text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full">
                  {pkg.duration}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white/95 group-hover:text-brand transition mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-[11px] text-white/50 line-clamp-2 leading-relaxed mb-4">
                    {pkg.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                  <span className="text-xs font-semibold text-brand">
                    {pkg.price ? `₹${pkg.price.toLocaleString("en-IN")}` : "Request Quote"}
                  </span>
                  <Link
                    to="/packages"
                    className="text-[10px] uppercase font-bold tracking-wider text-white hover:text-brand transition"
                  >
                    View Details →
                  </Link>
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
