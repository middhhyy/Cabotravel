import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Users, Briefcase, Compass, ShieldCheck, HelpCircle } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { PageHeader } from "@/components/site/PageHeader";
import { waLink, waMessages } from "@/lib/whatsapp";
const heroCabs = "https://skzdfvoxoymuczcplwhl.supabase.co/storage/v1/object/public/feedback-photos/site-assets/hero-cabs.webp";
import cabSedan from "@/assets/cab-sedan.webp";
import cabSuv from "@/assets/cab-suv.webp";
import cabCrysta from "@/assets/cab-crysta.webp";
import cabTempo from "@/assets/cab-tempo.webp";
import cabLuxury from "@/assets/cab-luxury.webp";
import { trackEvent } from "@/lib/analytics";
import { getOptimizedImageUrl } from "@/lib/utils";

export const Route = createFileRoute("/cabs")({
  head: () => ({
    meta: [
      { title: "Kerala Cab Services & Rentals | Cabo Tours & Travels" },
      {
        name: "description",
        content:
          "Rent reliable cabs & tourist taxis in Calicut & Kerala. Book premium sedans, SUVs, or luxury tempo travellers at transparent, cheap rates with Cabo Tours.",
      },
      { property: "og:title", content: "Kerala Cab Services & Rentals | Cabo Tours & Travels" },
      {
        property: "og:description",
        content:
          "Rent reliable cabs & tourist taxis in Calicut & Kerala. Book premium sedans, SUVs, or luxury tempo travellers with Cabo Tours & Travels.",
      },
      { property: "og:url", content: "https://cabotourskerala.in/cabs" },
      { property: "og:image", content: "https://cabotourskerala.in/social-preview.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kerala Cab Services & Rentals | Cabo Tours & Travels" },
      {
        name: "twitter:description",
        content:
          "Rent reliable cabs & tourist taxis in Calicut & Kerala. Book premium vehicles with Cabo Tours.",
      },
      { name: "twitter:image", content: "https://cabotourskerala.in/social-preview.png" },
    ],
    links: [{ rel: "canonical", href: "https://cabotourskerala.in/cabs" }],
  }),
  component: CabsPage,
});

const CABS = [
  {
    id: "sedan",
    name: "Premium Sedan",
    capacity: "4 + 1 Seats",
    luggage: "2 bags",
    description: "Ideal for couples, solo travelers, or small families. Reliable, comfortable, and budget-friendly.",
    type: "Dzire / Etios / Accent",
    image: cabSedan,
  },
  {
    id: "suv",
    name: "Comfort SUV",
    capacity: "6 + 1 Seats",
    luggage: "4 bags",
    description: "Spacious SUVs for small groups who need extra seating or additional luggage capacity.",
    type: "Ertiga / Marazzo / Similar",
    image: cabSuv,
  },
  {
    id: "crysta",
    name: "Toyota Innova Crysta",
    capacity: "7 + 1 Seats",
    luggage: "5 bags",
    description: "The gold standard of premium road travel. Unmatched ride comfort, leather upholstery, and safety.",
    type: "Premium MUV",
    image: cabCrysta,
  },
  {
    id: "tempo",
    name: "Tempo Traveller",
    capacity: "12 to 26 Seats",
    luggage: "10+ bags",
    description: "Perfect for large family groups, corporate outings, and wedding guest transportation.",
    type: "Group Passenger Van",
    image: cabTempo,
  },
  {
    id: "luxury",
    name: "Luxury Cab",
    capacity: "4 + 1 Seats",
    luggage: "3 bags",
    description: "Travel in executive style. Premium German engineered luxury cars for VIP transfers.",
    type: "Mercedes-Benz / BMW / Audi",
    image: cabLuxury,
  },
];

const FEATURES = [
  {
    icon: Compass,
    title: "All-Kerala Coverage",
    description: "Airport transfers, local sightseeing, taxi rentals in Calicut, or outstation tours across all Kerala destinations.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Drivers",
    description: "Highly experienced, background-checked, and polite drivers who act as friendly local guides.",
  },
  {
    icon: HelpCircle,
    title: "No Hidden Costs",
    description: "State taxes, toll fees, and driver allowances are clearly listed in our initial quotes.",
  },
];

function CabsPage() {
  return (
    <main className="bg-background">
      <SiteNav transparentOnTop />
      <PageHeader
        eyebrow="Cab Services"
        title={
          <>
            Ride in comfort.
            <br />
            Explore at your pace.
          </>
        }
        subtitle="Premium taxi rentals in Calicut and across Kerala. From Cochin airport transfers to Munnar hills — rent top-tier cabs with polite, local drivers for your Kerala holiday tours."
        image={heroCabs}
        width={1024}
        height={1024}
      />

      {/* Grid of features */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="relative rounded-[22px] bg-[oklch(0.2_0.01_250)] ring-1 ring-white/10 p-7 flex gap-5 items-start"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg uppercase tracking-wide">{f.title}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cabs List Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <div className="mb-10">
          <div className="text-[11px] tracking-[0.3em] uppercase text-brand">Our Fleet</div>
          <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95]">
            Choose your
            <br />
            perfect ride.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CABS.map((cab, i) => (
            <motion.div
              key={cab.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative h-[440px] overflow-hidden rounded-[26px] ring-1 ring-white/10 flex flex-col justify-end p-6"
            >
              <img
                src={getOptimizedImageUrl(cab.image, { width: 640, quality: 75 })}
                alt={cab.name}
                loading="eager"
                width={640}
                height={440}
                className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase text-white/65">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> {cab.capacity}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-white/40" />
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" /> {cab.luggage}
                  </span>
                </div>

                <h3 className="mt-2 font-display text-2xl uppercase leading-none">{cab.name}</h3>
                <p className="mt-1 text-[11px] tracking-widest text-brand uppercase font-semibold">{cab.type}</p>
                <p className="mt-3 text-xs text-white/70 leading-relaxed max-w-sm">{cab.description}</p>

                <div className="mt-6 flex items-center justify-between">
                  <a
                    href={waLink(waMessages.cab(cab.name))}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent("cab_enquire", "lead", cab.name)}
                    className="group relative rounded-full border border-white/55 px-6 py-2.5 text-[10px] tracking-[0.3em] uppercase text-white transition hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  >
                    Enquire Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[oklch(0.16_0.01_250)] border-t border-b border-white/10 py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-[11px] tracking-[0.3em] uppercase text-brand mb-4">Quick Booking</div>
          <h2 className="font-display text-4xl uppercase leading-[0.95]">Planning a trip?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/65">
            Share your itinerary or destination route with us on WhatsApp. We will send you a tailored, all-inclusive quote for your choice of vehicle within minutes.
          </p>
          <a
            href={waLink(waMessages.general)}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("whatsapp_click", "engagement", "Cabs Bottom CTA")}
            className="mt-7 inline-flex rounded-full bg-brand px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:scale-[1.03] transition duration-300"
          >
            Custom Quote on WhatsApp
          </a>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFab />
    </main>
  );
}
