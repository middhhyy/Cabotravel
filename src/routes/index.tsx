import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Bookmark,
  ArrowRight,
  Plane,
  Hotel,
  Ship,
  Bus,
  Train,
  Car,
  FileCheck,
  Heart,
  Users,
  Star,
  Quote,
} from "lucide-react";
import kerala from "@/assets/dest-kerala.jpg";
import kashmir from "@/assets/dest-kashmir.jpg";
import dubai from "@/assets/dest-dubai.jpg";
import bali from "@/assets/dest-bali.jpg";
import maldives from "@/assets/dest-maldives.jpg";
import thailand from "@/assets/dest-thailand.jpg";
import logoFooter from "@/assets/cabo-logo-footer.webp";
import { destinations } from "@/lib/destinations";
import backwatersImg from "@/assets/hero-alleppey-backwaters.png";
import munnarImg from "@/assets/hero-munnar-tea-gardens.png";
import kovalamImg from "@/assets/hero-kovalam-beach.png";
import fortKochiImg from "@/assets/hero-fort-kochi.png";
import wayanadImg from "@/assets/hero-wayanad.png";
import thekkadyImg from "@/assets/hero-thekkady.png";
import vagamonImg from "@/assets/hero-vagamon.png";
import varkalaImg from "@/assets/hero-varkala.png";
import { packages } from "@/lib/packages";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { waLink, waMessages } from "@/lib/whatsapp";
import { WelcomeScreen } from "@/components/site/WelcomeScreen";
import { useWelcome } from "@/components/site/WelcomeProvider";
import { getStories, getStoryImage, GuestStory } from "@/utils/stories";
import { trackEvent } from "@/lib/analytics";
import { getLikesStateServerFn, toggleLikeServerFn } from "@/services/testimonials/functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cabo Tours & Travels — Curated Journeys, Crafted For You" },
      {
        name: "description",
        content:
          "Premium tour packages and curated travel itineraries across Kerala, Dubai, Bali, and the Maldives. Personalized visa help, flights, hotels & bespoke trips.",
      },
      { property: "og:title", content: "Cabo Tours & Travels — Curated Journeys, Crafted For You" },
      {
        property: "og:description",
        content:
          "Premium tour packages and curated travel itineraries across Kerala, Dubai, Bali, and the Maldives. Personalized visa help, flights, hotels & bespoke trips.",
      },
      { property: "og:image", content: "https://cabotours.in/social-preview.png" },
      { property: "og:url", content: "https://cabotours.in/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Cabo Tours & Travels — Curated Journeys, Crafted For You",
      },
      {
        name: "twitter:description",
        content:
          "Premium tour packages and curated travel itineraries across Kerala, Dubai, Bali, and the Maldives.",
      },
      { name: "twitter:image", content: "https://cabotours.in/social-preview.png" },
    ],
    links: [
      { rel: "canonical", href: "https://cabotours.in/" },
      { rel: "preload", as: "image", href: backwatersImg },
      { rel: "preload", as: "image", href: munnarImg },
      { rel: "preload", as: "image", href: kovalamImg },
      { rel: "preload", as: "image", href: fortKochiImg },
      { rel: "preload", as: "image", href: wayanadImg },
      { rel: "preload", as: "image", href: thekkadyImg },
      { rel: "preload", as: "image", href: vagamonImg },
      { rel: "preload", as: "image", href: varkalaImg },
    ],
  }),
  component: Home,
});

type Slide = { label: string; title: string; image: string; copy: string; thumbnail?: string };

