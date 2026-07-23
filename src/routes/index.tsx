import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useState, useCallback, useRef } from "react";
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
  X,
} from "lucide-react";
import kerala from "@/assets/dest-kerala.webp";
import kashmir from "@/assets/dest-kashmir.webp";
import dubai from "@/assets/dest-dubai.webp";
import bali from "@/assets/dest-bali.webp";
import maldives from "@/assets/dest-maldives.webp";
import logoFooter from "@/assets/cabo-logo-footer.webp";
import logoAsset from "@/assets/cabo-logo.webp";
import { destinations } from "@/lib/destinations";
import { cld } from "@/lib/cloudinary";
import { BUSINESS_INFO } from "@/lib/business";

const backwatersImg = cld("hero-alleppey-backwaters_tsgi4y", 1920);
const munnarImg = cld("hero-munnar-tea-gardens_uggh6o", 1920);
const kovalamImg = cld("hero-kovalam-beach_jutjfg", 1920);
const fortKochiImg = cld("hero-fort-kochi_xwbqhg", 1920);
const wayanadImg = cld("hero-wayanad_e9y5rl", 1920);
const thekkadyImg = cld("hero-thekkady_bbn8z2", 1920);
const vagamonImg = cld("hero-vagamon_l2tshe", 1920);
const varkalaImg = cld("hero-varkala_ve51d6", 1920);
const kashmirImg = cld("hero-kashmir-dallake_nw9llc", 1920);
const dubaiImg = cld("hero-dubai-skyline_i8r8xv", 1920);
const cabsImg = cld("hero-cabs_l8tywc", 1920);
import { packages } from "@/lib/packages";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { waLink, waMessages } from "@/lib/whatsapp";
import { WelcomeScreen } from "@/components/site/WelcomeScreen";
import { useWelcome } from "@/components/site/WelcomeProvider";
import { getStories, getStoryImage, GuestStory } from "@/utils/stories";
import { trackEvent } from "@/lib/analytics";
import { getLikesStateServerFn, toggleLikeServerFn } from "@/services/testimonials/functions";
import { getOptimizedImageUrl, getSupabaseSrcSet } from "@/lib/utils";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

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
      { property: "og:image", content: "https://www.cabotourskerala.in/social-preview.png" },
      { property: "og:url", content: "https://www.cabotourskerala.in/" },
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
      { name: "twitter:image", content: "https://www.cabotourskerala.in/social-preview.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.cabotourskerala.in/" },
      { rel: "preload", href: logoAsset, as: "image", type: "image/webp", fetchPriority: "high" } as any,
      {
        rel: "preload",
        href: backwatersImg,
        as: "image",
        fetchPriority: "high",
      } as any,
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

const heroNavItems = [
  { to: "/", label: "HOME", active: true },
  { to: "/packages", label: "HOLIDAYS" },
  { to: "/destinations", label: "DESTINATIONS" },
  {
    href: "https://wa.me/917736406630?text=Hi%2C%20I%27m%20interested%20in%20booking%20flight%20tickets",
    label: "FLIGHTS",
  },
  { to: "/cabs", label: "CAB SERVICES" },
  { to: "/visa", label: "VISA" },
  { to: "/contact", label: "CONTACT" },
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
const HERO_BG_TRANSITION = { duration: 1.6, ease: [0.22, 1, 0.36, 1] as const };
const PROGRESS_TRANSITION = { duration: 6.5, ease: "linear" as const };
const HEADER_TRANSITION = { duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 };
const TITLE_TRANSITION = { duration: 1, ease: [0.22, 1, 0.36, 1] as const };
const CONTROLS_TRANSITION = { duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.4 };

const thumbnailVariants = {
  initial: { x: 120, opacity: 0, scale: 0.9 },
  animate: (i: number) => ({
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.06 }
  }),
  exit: {
    x: -160,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
  }
};

