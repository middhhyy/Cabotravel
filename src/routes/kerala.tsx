import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { PageHeader } from "@/components/site/PageHeader";
import { waLink, waMessages } from "@/lib/whatsapp";
const munnarImg = "https://skzdfvoxoymuczcplwhl.supabase.co/storage/v1/object/public/feedback-photos/site-assets/hero-munnar-tea-gardens.webp";
const wayanadImg = "https://skzdfvoxoymuczcplwhl.supabase.co/storage/v1/object/public/feedback-photos/site-assets/hero-wayanad.webp";
const vagamonImg = "https://skzdfvoxoymuczcplwhl.supabase.co/storage/v1/object/public/feedback-photos/site-assets/hero-vagamon.webp";
const backwatersImg = "https://skzdfvoxoymuczcplwhl.supabase.co/storage/v1/object/public/feedback-photos/site-assets/hero-alleppey-backwaters.webp";
const thekkadyImg = "https://skzdfvoxoymuczcplwhl.supabase.co/storage/v1/object/public/feedback-photos/site-assets/hero-thekkady.webp";
const kovalamImg = "https://skzdfvoxoymuczcplwhl.supabase.co/storage/v1/object/public/feedback-photos/site-assets/hero-kovalam-beach.webp";
const fortKochiImg = "https://skzdfvoxoymuczcplwhl.supabase.co/storage/v1/object/public/feedback-photos/site-assets/hero-fort-kochi.webp";
const varkalaImg = "https://skzdfvoxoymuczcplwhl.supabase.co/storage/v1/object/public/feedback-photos/site-assets/hero-varkala.webp";
import kozhikodeImg from "@/assets/dest-kozhikode.png";
import kannurImg from "@/assets/dest-kannur.png";
import kasaragodImg from "@/assets/dest-kasaragod.png";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/kerala")({
  head: () => ({
    meta: [
      { title: "Kerala Weekend Getaways & Staycations — Cabo Tours & Travels" },
      {
        name: "description",
        content:
          "Perfect weekend escapes, houseboats, and family trips across Kerala. Curated local itineraries, clear pricing, and verified drivers.",
      },
      { property: "og:title", content: "Kerala Weekend Getaways & Staycations — Cabo Tours & Travels" },
      {
        property: "og:description",
        content:
          "Perfect weekend escapes, houseboats, and family trips across Kerala. Curated local itineraries.",
      },
      { property: "og:url", content: "https://cabotours.in/kerala" },
      { property: "og:image", content: "https://cabotours.in/social-preview.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kerala Weekend Getaways & Staycations — Cabo Tours & Travels" },
      {
        name: "twitter:description",
        content: "Curated local escapes, houseboats, and family tours across Kerala.",
      },
      { name: "twitter:image", content: "https://cabotours.in/social-preview.png" },
    ],
    links: [{ rel: "canonical", href: "https://cabotours.in/kerala" }],
  }),
  component: KeralaPage,
});

const WEEKEND_GETAWAYS = [
  {
    slug: "munnar",
    name: "Munnar",
    tagline: "Walk through cloud-kissed tea estates.",
    travelTime: "2.5 hrs from Kochi",
    category: "Misty Hills",
    image: munnarImg,
    bestTime: "Sep – Mar",
    duration: "2 – 3 nights",
  },
  {
    slug: "wayanad",
    name: "Wayanad",
    tagline: "Unwind in luxury treehouses and forest villas.",
    travelTime: "3 hrs from Calicut",
    category: "Forest Escapes",
    image: wayanadImg,
    bestTime: "Oct – May",
    duration: "2 – 3 nights",
  },
  {
    slug: "vagamon",
    name: "Vagamon",
    tagline: "Cool breeze, pine forests, and rolling green hills.",
    travelTime: "2 hrs from Kottayam",
    category: "Meadows & Pines",
    image: vagamonImg,
    bestTime: "Sep – May",
    duration: "2 nights",
  },
];

const FAMILY_TOURS = [
  {
    slug: "alleppey",
    name: "Alleppey Houseboats",
    tagline: "Traditional teakwood houseboats and serene canal cruises.",
    travelTime: "1.5 hrs from Kochi",
    category: "Backwaters",
    image: backwatersImg,
    bestTime: "Sep – Mar",
    duration: "1 – 2 nights",
  },
  {
    slug: "thekkady",
    name: "Thekkady",
    tagline: "Boating in Periyar and trekking through spice gardens.",
    travelTime: "3.5 hrs from Madurai",
    category: "Spice & Wild",
    image: thekkadyImg,
    bestTime: "Oct – Mar",
    duration: "2 nights",
  },
  {
    slug: "kovalam",
    name: "Kovalam Beach",
    tagline: "Golden sands and sunset views under the lighthouse.",
    travelTime: "3 hrs from Kollam",
    category: "Beaches",
    image: kovalamImg,
    bestTime: "Sep – Mar",
    duration: "2 – 3 nights",
  },
];

