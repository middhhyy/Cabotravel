import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { PageHeader } from "@/components/site/PageHeader";
import { packages } from "@/lib/packages";
import { destinations } from "@/lib/destinations";
import { waLink, waMessages } from "@/lib/whatsapp";
const dubaiHero = "https://skzdfvoxoymuczcplwhl.supabase.co/storage/v1/object/public/feedback-photos/site-assets/hero-dubai-skyline.webp";
import { trackEvent } from "@/lib/analytics";
import { getOptimizedImageUrl } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "Backwaters",
  "Hill Station",
  "Beach",
  "Heritage",
  "Wildlife",
  "Ayurveda",
  "Honeymoon",
  "Adventure",
  "Culture",
] as const;

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Custom Tour Packages & Trip Itineraries | Cabo Tours" },
      {
        name: "description",
        content:
          "Browse our curated honeymoon, family, group, and luxury tour packages across Kerala, Kashmir, Dubai, Bali, Thailand, and Maldives from Cabo Tours & Travels!",
      },
      { property: "og:title", content: "Custom Tour Packages & Trip Itineraries | Cabo Tours" },
      {
        property: "og:description",
        content:
          "Browse our curated honeymoon, family, group, and luxury tour packages across Kerala, Kashmir, Dubai, Bali, Thailand, and Maldives from Cabo Tours.",
      },
      { property: "og:url", content: "https://cabotourskerala.in/packages" },
      { property: "og:image", content: "https://cabotourskerala.in/social-preview.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Custom Tour Packages & Trip Itineraries | Cabo Tours" },
      {
        name: "twitter:description",
        content:
          "Browse our curated honeymoon, family, group, and luxury tour packages across Kerala, Kashmir, Dubai, Bali, Thailand, and Maldives from Cabo Tours.",
      },
      { name: "twitter:image", content: "https://cabotourskerala.in/social-preview.png" },
    ],
    links: [{ rel: "canonical", href: "https://cabotourskerala.in/packages" }],
  }),
  component: PackagesPage,
});

function PackagesPage() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return packages.filter((p) => {
      const okCat = cat === "All" || p.category === cat;
      const okQ = !s || p.title.toLowerCase().includes(s) || p.destinationSlug.includes(s);
      return okCat && okQ;
    });
  }, [cat, q]);

  return (
    <main className="bg-background">
      <SiteNav transparentOnTop />
      <PageHeader
        eyebrow="Packages"
        title={
          <>
            Holidays you'll
            <br />
            actually love.
          </>
        }
        subtitle="Book customized Kerala holiday tours, international escapes, and family trips. Each package itinerary is tested, priced, and stitched by our team."
        image={dubaiHero}
        width={2000}
        height={1125}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 w-full max-w-2xl">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search destination or package..."
              className="w-full rounded-full border border-white/20 bg-white/[0.04] pl-11 pr-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-brand"
            />
          </div>
          <Link
            to="/generate"
            className="flex w-full md:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand/80 px-7 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-brand/40 active:scale-95"
          >
            <Sparkles className="h-4 w-4" />
            Create Your Own Itinerary
          </Link>
        </div>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${cat === c
                ? "bg-brand text-white"
                : "border border-white/20 text-white/70 hover:text-white"
                }`}
            >
              {c}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="rounded-3xl border border-white/10 p-12 text-center text-white/60">
            No packages match. Try a different filter.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => {
              const dest = destinations.find((d) => d.slug === p.destinationSlug)!;
              return (
                <div
                  key={p.slug}
                  className="group flex flex-col overflow-hidden rounded-[22px] bg-[oklch(0.2_0.01_250)] ring-1 ring-white/10 hover:ring-brand/50 transition"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={getOptimizedImageUrl(p.image || dest.image, { width: 640, quality: 75 })}
                      alt={p.title}
                      loading="eager"
                      width={640}
                      height={224}
                      className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-black/55 backdrop-blur px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white">
                      {p.category}
                    </div>
                    <div className="absolute bottom-3 right-3 rounded-full bg-brand px-3 py-1 text-[10px] font-semibold tracking-[0.22em] uppercase text-white">
                      {p.nights}N / {p.days}D
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-white/50">
                      {dest.country}
                    </div>
                    <h3 className="mt-1 font-display text-xl uppercase">{p.title}</h3>
                    <ul className="mt-4 space-y-1.5 text-[12px] text-white/70">
                      {p.inclusions.slice(0, 4).map((i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-brand" /> {i}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6 flex items-center justify-end">
                      <a
                        href={waLink(waMessages.package(p.title))}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackEvent("package_click", "lead", p.title)}
                        className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
                      >
                        Enquire <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 rounded-[26px] bg-gradient-to-r from-brand/20 to-transparent ring-1 ring-brand/30 p-10 text-center">
          <div className="font-display text-2xl uppercase">Don't see your dream trip?</div>
          <p className="mt-3 text-white/70">
            We build custom itineraries for every budget. Tell us where you want to go.
          </p>
          <a
            href={waLink(waMessages.custom)}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackEvent("whatsapp_click", "engagement", "Custom Trip Customize Button")
            }
            className="mt-6 inline-flex rounded-full bg-brand px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white"
          >
            Customize my trip
          </a>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFab />
    </main>
  );
}