function Hero({ welcomeDone }: { welcomeDone: boolean }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + slides.length) % slides.length), []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastActiveElement = useRef<HTMLElement | null>(null);
  const scrollLockY = useRef<number>(0);
  const isLockedRef = useRef<boolean>(false);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined" || !document.body) return;

    if (mobileMenuOpen) {
      lastActiveElement.current = document.activeElement as HTMLElement;
      const scrollY = window.scrollY;
      scrollLockY.current = scrollY;
      isLockedRef.current = true;
      
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else if (isLockedRef.current) {
      const scrollY = scrollLockY.current;
      isLockedRef.current = false;
      
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      
      if (scrollY > 0) {
        window.scrollTo(0, scrollY);
      }
      if (lastActiveElement.current) {
        lastActiveElement.current.focus();
        lastActiveElement.current = null;
      }
    }
    return () => {
      if (isLockedRef.current) {
        const scrollY = scrollLockY.current;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        if (scrollY > 0) {
          window.scrollTo(0, scrollY);
        }
      }
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const upcoming = Array.from({ length: 4 }, (_, k) => slides[(index + 1 + k) % slides.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.image}
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={HERO_BG_TRANSITION}
          className="absolute inset-0 will-change-[opacity]"
        >
          <ResponsiveImage
            src={slide.image}
            alt={slide.label}
            width={1920}
            height={1125}
            quality={92}
            isHero
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-0 left-0 right-0 z-30 h-[3px] bg-white/10">
        <motion.div
          key={index}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: welcomeDone ? 1 : 0 }}
          style={{ transformOrigin: "left" }}
          transition={PROGRESS_TRANSITION}
          className="h-full w-full bg-accent"
        />
      </div>

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={welcomeDone ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={HEADER_TRANSITION}
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-10 lg:px-14 pt-6"
      >
        <div className="flex-1 flex justify-start">
          <Link
            to="/"
            aria-label="Cabo Tours & Travels Home"
            className="flex items-center gap-3 text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <img
              src={logoFooter}
              alt="Cabo Tours & Travels Logo"
              width={280}
              height={284}
              className="h-16 w-auto object-contain select-none filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
              loading="eager"
            />
            <span className="font-display tracking-[0.18em] text-[13px]">CABO TOURS</span>
          </Link>
        </div>
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-9 text-[11px] tracking-[0.22em] text-white/85"
          aria-label="Hero navigation"
        >
          {heroNavItems.map((i, k) =>
            "href" in i ? (
              <a
                key={k}
                href={i.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative py-1 transition hover:text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {i.label}
              </a>
            ) : (
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
            ),
          )}
        </nav>
        <div className="flex-1 flex justify-end items-center gap-5 text-white/85">
          <div className="hidden md:flex items-center">
            <Search className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-haspopup="true"
            aria-expanded={mobileMenuOpen}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMobileMenuOpen(true);
            }}
            className="md:hidden text-[10px] tracking-[0.22em] text-white/90 uppercase border border-white/40 rounded-full px-3 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Menu
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[6px] md:hidden"
            />
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[80vw] max-w-[300px] bg-background border-l border-white/10 shadow-2xl flex flex-col md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <Link
                  to="/"
                  aria-label="Cabo Tours & Travels Home"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <img
                    src={logoFooter}
                    alt="Cabo Tours & Travels Logo"
                    width={280}
                    height={284}
                    className="h-16 w-auto object-contain select-none filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                    loading="eager"
                  />
                  <span className="font-display tracking-[0.18em] text-[13px]">CABO TOURS</span>
                </Link>
                <button
                  aria-label="Close navigation menu"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMobileMenuOpen(false);
                  }}
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <X className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
                </button>
              </div>
              <nav className="flex flex-col gap-4 p-6 flex-1 overflow-y-auto scrollbar-none" aria-label="Mobile Navigation">
                {heroNavItems.map((i, k) =>
                  "href" in i ? (
                    <a
                      key={k}
                      href={i.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-display text-2xl uppercase tracking-[0.05em] py-4 px-4 border-b border-white/5 border-l-4 border-l-transparent text-white/80 transition-all duration-200 rounded-r-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      {i.label}
                    </a>
                  ) : (
                    <Link
                      key={k}
                      to={i.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-display text-2xl uppercase tracking-[0.05em] py-4 px-4 border-b border-white/5 border-l-4 border-l-transparent text-white/80 transition-all duration-200 rounded-r-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                      activeProps={{ className: "active border-l-brand bg-white/[0.03] text-brand font-bold" }}
                      activeOptions={{ exact: i.to === "/" }}
                    >
                      {i.label}
                    </Link>
                  )
                )}
                <a
                  href={waLink(waMessages.general)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    trackEvent("whatsapp_click", "engagement", "Hero Mobile CTA");
                  }}
                  className="mt-6 mb-8 inline-flex items-center justify-center rounded-full bg-brand px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand shrink-0"
                >
                  Book on WhatsApp
                </a>

                {/* Bottom info block */}
                <div className="mt-auto pt-8 pb-4 border-t border-white/5 space-y-4 text-left">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-white/45 font-semibold">Contact</div>
                  <div className="text-sm text-white/70 space-y-2.5">
                    <div>📞 {BUSINESS_INFO.phoneDisplay}</div>
                    <div>✉️ {BUSINESS_INFO.email}</div>
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="relative z-10 grid h-full grid-cols-1 lg:grid-cols-12 items-end lg:items-center px-6 md:px-10 lg:px-14 pb-36 lg:pb-0 pt-28">
        <div className="lg:col-span-6 max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              initial={{ y: 30, opacity: 0 }}
              animate={welcomeDone ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              exit={{ y: -20, opacity: 0 }}
              transition={TITLE_TRANSITION}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-white/70" />
                <span className="text-[12px] tracking-[0.28em] uppercase text-white/85">
                  {slide.label === "Kerala — India" ? (
                    <Link to="/kerala" className="hover:text-brand transition duration-300">
                      {slide.label}
                    </Link>
                  ) : (
                    slide.label
                  )}
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
          </AnimatePresence>
        </div>

        <div className="lg:col-span-6 mt-12 lg:mt-0">
          <div className="flex gap-4 lg:gap-6 justify-end overflow-hidden">
            <AnimatePresence initial={false} mode="popLayout">
              {upcoming.map((s, i) => (
                <motion.button
                  layout
                  key={s.image}
                  onClick={() => setIndex((index + 1 + i) % slides.length)}
                  custom={i}
                  variants={thumbnailVariants}
                  initial="initial"
                  animate={welcomeDone ? "animate" : "initial"}
                  exit="exit"
                  className="relative h-[220px] w-[135px] sm:h-[300px] sm:w-[185px] lg:h-[340px] lg:w-[210px] shrink-0 overflow-hidden rounded-[22px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/15 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  aria-label={`Switch to slide showing ${s.label}`}
                >
                  <ResponsiveImage
                    src={s.image}
                    alt={s.label}
                    width={450}
                    height={728}
                    quality={80}
                    widths={[450]}
                    sizes="(max-width: 640px) 135px, (max-width: 1024px) 185px, 210px"
                    isHero
                    className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                    <div className="text-[9px] tracking-[0.22em] uppercase text-white/75">
                      {s.label === "Kerala — India" ? (
                        <Link to="/kerala" onClick={(e) => e.stopPropagation()} className="hover:text-brand transition duration-300">
                          {s.label}
                        </Link>
                      ) : (
                        s.label
                      )}
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
        transition={CONTROLS_TRANSITION}
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
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ transformOrigin: "left" }}
              transition={PROGRESS_TRANSITION}
              className="absolute top-0 left-0 w-full h-px bg-accent"
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
const SectionHead = React.memo(function SectionHead({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="mb-12 max-w-3xl">
      <div className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-brand">
        <span className="h-px w-8 bg-brand" />
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display uppercase leading-[0.95] text-[clamp(2rem,4.6vw,3.6rem)]">
        {title}
      </h2>
      {copy && <p className="mt-5 text-white/80 leading-relaxed max-w-xl">{copy}</p>}
    </div>
  );
});

const ServicesStrip = React.memo(function ServicesStrip() {
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
});

const FeaturedDestinations = React.memo(function FeaturedDestinations() {
  return (
    <section className="relative py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead
          eyebrow="Our Services"
          title={"What can we\ndo for you?"}
          copy="Hand-picked across India and the world — every service tailored with care, precision and the small things that make it feel like yours."
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
              <ResponsiveImage
                src={d.image}
                alt={d.name}
                width={640}
                height={420}
                quality={90}
                className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] group-hover:scale-110"
              />
              {d.slug === "kerala" ? (
                <Link to="/kerala" aria-label="Explore Kerala holiday packages" className="absolute inset-0 z-10 block">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </Link>
              ) : d.slug === "kashmir" ? (
                <Link to="/cabs" aria-label="Explore Kashmir cab services" className="absolute inset-0 z-10 block">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </Link>
              ) : d.slug === "domestic-packages" ? (
                <Link to="/domestic-packages" aria-label="Explore Domestic India holiday packages" className="absolute inset-0 z-10 block">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </Link>
              ) : d.slug === "international-packages" ? (
                <Link to="/international-packages" aria-label="Explore International travel packages" className="absolute inset-0 z-10 block">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </Link>
              ) : d.href ? (
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${d.name} tour information website`}
                  className="absolute inset-0 z-10 block"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </a>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              )}
              <div className="absolute inset-x-0 bottom-0 z-20 p-6">
                <div className="text-[10px] tracking-[0.3em] uppercase text-white/70">
                  {d.slug === "kerala" ? (
                    <Link to="/kerala" aria-label="Explore Kerala, India packages" className="hover:text-brand transition duration-300">
                      Domestic · India
                    </Link>
                  ) : d.slug === "kashmir" ? (
                    <Link to="/cabs" className="hover:text-brand transition duration-300">
                      {d.region} · {d.country}
                    </Link>
                  ) : d.slug === "domestic-packages" ? (
                    <Link to="/domestic-packages" aria-label="Browse all Domestic India packages" className="hover:text-brand transition duration-300">
                      Domestic · India
                    </Link>
                  ) : d.slug === "international-packages" ? (
                    <Link to="/international-packages" className="hover:text-brand transition duration-300">
                      {d.region} · {d.country}
                    </Link>
                  ) : d.href ? (
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
                <h3 className="mt-1 font-display text-xl md:text-2xl uppercase text-white">{d.name}</h3>
                <p className="mt-3 text-sm text-white/70 line-clamp-2">{d.tagline}</p>
                <div className="mt-6 flex items-center justify-end">
                  {d.slug === "kerala" ? (
                    <Link
                      to="/kerala"
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
                    >
                      Explore <ArrowRight className="h-3 w-3" />
                    </Link>
                  ) : d.slug === "kashmir" ? (
                    <Link
                      to="/cabs"
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
                    >
                      Explore <ArrowRight className="h-3 w-3" />
                    </Link>
                  ) : d.slug === "domestic-packages" ? (
                    <Link
                      to="/domestic-packages"
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
                    >
                      Explore <ArrowRight className="h-3 w-3" />
                    </Link>
                  ) : d.slug === "international-packages" ? (
                    <Link
                      to="/international-packages"
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
      </div>
    </section>
  );
});

const PopularPackages = React.memo(function PopularPackages() {
  return (
    <section className="relative py-20 md:py-24 lg:py-32 bg-[oklch(0.16_0.01_250)] border-y border-white/10">
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
                  <ResponsiveImage
                    src={p.image || dest.image}
                    alt={p.title}
                    width={640}
                    height={208}
                    quality={90}
                    className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-black/55 backdrop-blur px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white">
                    {p.category}
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="text-[10px] tracking-[0.22em] uppercase text-white/50">
                      {dest.name}
                    </div>
                    <h3 className="mt-1 font-display text-xl md:text-2xl uppercase">{p.title}</h3>
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

const WhyChoose = React.memo(function WhyChoose() {
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
    <section className="py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead eyebrow="Why Cabo" title={"Travel like\nyou meant it."} />
        <div className="grid gap-px bg-white/10 rounded-[24px] overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.t} className="bg-background p-8 lg:p-10">
              <div className="font-display text-brand text-xl md:text-2xl uppercase">{it.t}</div>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

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
      <ResponsiveImage
        src={src}
        alt={alt}
        width={320}
        height={180}
        quality={90}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

const getStoryTransition = (i: number) => ({
  duration: 0.8,
  delay: i * 0.1,
  ease: [0.21, 1.02, 0.43, 1.01] as const,
});

const Experiences = React.memo(function Experiences() {
  const [stories, setStories] = useState<GuestStory[]>([]);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [likesCounts, setLikesCounts] = useState<Record<string, number>>({});
  const [hasIntersected, setHasIntersected] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleCarouselScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardElements = el.querySelectorAll("[data-story-card]");
    let closestIndex = 0;
    let minDistance = Infinity;
    const containerCenter = el.getBoundingClientRect().left + el.clientWidth / 2;

    for (let i = 0; i < cardElements.length; i++) {
      const card = cardElements[i] as HTMLElement;
      const cardCenter = card.getBoundingClientRect().left + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    setActiveStoryIndex(Math.max(0, Math.min(3, closestIndex)));
  };

  const getOrCreateSessionId = () => {
    if (typeof window === "undefined") return "";
    try {
      let sessionId = localStorage.getItem("cabo_session_id");
      if (!sessionId) {
        sessionId = "sess-" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem("cabo_session_id", sessionId);
      }
      return sessionId;
    } catch {
      return "";
    }
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const loadedStories = getStories();
    setStories(loadedStories);

    if (!hasIntersected) return;

    const fetchDbStories = async () => {
      try {
        const { supabase } = await import("@/lib/supabase");
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
        }
      } catch { }
    };
    fetchDbStories();

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
        .catch(() => { });
    } else {
      const localCounts: Record<string, number> = {};
      loadedStories.forEach((s) => {
        localCounts[s.id] = parseInt(s.likes) || 0;
      });
      setLikesCounts(localCounts);
    }
  }, []);

  const handleLike = async (storyId: string) => {
    const sessionId = getOrCreateSessionId();
    if (!sessionId) return;

    const isLiked = likedIds.has(storyId);
    const newLikedIds = new Set(likedIds);
    if (isLiked) {
      newLikedIds.delete(storyId);
    } else {
      newLikedIds.add(storyId);
    }
    setLikedIds(newLikedIds);

    setLikesCounts((prev) => ({
      ...prev,
      [storyId]: (prev[storyId] || 0) + (isLiked ? -1 : 1),
    }));

    try {
      await toggleLikeServerFn({ data: { testimonialId: storyId, sessionId } });
    } catch (e) {
      console.error("Failed to sync like state:", e);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return (
          <svg className="w-3.5 h-3.5 text-pink-500 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
          </svg>
        );
      case "facebook":
        return (
          <svg className="w-3.5 h-3.5 text-blue-600 fill-current" viewBox="0 0 24 24">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" strokeWidth={0} />
          </svg>
        );
      case "google":
        return (
          <svg className="w-3.5 h-3.5 text-red-500 fill-current" viewBox="0 0 24 24">
            <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.51 0-6.358-2.848-6.358-6.358s2.848-6.358 6.358-6.358c1.621 0 3.094.614 4.218 1.614l3.14-3.14C19.23 2.11 15.93 1 12.24 1 5.48 1 0 6.48 0 13.24s5.48 12.24 12.24 12.24c6.88 0 12.24-5.48 12.24-12.24 0-.8-.1-1.6-.24-2.285H12.24z" />
          </svg>
        );
      default:
        return <Globe className="w-3.5 h-3.5 text-white/50" />;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section ref={sectionRef} className="relative py-20 md:py-24 lg:py-32 bg-[oklch(0.16_0.01_250)] border-y border-white/10 overflow-hidden">
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
            <div className="mt-8 hidden md:flex flex-col gap-4">
              <Link
                to="/stories"
                onClick={() => trackEvent("view_all_diaries", "navigation")}
                className="group inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-white hover:text-brand transition"
              >
                Read Travel Diaries{" "}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                to="/feedback"
                className="group inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-brand hover:text-white transition"
              >
                Share Your Feedback{" "}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Masonry of social-style travel posts */}
          <div className="lg:col-span-8">
            {/* Desktop Masonry Grid */}
            <div className="hidden md:grid md:grid-cols-2 gap-6">
              {stories.slice(0, 4).map((story, i) => (
                <motion.div
                  key={story.id || story.username}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={getStoryTransition(i)}
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
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                    </div>
                  </div>

                  {/* Bottom Bar: Action buttons */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-4 text-[11px] text-white/50">
                      <button
                        onClick={() => handleLike(story.id)}
                        className={`group flex items-center gap-1.5 transition-colors duration-300 ${likedIds.has(story.id)
                          ? "text-brand"
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

            {/* Swipe Helper for Mobile */}
            <div className="md:hidden flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4 animate-pulse">
              <span>← Swipe to explore stories →</span>
            </div>

            {/* Mobile Horizontal Carousel */}
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              style={{ WebkitOverflowScrolling: "touch" }}
              className="md:hidden flex gap-4 overflow-x-auto pb-6 scrollbar-none snap-x snap-proximity overscroll-x-contain -mx-6 px-6"
            >
              {stories.slice(0, 4).map((story, i) => (
                <div
                  key={`mobile-${story.id || story.username}`}
                  data-story-card
                  className="snap-center shrink-0 w-[80vw] max-w-[320px] relative flex flex-col justify-between overflow-hidden rounded-[20px] bg-neutral-900/60 border border-white/10 p-5 shadow-md h-[420px] will-change-transform"
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
                    <p className="text-xs text-white/70 leading-relaxed mb-4 line-clamp-4">{story.caption}</p>
                    <div className="relative flex-1 rounded-[14px] overflow-hidden border border-white/5 min-h-[130px]">
                      <ProgressiveImage
                        src={getStoryImage(story.img)}
                        alt={story.destination}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-4 text-[11px] text-white/50">
                      <button
                        onClick={() => handleLike(story.id)}
                        className={`group flex items-center gap-2 p-3 -m-3 min-w-[44px] min-h-[44px] transition-colors duration-300 ${likedIds.has(story.id)
                          ? "text-brand"
                          : "hover:text-brand text-white/60"
                          }`}
                        aria-label="Like story"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-colors duration-300 ${likedIds.has(story.id)
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

            {/* Pagination Dots */}
            <div className="md:hidden flex items-center justify-center gap-4 mt-3">
              {stories.slice(0, 4).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const el = carouselRef.current;
                    if (!el) return;
                    const cards = el.querySelectorAll("[data-story-card]");
                    const card = cards[i] as HTMLElement;
                    if (card) {
                      el.scrollTo({
                        left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2,
                        behavior: "smooth"
                      });
                    }
                  }}
                  className="p-3 -m-3 group flex items-center justify-center min-w-[32px] min-h-[32px]"
                  aria-label={`Go to story ${i + 1}`}
                >
                  <span
                    className={`h-1.5 rounded-full transition-all duration-300 block ${
                      activeStoryIndex === i
                        ? "bg-brand w-5"
                        : "bg-white/20 w-1.5 group-hover:bg-white/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Mobile CTA Buttons */}
            <div className="md:hidden flex flex-col gap-4 mt-8 items-center border-t border-white/5 pt-6">
              <Link
                to="/stories"
                onClick={() => trackEvent("view_all_diaries", "navigation")}
                className="group inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-white hover:text-brand transition"
              >
                Read Travel Diaries{" "}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                to="/feedback"
                className="group inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-brand hover:text-white transition"
              >
                Share Your Feedback{" "}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
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
});

const Testimonials = React.memo(function Testimonials() {
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
    <section className="py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead eyebrow="Guests" title={"They came back\nwith stories."} />
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={r.n}
              className="rounded-[22px] bg-[oklch(0.2_0.01_250)] p-6 md:p-8 ring-1 ring-white/10 relative"
            >
              <Quote className="h-6 w-6 md:h-7 md:w-7 text-brand mb-3 md:mb-4" />
              <p className="text-sm md:text-[15px] leading-normal md:leading-relaxed text-white/85">"{r.r}"</p>
              <div className="mt-4 md:mt-6 flex items-center gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <div className="mt-2 md:mt-3 font-display uppercase text-sm">{r.n}</div>
              <div className="text-[10px] tracking-[0.22em] uppercase text-white/70">{r.loc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const Stats = React.memo(function Stats() {
  const stats = [
    { n: "20+", t: "Destinations" },
    { n: "12k", t: "Happy Travellers" },
    { n: "150+", t: "Curated Packages" },
    { n: "8 yrs", t: "Crafting Journeys" },
  ];
  return (
    <section className="border-y border-white/10 bg-[oklch(0.14_0.01_250)] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.t} className="text-center">
            <div className="font-display text-[clamp(2.4rem,5vw,4rem)] text-brand leading-none">
              {s.n}
            </div>
            <div className="mt-3 text-[11px] tracking-[0.3em] uppercase text-white/80">{s.t}</div>
          </div>
        ))}
      </div>
    </section>
  );
});

const BookingCta = React.memo(function BookingCta() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24 lg:py-32">
      <img
        src={maldives}
        alt="Maldives overwater villas beach view background"
        loading="lazy"
        decoding="async"
        width={1920}
        height={1280}
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
});

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

const FAQ_CHEVRON_TRANSITION = { duration: 0.3, ease: "easeOut" as const };
const FAQ_CONTENT_TRANSITION = { duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] as const };

const FAQSection = React.memo(function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="relative py-20 md:py-24 lg:py-32 bg-background border-t border-white/5">
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
                    transition={FAQ_CHEVRON_TRANSITION}
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
                      transition={FAQ_CONTENT_TRANSITION}
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
});