const MALABAR_ESCAPES = [
  {
    slug: "kozhikode",
    name: "Kozhikode",
    tagline: "Walk historic beach streets and relish Malabar biryani.",
    travelTime: "1 hr from Kannur",
    category: "Malabar Shore",
    image: kozhikodeImg,
    bestTime: "Sep – Mar",
    duration: "1 – 2 nights",
  },
  {
    slug: "kannur",
    name: "Kannur",
    tagline: "Drive on Muzhappilangad shore and explore old forts.",
    travelTime: "45 min from Kannur town",
    category: "Forts & Drive-ins",
    image: kannurImg,
    bestTime: "Oct – Mar",
    duration: "2 nights",
  },
  {
    slug: "kasaragod",
    name: "Kasaragod",
    tagline: "Explore massive Bekal Fort and green hills of Ranipuram.",
    travelTime: "1.5 hrs from Mangalore",
    category: "Bekal & Hills",
    image: kasaragodImg,
    bestTime: "Oct – Mar",
    duration: "2 nights",
  },
];

const QUICK_ESCAPES = [
  {
    slug: "fort-kochi",
    name: "Fort Kochi",
    tagline: "Colonial streets, Chinese nets, and cozy cafes.",
    travelTime: "0.5 hrs from Kochi",
    category: "Heritage & Art",
    image: fortKochiImg,
    bestTime: "Oct – Mar",
    duration: "1 night",
  },
  {
    slug: "varkala",
    name: "Varkala Cliffs",
    tagline: "Stunning red cliffs overlooking the Arabian Sea.",
    travelTime: "1 hr from Trivandrum",
    category: "Cliffside Beach",
    image: varkalaImg,
    bestTime: "Oct – Mar",
    duration: "1 – 2 nights",
  },
];