const slides: Slide[] = [
  {
    label: "Kerala — India",
    title: "BACKWATERS\nOF ALLEPPEY",
    image: backwatersImg,
    copy: "Cruise through Kerala's iconic backwaters aboard a luxury houseboat surrounded by coconut lagoons and golden sunsets.",
    thumbnail: "Alleppey Backwaters",
  },
  {
    label: "Kerala — India",
    title: "MISTY\nMUNNAR",
    image: munnarImg,
    copy: "Rolling tea plantations, mountain roads and cool mist create Kerala's most scenic hill station escape.",
    thumbnail: "Munnar Tea Gardens",
  },
  {
    label: "Kerala — India",
    title: "KOVALAM\nBEACH",
    image: kovalamImg,
    copy: "Golden beaches, palm-lined coastline and spectacular Arabian Sea sunsets.",
    thumbnail: "Kovalam Beach",
  },
  {
    label: "Kerala — India",
    title: "FORT KOCHI\nHERITAGE",
    image: fortKochiImg,
    copy: "Explore colonial streets, Chinese fishing nets, art cafés and Kerala's historic port city.",
    thumbnail: "Fort Kochi",
  },
  {
    label: "Kerala — India",
    title: "WAYANAD\nESCAPE",
    image: wayanadImg,
    copy: "Luxury resorts hidden among waterfalls, forests and mist-covered mountains.",
    thumbnail: "Wayanad",
  },
  {
    label: "Kerala — India",
    title: "THEKKADY\nWILDLIFE",
    image: thekkadyImg,
    copy: "Experience Periyar National Park with elephant safaris, boating and rainforest adventures.",
    thumbnail: "Thekkady",
  },
  {
    label: "Kerala — India",
    title: "VAGAMON\nMEADOWS",
    image: vagamonImg,
    copy: "Rolling green meadows, mist-covered valleys and pine forests make Vagamon a pristine hill station getaway.",
    thumbnail: "Vagamon Meadows",
  },
  {
    label: "Kerala — India",
    title: "VARKALA\nCLIFFS",
    image: varkalaImg,
    copy: "Dramatic red cliffs overlooking the Arabian Sea, quiet beaches and spectacular sunset views.",
    thumbnail: "Varkala Cliffs",
  },
];

function Home() {
  const { welcomeDone, setWelcomeDone } = useWelcome();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <WelcomeScreen show={!welcomeDone} onComplete={() => setWelcomeDone(true)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="bg-background text-foreground">
        <Hero welcomeDone={welcomeDone} />
        <ServicesStrip />
        <FeaturedDestinations />
        <PopularPackages />
        <WhyChoose />
        <Experiences />
        <Testimonials />
        <Stats />
        <BookingCta />
        <FAQSection />
        <SiteFooter />
        <WhatsAppFab />
      </main>
    </>
  );
}

