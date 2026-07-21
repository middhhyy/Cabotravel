import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { PageHeader } from "@/components/site/PageHeader";
import { waLink, waMessages } from "@/lib/whatsapp";
import { getOptimizedImageUrl } from "@/lib/utils";
import { cld } from "@/lib/cloudinary";

import tamilNadu from "@/assets/dest-tamil-nadu.webp";
import goa from "@/assets/dest-goa.webp";
import karnataka from "@/assets/dest-karnataka.webp";
import hyderabad from "@/assets/dest-hyderabad.webp";
import lakshadweep from "@/assets/dest-lakshadweep.webp";
import andaman from "@/assets/dest-andaman.webp";
import agra from "@/assets/dest-agra.webp";
import delhi from "@/assets/dest-delhi.webp";
import rajasthan from "@/assets/dest-rajasthan.webp";
import himachalPradesh from "@/assets/dest-himachal-pradesh.webp";
import punjab from "@/assets/dest-punjab.webp";
import uttarakhand from "@/assets/dest-uttarakhand.webp";
import kashmir from "@/assets/dest-kashmir.webp";
import meghalaya from "@/assets/dest-meghalaya.webp";
import assam from "@/assets/dest-assam.webp";
import sikkim from "@/assets/dest-sikkim.webp";
import tawang from "@/assets/dest-tawang.webp";
import odisha from "@/assets/dest-odisha.webp";

const domesticHero = "https://skzdfvoxoymuczcplwhl.supabase.co/storage/v1/object/public/feedback-photos/site-assets/hero-alleppey-backwaters.webp";

const DOMESTIC_DESTINATIONS = [
  {
    slug: "kerala",
    name: "Kerala",
    region: "DOMESTIC · INDIA",
    tagline: "God's Own Country",
    image: cld("dest-kerala_ttbnaa", 640),
    to: "/kerala",
  },
  {
    slug: "tamil-nadu",
    name: "Tamil Nadu",
    region: "DOMESTIC · INDIA",
    tagline: "Land of Temples & Culture",
    image: tamilNadu,
  },
  {
    slug: "goa",
    name: "Goa",
    region: "DOMESTIC · INDIA",
    tagline: "Sun, Sand & Scenic Beaches",
    image: goa,
  },
  {
    slug: "karnataka",
    name: "Karnataka",
    region: "DOMESTIC · INDIA",
    tagline: "One State, Many Worlds",
    image: karnataka,
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    region: "DOMESTIC · INDIA",
    tagline: "City of Nizams & Pearls",
    image: hyderabad,
  },
  {
    slug: "lakshadweep",
    name: "Lakshadweep",
    region: "DOMESTIC · INDIA",
    tagline: "Pristine Coral Reefs & Lagoons",
    image: lakshadweep,
  },
  {
    slug: "andaman",
    name: "Andaman",
    region: "DOMESTIC · INDIA",
    tagline: "Emerald Islands & Golden Sands",
    image: andaman,
  },
  {
    slug: "agra",
    name: "Agra",
    region: "DOMESTIC · INDIA",
    tagline: "Home of the Taj Mahal",
    image: agra,
  },
  {
    slug: "delhi",
    name: "Delhi",
    region: "DOMESTIC · INDIA",
    tagline: "Heart of the Nation",
    image: delhi,
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    region: "DOMESTIC · INDIA",
    tagline: "Land of Kings & Palaces",
    image: rajasthan,
  },
  {
    slug: "himachal-pradesh",
    name: "Himachal Pradesh",
    region: "DOMESTIC · INDIA",
    tagline: "Land of Snow & Valleys",
    image: himachalPradesh,
  },
  {
    slug: "punjab",
    name: "Punjab",
    region: "DOMESTIC · INDIA",
    tagline: "Land of Five Rivers & Golden Faith",
    image: punjab,
  },
  {
    slug: "uttarakhand",
    name: "Uttarakhand",
    region: "DOMESTIC · INDIA",
    tagline: "Land of Gods & Himalayas",
    image: uttarakhand,
  },
  {
    slug: "kashmir",
    name: "Kashmir",
    region: "DOMESTIC · INDIA",
    tagline: "Paradise on Earth",
    image: kashmir,
    to: "/cabs",
  },
  {
    slug: "meghalaya",
    name: "Meghalaya",
    region: "DOMESTIC · NORTHEAST",
    tagline: "Abode of Clouds & Living Root Bridges",
    image: meghalaya,
  },
  {
    slug: "assam",
    name: "Assam",
    region: "DOMESTIC · NORTHEAST",
    tagline: "Land of Tea & One-Horned Rhinos",
    image: assam,
  },
  {
    slug: "sikkim",
    name: "Sikkim",
    region: "DOMESTIC · NORTHEAST",
    tagline: "Mystical Valleys & Sacred Lakes",
    image: sikkim,
  },
  {
    slug: "tawang",
    name: "Tawang",
    region: "DOMESTIC · NORTHEAST",
    tagline: "Monasteries & Misty Peaks",
    image: tawang,
  },
  {
    slug: "odisha",
    name: "Odisha",
    region: "DOMESTIC · INDIA",
    tagline: "The Soul of Incredible India",
    image: odisha,
  },
];

export const Route = createFileRoute("/domestic-packages")({
  head: () => ({
    meta: [
      { title: "Domestic Tour Packages & Holidays | Cabo Tours & Travels" },
      {
        name: "description",
        content:
          "Explore the rich diversity of India with Cabo's curated domestic holiday packages. Discover custom tours in Kerala, Kashmir, Rajasthan, Goa & Northeast.",
      },
      { property: "og:title", content: "Domestic Tour Packages & Holidays | Cabo Tours & Travels" },
      {
        property: "og:description",
        content:
          "Explore the rich diversity of India with Cabo's curated domestic holiday packages.",
      },
      { property: "og:url", content: "https://cabotourskerala.in/domestic-packages" },
      { property: "og:image", content: "https://cabotourskerala.in/social-preview.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Domestic Tour Packages & Holidays | Cabo Tours & Travels" },
      {
        name: "twitter:description",
        content:
          "Explore the rich diversity of India with Cabo's curated domestic holiday packages.",
      },
    ],
    links: [{ rel: "canonical", href: "https://cabotourskerala.in/domestic-packages" }],
  }),
  component: DomesticPackagesPage,
});

function DomesticPackagesPage() {
  return (
    <main className="bg-background">
      <SiteNav transparentOnTop />
      <PageHeader
        eyebrow="Domestic Packages"
        title={
          <>
            Explore
            <br />
            Incredible India
          </>
        }
        subtitle="From pristine beaches to mystical valleys, explore hand-picked Indian destinations. Plan Kerala holiday tours and outstation trips with custom transfers, stays, and professional care."
        image={domesticHero}
      />

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DOMESTIC_DESTINATIONS.map((d, i) => (
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
                <Link to={d.to} aria-label={`Explore ${d.name} holiday packages`} className="absolute inset-0 z-10 block">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </Link>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              )}
              <div className="absolute inset-x-0 bottom-0 z-20 p-6">
                <div className="text-[10px] tracking-[0.3em] uppercase text-white/70">
                  {d.to ? (
                    <Link to={d.to} className="hover:text-brand transition duration-300">
                      {d.region}
                    </Link>
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
                      href={waLink(waMessages.destination(d.name))}
                      target="_blank"
                      rel="noreferrer"
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
