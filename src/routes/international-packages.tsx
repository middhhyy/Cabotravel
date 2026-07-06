import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { PageHeader } from "@/components/site/PageHeader";
import { waLink, waMessages } from "@/lib/whatsapp";
import { getOptimizedImageUrl } from "@/lib/utils";

import dubai from "@/assets/dest-dubai.webp";
import nepal from "@/assets/dest-nepal.webp";
import bhutan from "@/assets/dest-bhutan.webp";
import sriLanka from "@/assets/dest-sri-lanka.webp";
import destFlightTickets from "@/assets/dest-flight-tickets.webp";
import destVisaTickets from "@/assets/dest-visa-tickets.webp";
import vietnam from "@/assets/dest-vietnam.webp";
import bali from "@/assets/dest-bali.webp";
import malaysia from "@/assets/dest-malaysia.webp";
import singapore from "@/assets/dest-singapore.webp";
import azerbaijan from "@/assets/dest-azerbaijan.webp";
import kazakhstan from "@/assets/dest-kazakhstan.webp";
import philippines from "@/assets/dest-philippines.webp";
import destInternationalPackages from "@/assets/dest-international-packages.webp";

const INTERNATIONAL_DESTINATIONS = [
  {
    slug: "dubai",
    name: "Dubai",
    region: "INTERNATIONAL · UAE",
    tagline: "City of Gold",
    image: dubai,
  },
  {
    slug: "nepal",
    name: "Nepal",
    region: "INTERNATIONAL · NEPAL",
    tagline: "Roof of the World",
    image: nepal,
  },
  {
    slug: "bhutan",
    name: "Bhutan",
    region: "INTERNATIONAL · BHUTAN",
    tagline: "Land of Thunder Dragon",
    image: bhutan,
  },
  {
    slug: "sri-lanka",
    name: "Sri Lanka",
    region: "INTERNATIONAL · SRI LANKA",
    tagline: "Pearl of the Indian Ocean",
    image: sriLanka,
  },
  {
    slug: "flight-tickets",
    name: "Flight Tickets",
    region: "BOOK NOW · FLIGHTS",
    tagline: "Best Fares, Anywhere",
    image: destFlightTickets,
    href: "https://wa.me/917736406630?text=Hi%2C%20I%27m%20interested%20in%20booking%20flight%20tickets",
  },
  {
    slug: "visa-tickets",
    name: "Visa & Tickets",
    region: "ASSISTANCE · VISA & TICKETS",
    tagline: "Hassle-Free Documentation",
    image: destVisaTickets,
    href: "https://wa.me/917736406630?text=Hi%2C%20I%27m%20interested%20in%20visa%20and%20ticket%20assistance",
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    region: "INTERNATIONAL · VIETNAM",
    tagline: "Timeless Land & Legends",
    image: vietnam,
  },
  {
    slug: "bali",
    name: "Bali",
    region: "INTERNATIONAL · INDONESIA",
    tagline: "Island of the Gods",
    image: bali,
    to: "/destinations/bali",
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    region: "INTERNATIONAL · MALAYSIA",
    tagline: "Where Cultures Converge",
    image: malaysia,
  },
  {
    slug: "singapore",
    name: "Singapore",
    region: "INTERNATIONAL · SINGAPORE",
    tagline: "The Lion City",
    image: singapore,
  },
  {
    slug: "azerbaijan",
    name: "Azerbaijan",
    region: "INTERNATIONAL · AZERBAIJAN",
    tagline: "Land of Fire",
    image: azerbaijan,
  },
  {
    slug: "kazakhstan",
    name: "Kazakhstan",
    region: "INTERNATIONAL · KAZAKHSTAN",
    tagline: "Heart of the Steppe",
    image: kazakhstan,
  },
  {
    slug: "philippines",
    name: "Philippines",
    region: "INTERNATIONAL · PHILIPPINES",
    tagline: "7,000 Islands of Wonder",
    image: philippines,
  },
];

export const Route = createFileRoute("/international-packages")({
  head: () => ({
    meta: [
      { title: "International Tour Packages & Holidays | Cabo Tours" },
      {
        name: "description",
        content:
          "Craft your dream holiday with Cabo's curated international tour packages. Explore custom travel packages to Bali, Dubai, Thailand, Maldives and beyond.",
      },
      { property: "og:title", content: "International Tour Packages & Holidays | Cabo Tours" },
      {
        property: "og:description",
        content:
          "Craft your dream holiday with Cabo's curated international tour packages. Explore custom travel packages to Bali, Dubai, Thailand, Maldives and beyond.",
      },
      { property: "og:url", content: "https://cabotours.in/international-packages" },
      { property: "og:image", content: "https://cabotours.in/social-preview.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "International Tour Packages & Holidays | Cabo Tours" },
      {
        name: "twitter:description",
        content:
          "Craft your dream holiday with Cabo's curated international tour packages. Explore custom travel packages to Bali, Dubai, Thailand, Maldives and beyond.",
      },
    ],
    links: [{ rel: "canonical", href: "https://cabotours.in/international-packages" }],
  }),
  component: InternationalPackagesPage,
});

function InternationalPackagesPage() {
  return (
    <main className="bg-background">
      <SiteNav transparentOnTop />
      <PageHeader
        eyebrow="International Packages"
        title={
          <>
            Explore
            <br />
            The World
          </>
        }
        subtitle="From overwater atolls to mystical mountain kingdoms, book your international travel packages from Kerala with hand-picked hotels, flights, and professional ground care."
        image={destInternationalPackages}
      />

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {INTERNATIONAL_DESTINATIONS.map((d, i) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-[420px] overflow-hidden rounded-[26px] ring-1 ring-white/10"
            >
              <img
                src={getOptimizedImageUrl(d.image, { width: 640, quality: 75 })}
                alt={d.name}
                loading="eager"
                width={640}
                height={420}
                className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] group-hover:scale-110"
              />
              {d.to ? (
                <Link to={d.to} className="absolute inset-0 z-10 block">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </Link>
              ) : d.href ? (
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 block"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </a>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              )}
              <div className="absolute inset-x-0 bottom-0 z-20 p-6">
                <div className="text-[10px] tracking-[0.3em] uppercase text-white/70">
                  {d.to ? (
                    <Link to={d.to} className="hover:text-brand transition duration-300">
                      {d.region}
                    </Link>
                  ) : d.href ? (
                    <a
                      href={d.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand transition duration-300"
                    >
                      {d.region}
                    </a>
                  ) : (
                    <>{d.region}</>
                  )}
                </div>
                <h3 className="mt-1 font-display text-2xl uppercase text-white">{d.name}</h3>
                <p className="mt-3 text-sm text-white/70 line-clamp-2">{d.tagline}</p>
                <div className="mt-6 flex items-center justify-end">
                  {d.to ? (
                    <Link
                      to={d.to}
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
                    >
                      Explore <ArrowRight className="h-3 w-3" />
                    </Link>
                  ) : (
                    <a
                      href={d.href || waLink(waMessages.destination(d.name))}
                      target="_blank"
                      rel={d.href ? "noopener noreferrer" : "noreferrer"}
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
                    >
                      Explore <ArrowRight className="h-3 w-3" />
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