/* ====================== HERO (preserved) ====================== */
function Hero({ welcomeDone }: { welcomeDone: boolean }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);

  const upcoming = Array.from({ length: 4 }, (_, k) => slides[(index + 1 + k) % slides.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="sync">
        {welcomeDone && (
          <motion.div
            key={slide.image}
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 will-change-[opacity]"
          >
            <img
              src={slide.image}
              alt={slide.label}
              className="h-full w-full object-cover"
              width={1920}
              height={1280}
              loading="eager"
              // @ts-ignore
              fetchpriority="high"
              decoding="sync"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/5" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-0 left-0 right-0 z-30 h-[3px] bg-white/10">
        {welcomeDone && (
          <motion.div
            key={index}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6.5, ease: "linear" }}
            className="h-full bg-accent"
          />
        )}
      </div>

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={welcomeDone ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-10 lg:px-14 pt-6"
      >
        <div className="flex-1 flex justify-start">
          <Link
            to="/"
            className="flex items-center gap-3 text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <img
              src={logoFooter}
              alt="Cabo Tours"
              className="h-16 w-auto object-contain select-none filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
            />
            <span className="font-display tracking-[0.18em] text-[13px]">CABO TOURS</span>
          </Link>
        </div>
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-9 text-[11px] tracking-[0.22em] text-white/85"
          aria-label="Hero navigation"
        >
          {[
            { to: "/", label: "HOME", active: true },
            { to: "/packages", label: "HOLIDAYS" },
            { to: "/destinations", label: "DESTINATIONS" },
            { to: "/packages", label: "FLIGHTS" },
            { to: "/visa", label: "VISA" },
            { to: "/contact", label: "CONTACT" },
          ].map((i, k) => (
            <Link
              key={k}
              to={i.to}
              className="relative py-1 transition hover:text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {i.label}
              {i.active && (
                <span className="absolute -bottom-0 left-0 right-0 mx-auto h-[2px] w-5 bg-accent" />
              )}
            </Link>
          ))}
        </nav>
        <div className="flex-1 flex justify-end items-center gap-5 text-white/85">
          <div className="hidden md:flex items-center">
            <Search className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <Link
            to="/contact"
            className="md:hidden text-[10px] tracking-[0.22em] text-white/90 uppercase border border-white/40 rounded-full px-3 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Menu
          </Link>
        </div>
      </motion.header>

      <div className="relative z-10 grid h-full grid-cols-1 lg:grid-cols-12 items-end lg:items-center px-6 md:px-10 lg:px-14 pb-36 lg:pb-0 pt-28">
        <div className="lg:col-span-6 max-w-xl">
          <AnimatePresence mode="wait">
            {welcomeDone && (
              <motion.div
                key={slide.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-px w-8 bg-white/70" />
                  <span className="text-[12px] tracking-[0.28em] uppercase text-white/85">
                    {slide.label}
                  </span>
                </div>
                <h1 className="font-display text-white leading-[0.95] text-[clamp(2.4rem,6.4vw,5.8rem)] uppercase whitespace-pre-line">
                  {slide.title}
                </h1>
                <p className="mt-6 max-w-md text-[13px] leading-relaxed text-white/75">
                  {slide.copy}
                </p>
                <div className="mt-9 flex items-center gap-4">
                  <button
                    aria-label={`Save destination ${slide.label}`}
                    className="grid h-11 w-11 place-items-center rounded-full bg-accent text-accent-foreground shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  >
                    <Bookmark className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  </button>
                  <a
                    href={waLink(waMessages.destination(slide.label))}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent("discover_location", "engagement", slide.label)}
                    className="group relative rounded-full border border-white/55 px-7 py-3 text-[11px] tracking-[0.3em] uppercase text-white transition hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  >
                    Discover Location
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-6 mt-12 lg:mt-0">
          <div className="flex gap-4 lg:gap-6 justify-end overflow-hidden">
            <AnimatePresence initial={false} mode="popLayout">
              {welcomeDone &&
                upcoming.map((s, i) => (
                  <motion.button
                    layout
                    key={s.image}
                    onClick={() => setIndex((index + 1 + i) % slides.length)}
                    initial={{ x: 120, opacity: 0, scale: 0.9 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: -160, opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                    className="relative h-[220px] w-[135px] sm:h-[300px] sm:w-[185px] lg:h-[340px] lg:w-[210px] shrink-0 overflow-hidden rounded-[22px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/15 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                    aria-label={`Switch to slide showing ${s.label}`}
                  >
                    <img
                      src={s.image}
                      alt={s.label}
                      className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                      <div className="text-[9px] tracking-[0.22em] uppercase text-white/75">
                        {s.label}
                      </div>
                      <div className="mt-1 font-display text-white text-[15px] leading-[1.05] uppercase whitespace-pre-line">
                        {s.thumbnail || s.title}
                      </div>
                    </div>
                  </motion.button>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={welcomeDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="absolute bottom-8 left-0 right-0 z-20 px-6 md:px-10 lg:px-14"
      >
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/45 text-white transition hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next slide"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/45 text-white transition hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <div className="relative ml-2 md:ml-4 flex-1 max-w-[40%]">
            <div className="h-px w-full bg-white/25" />
            <motion.div
              key={`bar-${index}`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 6.5, ease: "linear" }}
              className="absolute top-0 left-0 h-px bg-accent"
            />
          </div>
          <div className="ml-auto flex items-center gap-3 font-display text-white">
            <span className="text-[11px] tracking-[0.3em] text-white/60">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-6 bg-white/30" />
            <span className="text-[11px] tracking-[0.3em] text-white/60">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ====================== SECTIONS ====================== */
function SectionHead({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="mb-12 max-w-3xl">
      <div className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-brand">
        <span className="h-px w-8 bg-brand" />
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display uppercase leading-[0.95] text-[clamp(2rem,4.6vw,3.6rem)]">
        {title}
      </h2>
      {copy && <p className="mt-5 text-white/65 leading-relaxed max-w-xl">{copy}</p>}
    </div>
  );
}

function ServicesStrip() {
  const items = [
    { i: Plane, t: "Flights" },
    { i: Hotel, t: "Hotels" },
    { i: Ship, t: "Cruises" },
    { i: Bus, t: "Bus" },
    { i: Train, t: "Trains" },
    { i: Car, t: "Taxi" },
    { i: FileCheck, t: "Visa" },
    { i: Heart, t: "Honeymoon" },
    { i: Users, t: "Group" },
  ];
  return (
    <section className="border-y border-white/10 bg-[oklch(0.16_0.01_250)] py-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-white/70">
          {items.map(({ i: I, t }) => (
            <div
              key={t}
              className="flex items-center gap-2.5 text-[12px] tracking-[0.18em] uppercase"
            >
              <I className="h-4 w-4 text-brand" strokeWidth={1.6} />
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedDestinations() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead
          eyebrow="Destinations"
          title={"Where shall we\ntake you next?"}
          copy="Hand-picked across India and the world — every itinerary stitched with stays, transfers and the small things that make a journey feel like yours."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-[420px] overflow-hidden rounded-[26px] ring-1 ring-white/10"
            >
              <img
                src={d.image}
                alt={d.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="text-[10px] tracking-[0.3em] uppercase text-white/70">
                  {d.region} · {d.country}
                </div>
                <div className="mt-1 font-display text-3xl uppercase leading-none text-white">
                  {d.name}
                </div>
                <p className="mt-3 text-sm text-white/70 line-clamp-2">{d.tagline}</p>
                <div className="mt-5 flex items-center justify-end">
                  <a
                    href={waLink(waMessages.destination(d.name))}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
                  >
                    Explore <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularPackages() {
  return (
    <section className="relative py-24 lg:py-32 bg-[oklch(0.16_0.01_250)] border-y border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <SectionHead eyebrow="Packages" title={"Most-loved\nholiday plans"} />
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-white/70 hover:text-brand"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.slice(0, 6).map((p) => {
            const dest = destinations.find((d) => d.slug === p.destinationSlug)!;
            return (
              <div
                key={p.slug}
                className="group flex flex-col overflow-hidden rounded-[22px] bg-[oklch(0.2_0.01_250)] ring-1 ring-white/10 hover:ring-brand/50 transition"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.image || dest.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-black/55 backdrop-blur px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white">
                    {p.category}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/50">
                    {dest.country}
                  </div>
                  <h3 className="mt-1 font-display text-xl uppercase">{p.title}</h3>
                  <div className="mt-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-white/60">
                    <span>
                      {p.nights}N / {p.days}D
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/30" />
                    <span>{p.inclusions.length}+ inclusions</span>
                  </div>
                  <div className="mt-5 flex items-center justify-end">
                    <a
                      href={waLink(waMessages.package(p.title))}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-brand px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
                    >
                      Enquire
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  const items = [
    {
      t: "Personally Crafted",
      d: "Every itinerary is hand-built by our travel designers — not pulled from a catalog.",
    },
    {
      t: "On-Ground Partners",
      d: "Trusted hotel, transfer and experience partners in every destination we sell.",
    },
    {
      t: "24/7 Concierge",
      d: "Real humans on WhatsApp through your trip — before, during and after.",
    },
    {
      t: "Honest Pricing",
      d: "No hidden fees, no inflated 'discounts'. What you see is what you pay.",
    },
    {
      t: "Visa & Documentation",
      d: "End-to-end visa assistance for popular destinations included with most tours.",
    },
    {
      t: "Flexible Changes",
      d: "Plans shift. We re-route, re-book and re-stitch your journey without drama.",
    },
  ];
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead eyebrow="Why Cabo" title={"Travel like\nyou meant it."} />
        <div className="grid gap-px bg-white/10 rounded-[24px] overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.t} className="bg-background p-8 lg:p-10">
              <div className="font-display text-brand text-2xl uppercase">{it.t}</div>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
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
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

function Experiences() {
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
    setStories(loadedStories);

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

      // Update state with actual count returned from server
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
    <section className="relative py-24 lg:py-32 bg-[oklch(0.16_0.01_250)] border-y border-white/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[160px] mix-blend-screen opacity-60" />
        <div className="absolute -inset-0 opacity-[0.015] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Heading & Ratings */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col items-start">
            <div className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-brand">
              <span className="h-px w-8 bg-brand"></span>Guest Stories
            </div>
            <h2 className="mt-4 font-display uppercase leading-[0.95] text-[clamp(2rem,4.6vw,3.6rem)] text-white">
              Loved by travelers,
              <br />
              shared from the heart.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/65 max-w-md">
              Real journeys. Genuine memories. See how travelers experienced unforgettable moments
              through our curated trips.
            </p>

            {/* Rating Badge */}
            <div className="mt-8 flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-accent font-bold text-lg">
                  <span className="text-xl">⭐</span> 4.9/5
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-white/50 mt-1">
                  Average Rating
                </div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex flex-col">
                <div className="text-white font-semibold text-sm">2,500+</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-white/50 mt-1">
                  Verified Travelers
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#testimonials"
              className="mt-8 group inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-white/70 hover:text-brand transition"
            >
              View All Stories{" "}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* Right Column: Masonry of social-style travel posts */}
          <div className="lg:col-span-8">
            {/* Desktop Masonry Grid */}
            <div className="hidden md:grid md:grid-cols-2 gap-6">
              {stories.map((story, i) => (
                <motion.div
                  key={story.id || story.username}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.21, 1.02, 0.43, 1.01] }}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-[20px] bg-white/[0.03] border border-white/10 hover:border-brand/30 p-5 shadow-2xl backdrop-blur-lg hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(180,140,80,0.15)] transition-all duration-500 ${story.height || "h-[350px]"}`}
                  style={{
                    animation: `float ${6 + i}s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.5}s`,
                  }}
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
                    <p className="text-xs text-white/70 leading-relaxed mb-4">{story.caption}</p>
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
                        className={`flex items-center gap-1.5 transition duration-300 ${
                          likedIds.has(story.id)
                            ? "text-brand hover:text-brand"
                            : "hover:text-brand text-white/60"
                        }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-colors duration-300 ${
                            likedIds.has(story.id)
                              ? "fill-brand text-brand"
                              : "fill-none group-hover:fill-brand/20 group-hover:text-brand"
                          }`}
                        />
                        <span>{likesCounts[story.id] ?? story.likes}</span>
                      </button>
                      <span className="flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5 fill-none stroke-current"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span>{story.comments}</span>
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1 text-[9px] tracking-wider uppercase text-brand font-semibold">
                      📍 {story.destination}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Horizontal Carousel */}
            <div className="md:hidden flex gap-4 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory -mx-6 px-6">
              {stories.map((story, i) => (
                <div
                  key={`mobile-${story.id || story.username}`}
                  className="snap-center shrink-0 w-[85vw] max-w-[320px] relative flex flex-col justify-between overflow-hidden rounded-[20px] bg-white/[0.03] border border-white/10 p-5 shadow-2xl backdrop-blur-lg h-[400px]"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand/40 to-brand/10 border border-brand/20 flex items-center justify-center font-display text-xs text-white font-semibold">
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
                    <p className="text-xs text-white/70 leading-relaxed mb-4">{story.caption}</p>
                    <div className="relative flex-1 rounded-[14px] overflow-hidden border border-white/5 min-h-[140px]">
                      <ProgressiveImage
                        src={getStoryImage(story.img)}
                        alt={story.destination}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                    </div>
                  </div>

                  {/* Interaction row */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-4 text-[10px] text-white/60">
                      <button
                        onClick={() => handleLikeToggle(story.id)}
                        className={`flex items-center gap-1.5 transition duration-300 ${
                          likedIds.has(story.id)
                            ? "text-brand hover:text-brand"
                            : "hover:text-brand text-white/60"
                        }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-colors duration-300 ${
                            likedIds.has(story.id)
                              ? "fill-brand text-brand"
                              : "fill-none group-hover:fill-brand/20 group-hover:text-brand"
                          }`}
                        />
                        <span>{likesCounts[story.id] ?? story.likes}</span>
                      </button>
                      <span className="flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5 fill-none stroke-current"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span>{story.comments}</span>
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-1 text-[9px] tracking-wider uppercase text-brand font-semibold">
                      📍 {story.destination}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Floating and Shimmer animation definitions */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    {
      n: "Aishwarya & Rohit",
      r: "Our Maldives honeymoon was choreographed beautifully — from seaplane transfer to the candlelit dinner on the sandbank. Cabo handled every detail.",
      loc: "Bangalore",
    },
    {
      n: "The Menon Family",
      r: "Six of us, three generations, one Kerala houseboat — and not a single hiccup. The team was on WhatsApp every single day.",
      loc: "Dubai",
    },
    {
      n: "Sara K.",
      r: "I'd never travelled internationally alone. Cabo did my visa, my Bali itinerary and stayed in touch the entire week. Felt safe the whole time.",
      loc: "Kochi",
    },
  ];
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead eyebrow="Guests" title={"They came back\nwith stories."} />
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={r.n}
              className="rounded-[22px] bg-[oklch(0.2_0.01_250)] p-8 ring-1 ring-white/10 relative"
            >
              <Quote className="h-7 w-7 text-brand mb-4" />
              <p className="text-[15px] leading-relaxed text-white/85">"{r.r}"</p>
              <div className="mt-6 flex items-center gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <div className="mt-3 font-display uppercase text-sm">{r.n}</div>
              <div className="text-[10px] tracking-[0.22em] uppercase text-white/40">{r.loc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { n: "20+", t: "Destinations" },
    { n: "12k", t: "Happy Travellers" },
    { n: "150+", t: "Curated Packages" },
    { n: "8 yrs", t: "Crafting Journeys" },
  ];
  return (
    <section className="border-y border-white/10 bg-[oklch(0.14_0.01_250)] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.t} className="text-center">
            <div className="font-display text-[clamp(2.4rem,5vw,4rem)] text-brand leading-none">
              {s.n}
            </div>
            <div className="mt-3 text-[11px] tracking-[0.3em] uppercase text-white/55">{s.t}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BookingCta() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-36">
      <img
        src={maldives}
        alt="Maldives overwater villas beach view background"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
      <div className="relative mx-auto max-w-5xl px-6 lg:px-10 text-center">
        <div className="text-[11px] tracking-[0.3em] uppercase text-brand">Ready when you are</div>
        <h2 className="mt-4 font-display uppercase leading-[0.95] text-[clamp(2.4rem,6vw,5rem)]">
          Plan a trip that
          <br />
          actually feels like yours.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-white/75">
          Tell us where you're dreaming of — we'll come back with a quote, an itinerary, and a real
          human on WhatsApp.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href={waLink(waMessages.custom)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-brand px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white"
          >
            Plan my trip on WhatsApp
          </a>
          <Link
            to="/packages"
            className="inline-flex items-center gap-3 rounded-full border border-white/55 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black transition"
          >
            Browse packages
          </Link>
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    q: "Do you offer customized tour packages?",
    a: "Yes. Every itinerary can be customized based on your destination, budget, travel duration, and preferences.",
  },
  {
    q: "Do you provide visa assistance?",
    a: "Yes. We assist with tourist visa documentation and application support for multiple international destinations.",
  },
  {
    q: "Can I book flights separately?",
    a: "Yes. Flight-only bookings are available depending on your travel requirements.",
  },
  {
    q: "Do you arrange honeymoon packages?",
    a: "Yes. We create luxury honeymoon experiences with personalized resorts, transfers, sightseeing, and romantic experiences.",
  },
  {
    q: "Which destinations are most popular?",
    a: "Dubai, Maldives, Bali, Kerala, Singapore, Thailand, and Europe are among our most booked destinations.",
  },
  {
    q: "How can I contact Cabo Tours?",
    a: "You can reach us via WhatsApp, phone, email, or by using the contact form available on the website.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="relative py-24 bg-background border-t border-white/5">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[11px] tracking-[0.3em] uppercase text-brand">FAQ</span>
          <h2 className="mt-3 font-display uppercase leading-[1.1] text-[clamp(2rem,5vw,3.2rem)] text-white">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-[20px] bg-[oklch(0.2_0.01_250)]/50 backdrop-blur ring-1 ring-white/10 transition duration-300 hover:ring-brand/40"
              >
                <button
                  onClick={() => toggle(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggle(idx);
                    }
                  }}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                >
                  <span className="font-display uppercase tracking-[0.05em] text-sm sm:text-base">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="shrink-0 text-brand"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`faq-question-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 pb-6 text-sm sm:text-[14px] leading-relaxed text-white/70 border-t border-white/5 pt-4">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
