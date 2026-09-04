import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { waLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { logLead } from "@/lib/logLead";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { PageHeader } from "@/components/site/PageHeader";

import munnarImg from "@/assets/pkg-munnar-hills.webp";
import backwatersImg from "@/assets/pkg-kerala-backwaters.webp";
import thekkadyImg from "@/assets/pkg-thekkady-wildlife.webp";
import kovalamImg from "@/assets/pkg-kovalam-beach.webp";
import fortKochiImg from "@/assets/pkg-fort-kochi-culture.webp";
import vagamonImg from "@/assets/pkg-vagamon-adventure.webp";
import TheyyamImg from "@/assets/pkg-theyyam-experience.jpg";
import keralaTnEscapeImg from "@/assets/pkg-kerala-tn-grand-escape.jpg";
import southIndiaExplorerImg from "@/assets/pkg-south-india-explorer.jpg";
import southIndiaTempleCoastalImg from "@/assets/pkg-south-india-temple-coastal.jpg";

const dubaiHero = "https://skzdfvoxoymuczcplwhl.supabase.co/storage/v1/object/public/feedback-photos/site-assets/hero-dubai-skyline.webp";

type KeralaPackageItem = {
  id: string;
  title: string;
  duration: string;
  pickupDrop?: string;
  route?: string;
  description?: string;
  price?: string;
  image: string;
};

export const KERALA_PACKAGES: KeralaPackageItem[] = [
  {
    id: "explore-munnar",
    title: "Explore Munnar",
    duration: "2 Nights / 3 Days",
    pickupDrop: "Cochin",
    price: "Starting from ₹7,500/-",
    image: munnarImg,
  },
  {
    id: "kerala-highlights-getaway",
    title: "Kerala Highlights Getaway",
    duration: "3 Nights / 4 Days",
    route: "Cochin → Munnar → Alleppey → Cochin",
    price: "Starting from ₹9,999/- per person",
    image: backwatersImg,
  },
  {
    id: "kerala-nature-backwaters-escape",
    title: "Kerala Nature & Backwaters Escape",
    duration: "4 Nights / 5 Days",
    route: "Cochin → Munnar → Thekkady → Alleppey → Cochin",
    price: "Starting from ₹11,999/- per person",
    image: thekkadyImg,
  },
  {
    id: "kerala-grand-explorer",
    title: "Kerala Grand Explorer",
    duration: "5 Nights / 6 Days",
    route: "Cochin → Munnar → Thekkady → Alleppey → Trivandrum",
    price: "Starting from ₹16,999/-",
    image: fortKochiImg,
  },
  {
    id: "kerala-ultimate-escape",
    title: "Kerala Ultimate Escape",
    duration: "6 Nights / 7 Days",
    route: "Cochin → Munnar → Thekkady → Alleppey → Varkala → Kovalam",
    price: "Starting from ₹18,999/-",
    image: kovalamImg,
  },
  {
    id: "kerala-grand-discovery",
    title: "Kerala Grand Discovery",
    duration: "7 Nights / 8 Days",
    route: "Cochin → Munnar → Thekkady → Alleppey → Varkala → Trivandrum → Kanyakumari",
    price: "Starting from ₹21,999/-",
    image: vagamonImg,
  },
  {
    id: "kerala-tamil-nadu-grand-escape",
    title: "Kerala & Tamil Nadu Grand Escape",
    duration: "8 Nights / 9 Days",
    route: "Cochin → Munnar → Thekkady → Alleppey → Varkala → Trivandrum → Kanyakumari → Madurai",
    price: "Starting from ₹24,999/-",
    image: keralaTnEscapeImg,
  },
  {
    id: "south-india-explorer",
    title: "South India Explorer",
    duration: "9 Nights / 10 Days",
    route: "Cochin → Munnar → Thekkady → Alleppey → Varkala → Trivandrum → Kanyakumari → Madurai → Rameswaram",
    price: "Starting from ₹26,999/-",
    image: southIndiaExplorerImg,
  },
  {
    id: "south-india-temple-coastal-escape",
    title: "South India Temple & Coastal Escape",
    duration: "4 Nights / 5 Days",
    route: "Trivandrum → Kanyakumari → Rameswaram → Madurai",
    price: "Starting from ₹12,999/-",
    image: southIndiaTempleCoastalImg,
  },
  {
    id: "kannur-theyyam-experience",
    title: "Kannur Theyyam Experience",
    duration: "2 Days / 1 Night",
    route: "Kannur → Theyyam Experience → Local Sightseeing → Departure",
    image: TheyyamImg,
  },
];

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
      { property: "og:url", content: "https://www.cabotourskerala.in/packages" },
      { property: "og:image", content: "https://www.cabotourskerala.in/social-preview.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Custom Tour Packages & Trip Itineraries | Cabo Tours" },
      {
        name: "twitter:description",
        content:
          "Browse our curated honeymoon, family, group, and luxury tour packages across Kerala, Kashmir, Dubai, Bali, Thailand, and Maldives from Cabo Tours.",
      },
      { name: "twitter:image", content: "https://www.cabotourskerala.in/social-preview.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.cabotourskerala.in/packages" }],
  }),
  component: PackagesPage,
});

