import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { PageHeader } from "@/components/site/PageHeader";
import { destinations, keralaHero } from "@/lib/destinations";
import { waLink, waMessages } from "@/lib/whatsapp";
import { getOptimizedImageUrl } from "@/lib/utils";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Top Travel Destinations & Places to Visit | Cabo Tours" },
      {
        name: "description",
        content:
          "Explore Kerala, Kashmir, Dubai, Bali, Thailand, and Maldives. Book your dream trip with curated international and domestic tour plans from Cabo Tours & Travels.",
      },
      { property: "og:title", content: "Top Travel Destinations & Places to Visit | Cabo Tours" },
      {
        property: "og:description",
        content:
          "Explore Kerala, Kashmir, Dubai, Bali, Thailand, and Maldives. Book your dream trip with curated international and domestic tour plans from Cabo Tours.",
      },
      { property: "og:url", content: "https://cabotours.in/destinations" },
      { property: "og:image", content: "https://cabotours.in/social-preview.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Top Travel Destinations & Places to Visit | Cabo Tours" },
      {
        name: "twitter:description",
        content:
          "Explore Kerala, Kashmir, Dubai, Bali, Thailand, and Maldives. Book your dream trip with curated international and domestic tour plans from Cabo Tours.",
      },
      { name: "twitter:image", content: "https://cabotours.in/social-preview.png" },
    ],
    links: [{ rel: "canonical", href: "https://cabotours.in/destinations" }],
  }),
  component: DestinationsPage,
});

function DestinationsPage() {
  const [filter, setFilter] = useState<"All" | "Domestic" | "International">("All");
  const list = destinations.filter((d) => filter === "All" || d.region === filter);

  return (
    <main className="bg-background">
      <SiteNav transparentOnTop />
      <PageHeader
        eyebrow="Destinations"
        title={
          <>
            Where in the
            <br />
            world next?
          </>
        }
        subtitle="From Kerala's quiet backwaters to Maldivian atolls — every destination Cabo sells is one we'd send our own family to."
        image={keralaHero}
      />

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <div className="mb-10 flex flex-wrap gap-2">
          {(["All", "Domestic", "International"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${filter === f
                ? "bg-brand text-white"
                : "border border-white/20 text-white/70 hover:text-white"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((d, i) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative h-[440px] overflow-hidden rounded-[26px] ring-1 ring-white/10"
            >
              <img
                src={getOptimizedImageUrl(d.image, { width: 640, quality: 75 })}
                alt={d.name}
                loading="eager"
                width={640}
                height={440}
                className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] group-hover:scale-110"
              />
              {d.href ? (
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 block"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                </a>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              )}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="text-[10px] tracking-[0.3em] uppercase text-white/70">
                  {d.href ? (
                    <a
                      href={d.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand transition duration-300"
                    >
                      {d.region} · {d.country}
                    </a>
                  ) : (
                    <>{d.region} · {d.country}</>
                  )}
                </div>
                <div className="mt-1 font-display text-3xl uppercase">{d.name}</div>
                <p className="mt-3 text-sm text-white/70">{d.tagline}</p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[10px] tracking-[0.22em] uppercase text-white/50">
                  <span>Best: {d.bestTime}</span>
                  <span>{d.duration}</span>
                </div>
                <div className="mt-5 flex items-center justify-end">
                  {d.slug === "kashmir" ? (
                    <Link
                      to="/cabs"
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
                    >
                      Discover <ArrowRight className="h-3 w-3" />
                    </Link>
                  ) : d.slug === "domestic-packages" ? (
                    <Link
                      to="/domestic-packages"
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
                    >
                      Discover <ArrowRight className="h-3 w-3" />
                    </Link>
                  ) : d.slug === "international-packages" ? (
                    <Link
                      to="/international-packages"
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
                    >
                      Discover <ArrowRight className="h-3 w-3" />
                    </Link>
                  ) : (
                    <a
                      href={d.href || waLink(waMessages.destination(d.name))}
                      target="_blank"
                      rel={d.href ? "noopener noreferrer" : "noreferrer"}
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
                    >
                      Discover <ArrowRight className="h-3 w-3" />
                    </a>
                  )}
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
