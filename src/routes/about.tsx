import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { PageHeader } from "@/components/site/PageHeader";
import { waLink, waMessages, FOUNDER } from "@/lib/whatsapp";
import kashmirHero from "@/assets/hero-kashmir-dallake.png";
import founder from "@/assets/founder.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Cabo Tours & Travels" },
      {
        name: "description",
        content:
          "Cabo Tours & Travels is a Kerala-rooted travel company crafting curated international and domestic journeys. Meet the team behind every itinerary.",
      },
      { property: "og:title", content: "About — Cabo Tours & Travels" },
      {
        property: "og:description",
        content:
          "Cabo Tours & Travels is a Kerala-rooted travel company crafting curated international and domestic journeys.",
      },
      { property: "og:url", content: "https://cabotours.in/about" },
      { property: "og:image", content: "https://cabotours.in/social-preview.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About — Cabo Tours & Travels" },
      {
        name: "twitter:description",
        content:
          "Cabo Tours & Travels is a Kerala-rooted travel company crafting curated international and domestic journeys.",
      },
      { name: "twitter:image", content: "https://cabotours.in/social-preview.png" },
    ],
    links: [{ rel: "canonical", href: "https://cabotours.in/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="bg-background">
      <SiteNav transparentOnTop />
      <PageHeader
        eyebrow="About"
        title={
          <>
            Travel, the
            <br />
            way it should feel.
          </>
        }
        subtitle="Cabo Tours & Travels was built on a simple idea — a real human, a real plan, and a trip that actually feels personal."
        image={kashmirHero}
      />

      <section className="mx-auto max-w-6xl px-6 lg:px-10 py-16 grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6 text-white/75 leading-relaxed">
          <h2 className="font-display text-3xl uppercase text-white">Our story</h2>
          <p>
            Cabo began in Calicut as a small team of travellers who got tired of cookie-cutter
            tours. We started building itineraries for friends, then for their friends — slowly,
            destination by destination, until we'd covered most of South and Southeast Asia, the
            Middle East and the islands in between.
          </p>
          <p>
            Today we're a full-service travel company — flights, hotels, cruises, visas, transfers,
            group tours, honeymoons — but the soul of the company is still the same: a real person
            sitting on the other end of WhatsApp who genuinely wants your trip to be good.
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-[22px] bg-[oklch(0.2_0.01_250)] ring-1 ring-white/10 p-7 space-y-6">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-brand">Mission</div>
              <p className="mt-2 text-white/80">
                Make premium, personalised travel feel effortless — for every budget.
              </p>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-brand">Vision</div>
              <p className="mt-2 text-white/80">
                Be the most trusted travel partner across Kerala and South India by 2030.
              </p>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-brand">Values</div>
              <p className="mt-2 text-white/80">
                Honest pricing. Real humans. Beautiful trips. No drama.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-[oklch(0.16_0.01_250)] border-y border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 grid gap-12 lg:grid-cols-2 items-center">
          <div className="relative h-[420px] overflow-hidden rounded-[26px] ring-1 ring-white/10">
            <img src={founder} alt={FOUNDER} className="h-full w-full object-cover object-[center_28%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="text-[10px] tracking-[0.3em] uppercase text-white/70">Founder</div>
              <div className="font-display text-3xl uppercase">{FOUNDER}</div>
            </div>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-brand">
              A note from the founder
            </div>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95]">
              "We don't sell trips.
              <br />
              We build journeys."
            </h2>
            <p className="mt-6 text-white/75 leading-relaxed">
              I grew up travelling Kerala with my family — and somewhere between a backwater
              houseboat and a Munnar tea estate, I realised travel can be either a transaction or a
              transformation. Cabo exists to make sure it's the second one. Every itinerary that
              leaves our desk passes through me. That's the promise.
            </p>
            <a
              href={waLink(waMessages.general)}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-full bg-brand px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white"
            >
              Talk to us
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 py-20 text-center">
        <h2 className="font-display text-3xl uppercase">Ready to start planning?</h2>
        <p className="mx-auto mt-3 max-w-lg text-white/65">
          Browse our destinations or jump straight into a WhatsApp conversation with our travel
          desk.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            to="/destinations"
            className="rounded-full border border-white/30 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em]"
          >
            Browse destinations
          </Link>
          <a
            href={waLink(waMessages.custom)}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-brand px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white"
          >
            Plan on WhatsApp
          </a>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFab />
    </main>
  );
}
