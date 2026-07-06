import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowRight, MapPin, Calendar, Clock } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { destinations, getDestination } from "@/lib/destinations";
import { packages } from "@/lib/packages";
import { waLink, waMessages } from "@/lib/whatsapp";
import { BUSINESS_INFO } from "@/lib/business";
import { getOptimizedImageUrl, getSupabaseSrcSet } from "@/lib/utils";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    if (params.slug === "kashmir") {
      throw redirect({
        to: "/cabs",
        replace: true,
      });
    }
    if (params.slug === "dubai" || params.slug === "domestic-packages") {
      throw redirect({
        to: "/domestic-packages",
        replace: true,
      });
    }
    const d = getDestination(params.slug);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Destination"} — Cabo Tours & Travels` },
      {
        name: "description",
        content: loaderData?.description ?? "Curated destination by Cabo Tours & Travels.",
      },
      {
        property: "og:title",
        content: `${loaderData?.name ?? "Destination"} — Cabo Tours & Travels`,
      },
      { property: "og:description", content: loaderData?.tagline ?? "Curated travel packages." },
      {
        property: "og:image",
        content: loaderData?.image ?? "https://cabotours.in/social-preview.png",
      },
      { property: "og:url", content: `https://cabotours.in/destinations/${loaderData?.slug}` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: `${loaderData?.name ?? "Destination"} — Cabo Tours & Travels`,
      },
      {
        name: "twitter:description",
        content: loaderData?.description ?? "Curated travel destination.",
      },
      {
        name: "twitter:image",
        content: loaderData?.image ?? "https://cabotours.in/social-preview.png",
      },
    ],
    links: [{ rel: "canonical", href: `https://cabotours.in/destinations/${loaderData?.slug}` }],
  }),
  notFoundComponent: () => (
    <main className="min-h-screen grid place-items-center bg-background text-white">
      <div className="text-center">
        <div className="font-display text-3xl">Destination not found</div>
        <Link to="/destinations" className="mt-4 inline-block text-brand">
          Back to destinations
        </Link>
      </div>
    </main>
  ),
  component: DestinationDetail,
});

function DestinationDetail() {
  const d = Route.useLoaderData();
  const related = packages.filter((p) => p.destinationSlug === d.slug);
  const more = destinations.filter((x) => x.slug !== d.slug).slice(0, 3);

  const price = parseInt(d.startingFrom.replace(/[^0-9]/g, ""), 10) || 12499;
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${d.name} Tour Package`,
    "description": d.description,
    "image": d.image,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": price,
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "url": `https://cabotours.in/destinations/${d.slug}`,
    },
    "provider": {
      "@type": "TravelAgency",
      "name": BUSINESS_INFO.name,
      "url": "https://cabotours.in",
      "telephone": BUSINESS_INFO.phone,
      "priceRange": "$$",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2500",
    },
  };

  return (
    <main className="bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <SiteNav transparentOnTop />

      {/* Hero */}
      <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
        <img
          src={getOptimizedImageUrl(d.heroImage || d.image, { width: 1280, quality: 75 })}
          srcSet={getSupabaseSrcSet(d.heroImage || d.image) || undefined}
          sizes="100vw"
          alt={d.name}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/40" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 lg:px-10 pb-16">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-brand">
            <span className="h-px w-8 bg-brand" />
            {d.region} · {d.country}
          </div>
          <h1 className="mt-4 font-display uppercase leading-[0.95] text-[clamp(2.8rem,8vw,6.5rem)]">
            {d.name}
          </h1>
          <p className="mt-2 text-lg italic text-white/70">{d.tagline}</p>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-3xl uppercase mb-5">The Experience</h2>
          <p className="text-white/75 leading-relaxed">{d.description}</p>

          <h3 className="font-display text-xl uppercase mt-12 mb-4 text-brand">Highlights</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {d.highlights.map((h: string) => (
              <div
                key={h}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm"
              >
                <MapPin className="h-4 w-4 text-brand" /> {h}
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-28 rounded-[26px] bg-[oklch(0.2_0.01_250)] ring-1 ring-white/10 p-7">
            <div className="text-[10px] tracking-[0.3em] uppercase text-white/45">
              Starting from
            </div>
            <div className="mt-1 font-display text-4xl text-brand">{d.startingFrom}</div>
            <div className="mt-1 text-xs text-white/50">per person · twin sharing</div>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-white/10 p-4">
                <Calendar className="h-4 w-4 text-brand mb-2" />
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/50">
                  Best time
                </div>
                <div className="mt-1">{d.bestTime}</div>
              </div>
              <div className="rounded-2xl border border-white/10 p-4">
                <Clock className="h-4 w-4 text-brand mb-2" />
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/50">
                  Suggested
                </div>
                <div className="mt-1">{d.duration}</div>
              </div>
            </div>

            <a
              href={waLink(waMessages.destination(d.name))}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white"
            >
              Enquire on WhatsApp
            </a>
            <a
              href={waLink(waMessages.custom)}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/30 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white"
            >
              Customize this trip
            </a>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="bg-[oklch(0.16_0.01_250)] border-y border-white/10 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="font-display text-3xl uppercase mb-8">Packages in {d.name}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <div key={p.slug} className="rounded-[22px] bg-background ring-1 ring-white/10 p-6">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/45">
                    {p.category}
                  </div>
                  <div className="mt-1 font-display text-xl uppercase">{p.title}</div>
                  <div className="mt-3 text-[11px] tracking-[0.22em] uppercase text-white/55">
                    {p.nights}N / {p.days}D
                  </div>
                  <div className="mt-5 flex items-end justify-between">
                    <div className="font-display text-2xl text-brand">{p.price}</div>
                    <a
                      href={waLink(waMessages.package(p.title))}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
                    >
                      Enquire
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <h2 className="font-display text-3xl uppercase mb-8">You might also love</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {more.map((m) => (
            <Link
              key={m.slug}
              to="/destinations/$slug"
              params={{ slug: m.slug }}
              className="group relative block h-72 overflow-hidden rounded-[22px] ring-1 ring-white/10"
            >
              <img
                src={getOptimizedImageUrl(m.image, { width: 640, quality: 75 })}
                alt={m.name}
                loading="eager"
                width={640}
                height={288}
                className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/65">
                    {m.country}
                  </div>
                  <div className="font-display text-2xl uppercase">{m.name}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-brand" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFab />
    </main>
  );
}