function PackagesPage() {
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
      />

      {/* Main Packages Section matching Kerala page */}
      <div id="kerala-packages" className="scroll-mt-20">
        <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
          <div className="mb-10 lg:mb-12">
            <div className="text-[11px] tracking-[0.3em] uppercase text-brand">01 · CURATED JOURNEYS</div>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] text-white">
              KERALA TOUR PACKAGES.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {KERALA_PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.05 }}
                className="group relative h-[440px] overflow-hidden rounded-[26px] ring-1 ring-white/10 bg-background"
              >
                {/* Full-bleed background image */}
                <ResponsiveImage
                  src={pkg.image}
                  alt={pkg.title}
                  width={640}
                  height={440}
                  quality={90}
                  className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] group-hover:scale-110"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent" />

                {/* Single Bottom-Anchored Content Overlay */}
                <div className="absolute left-6 right-6 bottom-6 z-10 text-left flex flex-col">
                  {/* Title: Compact 2-line max font */}
                  <h3 className="font-display text-[22px] sm:text-[24px] uppercase leading-none text-white mb-2.5 line-clamp-2">
                    {pkg.title}
                  </h3>

                  {/* Duration Pill */}
                  <div className="mb-2.5">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 px-3 py-1 text-[10px] font-semibold tracking-wider text-brand uppercase">
                      <Clock className="h-3 w-3 shrink-0" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  {/* Route / Pickup */}
                  <div className="mb-2.5">
                    {pkg.pickupDrop ? (
                      <div className="text-xs text-white/80 flex items-start gap-1.5 leading-snug">
                        <MapPin className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                        <span className="line-clamp-2">Pickup & Drop: {pkg.pickupDrop}</span>
                      </div>
                    ) : pkg.route ? (
                      <div className="text-xs text-white/80 flex items-start gap-1.5 leading-snug">
                        <MapPin className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                        <span className="line-clamp-2">Route: {pkg.route}</span>
                      </div>
                    ) : null}
                  </div>

                  {/* Action Row */}
                  <div className="pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
                    <div className="text-xs font-semibold text-brand tracking-wide">
                      {pkg.price ? pkg.price : ""}
                    </div>

                    <a
                      href={waLink(`Hi Cabo Tours, I'm interested in the ${pkg.title}.`)}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => {
                        trackEvent("package_click", "lead", pkg.title);
                        logLead(pkg.title, window.location.pathname);
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-brand/90 transition-colors shrink-0 ml-auto"
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
          <h2 className="font-display text-4xl uppercase leading-[0.95] text-white">
            Ready to experience Kerala?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            Plan your custom Kerala getaway with local travel advisors. No hidden charges, just perfect itineraries tailored for you.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href={waLink("Hello Cabo Tours & Travels, I would like help planning a custom Kerala tour package.")}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                trackEvent("whatsapp_click", "engagement", "Kerala WhatsApp CTA");
                logLead("custom", window.location.pathname);
              }}
              className="inline-flex rounded-full bg-brand px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:scale-[1.03] transition duration-300"
            >
              Enquire on WhatsApp
            </a>
            <a
              href={waLink("Hello Cabo Tours & Travels, I would like more information about your Kerala packages.")}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                trackEvent("whatsapp_click", "engagement", "Kerala Standard CTA");
                logLead("general", window.location.pathname);
              }}
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