function KeralaPage() {
  const scrollToDestinations = () => {
    const el = document.getElementById("kerala-escapes");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="bg-background">
      <SiteNav transparentOnTop />

      {/* Hero section */}
      <section className="relative isolate overflow-hidden min-h-screen flex items-center justify-center pt-28">
        <img
          src={munnarImg}
          alt="Munnar Tea Gardens"
          loading="eager"
          fetchPriority="high"
          width={1536}
          height={1024}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_50%,oklch(0.74_0.14_235_/_0.15),transparent)]" />

        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <div className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-brand justify-center mb-6">
            <span className="h-px w-8 bg-brand" />
            Kerala Escapes
            <span className="h-px w-8 bg-brand" />
          </div>
          <h1 className="font-display uppercase leading-[0.9] text-[clamp(2.5rem,8vw,5.5rem)] text-white">
            KERALA.
            <br />
            NO PASSPORT NEEDED.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80">
            Misty tea estates, serene houseboat getaways, and cliffside sunsets — all just a short drive or train ride away. Plan your perfect escape right here in your home state.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={scrollToDestinations}
              className="group relative rounded-full border border-white/55 px-8 py-3.5 text-[11px] tracking-[0.3em] uppercase text-white transition hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Discover Location
            </button>
          </div>
        </div>
      </section>

      {/* Grid sections wrapper */}
      <div id="kerala-escapes" className="scroll-mt-20">

        {/* Weekend Getaways */}
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
          <div className="mb-10">
            <div className="text-[11px] tracking-[0.3em] uppercase text-brand">01 · Roadtrips</div>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95]">
              Weekend
              <br />
              Getaways.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WEEKEND_GETAWAYS.map((d, i) => (
              <motion.div
                key={d.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative h-[440px] overflow-hidden rounded-[26px] ring-1 ring-white/10 flex flex-col justify-end p-6"
              >
                {/* Travel Time Tag top left */}
                <div className="absolute top-4 left-4 z-10 rounded-full bg-black/60 backdrop-blur border border-white/10 px-3 py-1 text-[9px] font-semibold tracking-wider text-brand uppercase flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> {d.travelTime}
                </div>

                <img
                  src={d.image}
                  alt={d.name}
                  loading="eager"
                  className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                <div className="relative z-10 text-left">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/70">
                    {d.category} · Domestic
                  </div>
                  <div className="mt-1 font-display text-3xl uppercase leading-none text-white">{d.name}</div>
                  <p className="mt-3 text-sm text-white/70 leading-normal">{d.tagline}</p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[10px] tracking-[0.22em] uppercase text-white/50">
                    <span>Best: {d.bestTime}</span>
                    <span>{d.duration}</span>
                  </div>
                  <div className="mt-5 flex items-center justify-end">
                    <a
                      href={waLink(waMessages.destination(d.name))}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent("destination_click", "lead", d.name)}
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
                    >
                      Discover <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Family & Group Tours */}
        <section className="bg-[oklch(0.16_0.01_250)] border-y border-white/10 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-10">
              <div className="text-[11px] tracking-[0.3em] uppercase text-brand">02 · Together</div>
              <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95]">
                Family &
                <br />
                Group Tours.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {FAMILY_TOURS.map((d, i) => (
                <motion.div
                  key={d.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="group relative h-[440px] overflow-hidden rounded-[26px] ring-1 ring-white/10 bg-background flex flex-col justify-end p-6"
                >
                  {/* Travel Time Tag top left */}
                  <div className="absolute top-4 left-4 z-10 rounded-full bg-black/60 backdrop-blur border border-white/10 px-3 py-1 text-[9px] font-semibold tracking-wider text-brand uppercase flex items-center gap-1.5">
                    <Clock className="h-3 w-3" /> {d.travelTime}
                  </div>

                  <img
                    src={d.image}
                    alt={d.name}
                    loading="eager"
                    className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                  <div className="relative z-10 text-left">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-white/70">
                      {d.category} · Domestic
                    </div>
                    <div className="mt-1 font-display text-3xl uppercase leading-none text-white">{d.name}</div>
                    <p className="mt-3 text-sm text-white/70 leading-normal">{d.tagline}</p>
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[10px] tracking-[0.22em] uppercase text-white/50">
                      <span>Best: {d.bestTime}</span>
                      <span>{d.duration}</span>
                    </div>
                    <div className="mt-5 flex items-center justify-end">
                      <a
                        href={waLink(waMessages.destination(d.name))}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackEvent("destination_click", "lead", d.name)}
                        className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
                      >
                        Discover <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* North Kerala / Malabar Escapes */}
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
          <div className="mb-10">
            <div className="text-[11px] tracking-[0.3em] uppercase text-brand">03 · Malabar Region</div>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95]">
              North Kerala &
              <br />
              Malabar Escapes.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MALABAR_ESCAPES.map((d, i) => (
              <motion.div
                key={d.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative h-[440px] overflow-hidden rounded-[26px] ring-1 ring-white/10 flex flex-col justify-end p-6"
              >
                {/* Travel Time Tag top left */}
                <div className="absolute top-4 left-4 z-10 rounded-full bg-black/60 backdrop-blur border border-white/10 px-3 py-1 text-[9px] font-semibold tracking-wider text-brand uppercase flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> {d.travelTime}
                </div>

                <img
                  src={d.image}
                  alt={d.name}
                  loading="eager"
                  className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                <div className="relative z-10 text-left">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/70">
                    {d.category} · Domestic
                  </div>
                  <div className="mt-1 font-display text-3xl uppercase leading-none text-white">{d.name}</div>
                  <p className="mt-3 text-sm text-white/70 leading-normal">{d.tagline}</p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[10px] tracking-[0.22em] uppercase text-white/50">
                    <span>Best: {d.bestTime}</span>
                    <span>{d.duration}</span>
                  </div>
                  <div className="mt-5 flex items-center justify-end">
                    <a
                      href={waLink(waMessages.destination(d.name))}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent("destination_click", "lead", d.name)}
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
                    >
                      Discover <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quick Escapes */}
        <section className="bg-[oklch(0.16_0.01_250)] border-y border-white/10 py-20 pb-24">
          <div className="mb-10">
            <div className="text-[11px] tracking-[0.3em] uppercase text-brand">04 · Short Trips</div>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95]">
              Quick
              <br />
              Escapes.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {QUICK_ESCAPES.map((d, i) => (
              <motion.div
                key={d.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative h-[440px] overflow-hidden rounded-[26px] ring-1 ring-white/10 flex flex-col justify-end p-6"
              >
                {/* Travel Time Tag top left */}
                <div className="absolute top-4 left-4 z-10 rounded-full bg-black/60 backdrop-blur border border-white/10 px-3 py-1 text-[9px] font-semibold tracking-wider text-brand uppercase flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> {d.travelTime}
                </div>

                <img
                  src={d.image}
                  alt={d.name}
                  loading="eager"
                  className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                <div className="relative z-10 text-left">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/70">
                    {d.category} · Domestic
                  </div>
                  <div className="mt-1 font-display text-3xl uppercase leading-none text-white">{d.name}</div>
                  <p className="mt-3 text-sm text-white/70 leading-normal">{d.tagline}</p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[10px] tracking-[0.22em] uppercase text-white/50">
                    <span>Best: {d.bestTime}</span>
                    <span>{d.duration}</span>
                  </div>
                  <div className="mt-5 flex items-center justify-end">
                    <a
                      href={waLink(waMessages.destination(d.name))}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent("destination_click", "lead", d.name)}
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
                    >
                      Discover <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom CTA section */}
      <section className="bg-[oklch(0.16_0.01_250)] border-t border-white/10 py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-[11px] tracking-[0.3em] uppercase text-brand mb-4">Plan Your Trip</div>
          <h2 className="font-display text-4xl uppercase leading-[0.95]">Ready to escape the daily grind?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            Plan your custom Kerala getaway with local travel advisors. No hidden charges, just perfect weekend itineraries.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href={waLink(waMessages.custom)}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("whatsapp_click", "engagement", "Kerala WhatsApp CTA")}
              className="inline-flex rounded-full bg-brand px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:scale-[1.03] transition duration-300"
            >
              Enquire on WhatsApp
            </a>
            <a
              href={waLink(waMessages.general)}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("whatsapp_click", "engagement", "Kerala Standard CTA")}
              className="inline-flex rounded-full border border-white/30 hover:border-white px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black transition duration-300"
            >
              General Enquiry
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFab />
    </main>
  );
}
