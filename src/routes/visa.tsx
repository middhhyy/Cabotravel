import { createFileRoute } from "@tanstack/react-router";
import { FileCheck, FileText, Send, ShieldCheck, Clock, Globe2 } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { PageHeader } from "@/components/site/PageHeader";
import { waLink, waMessages } from "@/lib/whatsapp";
import dubai from "@/assets/dest-dubai.webp";

export const Route = createFileRoute("/visa")({
  head: () => ({
    meta: [
      { title: "Visa Assistance & Processing Services | Cabo Tours" },
      {
        name: "description",
        content:
          "Get end-to-end visa assistance and document processing services for UAE, Thailand, Bali, Schengen, and more with the experts at Cabo Tours & Travels.",
      },
      { property: "og:title", content: "Visa Assistance & Processing Services | Cabo Tours" },
      {
        property: "og:description",
        content:
          "Get end-to-end visa assistance and document processing services for UAE, Thailand, Bali, Schengen, and more with the experts at Cabo Tours & Travels.",
      },
      { property: "og:url", content: "https://www.cabotourskerala.in/visa" },
      { property: "og:image", content: "https://www.cabotourskerala.in/social-preview.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Visa Assistance & Processing Services | Cabo Tours" },
      {
        name: "twitter:description",
        content:
          "Get end-to-end visa assistance and document processing services for UAE, Thailand, Bali, Schengen, and more with the experts at Cabo Tours & Travels.",
      },
      { name: "twitter:image", content: "https://www.cabotourskerala.in/social-preview.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.cabotourskerala.in/visa" }],
  }),
  component: VisaPage,
});

const STEPS = [
  {
    i: FileText,
    t: "Free Consultation",
    d: "Tell us your destination and travel dates. We confirm visa type, fees and processing time.",
  },
  {
    i: FileCheck,
    t: "Documentation",
    d: "We share a checklist tailored to you. Drop documents on WhatsApp — we verify everything.",
  },
  {
    i: Send,
    t: "Application",
    d: "We submit, schedule biometrics if needed, and track the application end-to-end.",
  },
  {
    i: ShieldCheck,
    t: "Approval & Travel",
    d: "Visa in hand, itinerary in your inbox. You travel — we stay on standby.",
  },
];

const COUNTRIES = [
  { n: "UAE", t: "30-day tourist", time: "3-5 days" },
  { n: "Thailand", t: "Visa on arrival", time: "On arrival" },
  { n: "Indonesia (Bali)", t: "VOA / e-Visa", time: "2-4 days" },
  { n: "Singapore", t: "e-Visa", time: "3-5 days" },
  { n: "Malaysia", t: "eNTRI / eVisa", time: "2-3 days" },
  { n: "Schengen", t: "Short stay", time: "10-15 days" },
];

function VisaPage() {
  return (
    <main className="bg-background">
      <SiteNav transparentOnTop />
      <PageHeader
        eyebrow="Visa assistance"
        title={
          <>
            Visas, without
            <br />
            the paperwork drama.
          </>
        }
        subtitle="From the document checklist to the embassy appointment — we handle the entire visa process so you can focus on the trip."
        image={dubai}
      />

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div
              key={s.t}
              className="relative rounded-[22px] bg-[oklch(0.2_0.01_250)] ring-1 ring-white/10 p-7"
            >
              <div className="absolute -top-3 -left-3 grid h-9 w-9 place-items-center rounded-full bg-brand font-display text-sm text-white">
                {i + 1}
              </div>
              <s.i className="h-6 w-6 text-brand" />
              <div className="mt-4 font-display text-lg uppercase">{s.t}</div>
              <p className="mt-2 text-sm text-white/65">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[oklch(0.16_0.01_250)] border-y border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-brand">Popular Visas</div>
              <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95]">
                Where you'd
                <br />
                like to land.
              </h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COUNTRIES.map((c) => (
              <div
                key={c.n}
                className="rounded-2xl border border-white/10 bg-background p-5 flex items-center gap-4"
              >
                <Globe2 className="h-5 w-5 text-brand shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-display text-lg uppercase">{c.n}</div>
                  <div className="text-xs text-white/55">{c.t}</div>
                </div>
                <div className="text-right text-xs text-white/60 flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> {c.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 lg:px-10 py-20 text-center">
        <h2 className="font-display text-4xl uppercase leading-[0.95]">Start your visa today.</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/65">
          Ping us on WhatsApp with your destination and travel dates — we'll send back the checklist
          and quote within the hour.
        </p>
        <a
          href={waLink(waMessages.visa)}
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex rounded-full bg-brand px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white"
        >
          Start visa on WhatsApp
        </a>
      </section>

      <SiteFooter />
      <WhatsAppFab />
    </main>
  );
}
