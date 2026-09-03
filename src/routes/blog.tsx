import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { ArrowRight, Search, Sparkles, Clock, Calendar, BookOpen, Compass, ChevronRight } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { PageHeader } from "@/components/site/PageHeader";
import { BlogPost, BLOG_CATEGORIES, getBlogPosts, blogKeys } from "@/lib/blog";
import { useQuery } from "@tanstack/react-query";
import { waLink, waMessages } from "@/lib/whatsapp";
import { logLead } from "@/lib/logLead";
import { trackEvent } from "@/lib/analytics";

const blogHeroImg = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1920&auto=format&fit=crop";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Travel Blog & Destination Guides | Cabo Tours & Travels" },
      {
        name: "description",
        content:
          "Explore curated travel guides, bespoke itineraries, and expert vacation advice for Kerala, Bali, Kashmir, Dubai, and the Maldives from Cabo Tours & Travels.",
      },
      { property: "og:title", content: "Travel Blog & Destination Guides | Cabo Tours & Travels" },
      {
        property: "og:description",
        content:
          "Explore curated travel guides, bespoke itineraries, and expert vacation advice for Kerala, Bali, Kashmir, Dubai, and the Maldives.",
      },
      { property: "og:url", content: "https://www.cabotourskerala.in/blog" },
      { property: "og:image", content: "https://www.cabotourskerala.in/social-preview.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Travel Blog & Destination Guides | Cabo Tours & Travels" },
      {
        name: "twitter:description",
        content:
          "Explore curated travel guides, bespoke itineraries, and expert vacation advice for Kerala, Bali, Kashmir, Dubai, and the Maldives.",
      },
      { name: "twitter:image", content: "https://www.cabotourskerala.in/social-preview.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.cabotourskerala.in/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { data: posts = [], isLoading: loading } = useQuery({
    queryKey: blogKeys.lists(),
    queryFn: getBlogPosts,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const matchCat = selectedCategory === "All" || post.category === selectedCategory;
      const matchSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteNav transparentOnTop />

      <PageHeader
        eyebrow="Travel Journal"
        title={
          <>
            Stories & Curated
            <br />
            Travel Guides.
          </>
        }
        subtitle="Insider tips, seasonal secrets, and handcrafted destination itineraries from our seasoned travel designers."
        image={blogHeroImg}
        width={1920}
        height={1080}
      />

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-12 lg:py-20 space-y-10">
        {/* Filter and Search Controls */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pb-6 border-b border-white/10">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  trackEvent("filter_blog_category", "engagement");
                }}
                className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-brand text-white shadow-lg shadow-brand/20"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-white/5 border border-white/10 pl-9 pr-4 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
            />
          </div>
        </div>

        {/* Blog Post Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden animate-pulse space-y-4 p-4"
              >
                <div className="h-52 bg-white/5 rounded-xl w-full" />
                <div className="h-4 bg-white/5 rounded w-1/3" />
                <div className="h-6 bg-white/5 rounded w-3/4" />
                <div className="h-4 bg-white/5 rounded w-full" />
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
            <Compass className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <h3 className="text-lg font-display uppercase tracking-widest text-white">No articles found</h3>
            <p className="text-xs text-white/50 mt-1 max-w-sm mx-auto">
              We couldn't find any articles matching your search criteria. Try a different category or search keyword.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-brand uppercase tracking-wider hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const formattedDate = post.published_at
                ? new Date(post.published_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Recent";

              return (
                <article
                  key={post.id}
                  className="group flex flex-col rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden hover:border-brand/40 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/5"
                >
                  {/* Thumbnail */}
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="relative block aspect-[16/10] overflow-hidden bg-black/40"
                  >
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    <span className="absolute top-4 left-4 rounded-full bg-brand/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                      {post.category}
                    </span>
                  </Link>

                  {/* Body Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {/* Meta stats */}
                      <div className="flex items-center gap-3 text-[11px] text-white/50">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-brand" />
                          {formattedDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-brand" />
                          {post.reading_time_minutes || 5} min read
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-lg font-semibold tracking-tight text-white group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                        <Link to="/blog/$slug" params={{ slug: post.slug }}>
                          {post.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      <p className="text-xs leading-relaxed text-white/70 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Author & Read Link */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-white/40 text-[11px]">By {post.author}</span>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="inline-flex items-center gap-1 font-semibold text-brand hover:text-white transition-colors uppercase tracking-wider text-[10px]"
                      >
                        Read Article
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Bottom Bespoke Travel Banner */}
        <div className="relative mt-16 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent p-8 lg:p-12 overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-brand">
              <Sparkles className="w-3.5 h-3.5" /> Plan Your Custom Holiday
            </span>
            <h3 className="text-2xl lg:text-3xl font-display uppercase tracking-widest text-white leading-tight">
              Ready to turn these stories into your next journey?
            </h3>
            <p className="text-xs lg:text-sm text-white/70 leading-relaxed">
              Connect with our dedicated travel planners on WhatsApp. We design personalized itineraries with private cabs, boutique resorts, and 24/7 on-ground assistance.
            </p>
            <div className="pt-2">
              <a
                href={waLink(waMessages.general)}
                target="_blank"
                rel="noreferrer"
                onClick={() => logLead("blog_banner", "/blog")}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-brand/90 transition shadow-lg shadow-brand/20 cursor-pointer"
              >
                Plan On WhatsApp <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFab />
    </main>
  );
}
