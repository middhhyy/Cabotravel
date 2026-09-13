import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileCheck, FileText, Send, ShieldCheck, Clock, Globe2, ArrowRight, PlaneTakeoff, RefreshCw, CheckCircle2 } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { PageHeader } from "@/components/site/PageHeader";
import { EnquiryModal } from "@/components/site/EnquiryModal";
import { waLink, waMessages } from "@/lib/whatsapp";
import { logLead } from "@/lib/logLead";
import dubai from "@/assets/dest-dubai.webp";

export const Route = createFileRoute("/visa")({
  head: () => ({
    meta: [
      { title: "Visa Services & VISA SERVICES Assistance | Cabo Tours" },
      {
        name: "description",
        content:
          "Professional VISA SERVICES service and end-to-end visa assistance for travelers needing reliable guidance for UAE, Thailand, Bali, Schengen, and worldwide travel with Cabo Tours & Travels.",
      },
      { property: "og:title", content: "Visa Services & VISA SERVICES Assistance | Cabo Tours" },
      {
        property: "og:description",
        content:
          "Professional VISA SERVICES service and end-to-end visa assistance for travelers needing reliable guidance for UAE, Thailand, Bali, Schengen, and worldwide travel with Cabo Tours & Travels.",
      },
      { property: "og:url", content: "https://www.cabotourskerala.in/visa" },
      { property: "og:image", content: "https://www.cabotourskerala.in/social-preview.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Visa Services & VISA SERVICES Assistance | Cabo Tours" },
      {
        name: "twitter:description",
        content:
          "Professional VISA SERVICES service and end-to-end visa assistance for travelers needing reliable guidance for UAE, Thailand, Bali, Schengen, and worldwide travel.",
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
  { n: "UAE", t: "30-day tourist / VISA SERVICES", time: "3-5 days" },
  { n: "Thailand", t: "Visa on arrival", time: "On arrival" },
  { n: "Indonesia (Bali)", t: "VOA / e-Visa", time: "2-4 days" },
  { n: "Singapore", t: "e-Visa", time: "3-5 days" },
  { n: "Malaysia", t: "eNTRI / eVisa", time: "2-3 days" },
  { n: "Schengen", t: "Short stay", time: "10-15 days" },
];

function VisaPage() {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("VISA SERVICES");

  const handleOpenModal = (serviceName: string = "VISA SERVICES") => {
    setSelectedService(serviceName);
    setEnquiryModalOpen(true);
  };

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
        subtitle="From the document checklist to embassy appointments and VISA SERVICES extensions — we handle the entire visa process so you can focus on the trip."
        image={dubai}
      />

      {/* FEATURED SERVICE: VISA SERVICES */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-8">
        <div className="relative overflow-hidden rounded-[32px] border border-brand/30 bg-gradient-to-br from-[oklch(0.18_0.02_250)] via-[oklch(0.14_0.01_250)] to-background p-8 md:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-brand/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-4 py-1.5 border border-brand/30 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand">
                <RefreshCw className="h-3.5 w-3.5" />
                VISA SERVICES
              </div>
              <h2 className="font-display text-4xl sm:text-5xl uppercase leading-[0.95] text-white">
                VISA SERVICES
              </h2>
              <p className="text-base text-white/80 leading-relaxed">
                Professional visa assistance for travelers who need reliable guidance through the visa process. Perfect for same-day visa changes, extension runs, and hassle-free document verification.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left">
                  <PlaneTakeoff className="h-4 w-4 text-brand mb-1" />
                  <div className="text-xs font-semibold text-white">Express Processing</div>
                  <div className="text-[11px] text-white/60">Fast turnaround</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left">
                  <CheckCircle2 className="h-4 w-4 text-brand mb-1" />
                  <div className="text-xs font-semibold text-white">Doc Verification</div>
                  <div className="text-[11px] text-white/60">100% Error free</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left">
                  <ShieldCheck className="h-4 w-4 text-brand mb-1" />
                  <div className="text-xs font-semibold text-white">Border Compliance</div>
                  <div className="text-[11px] text-white/60">Complete support</div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleOpenModal("VISA SERVICES")}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-brand/90 hover:scale-[1.02] transition duration-300 shadow-lg"
                >
                  ENQUIRE NOW <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <a
                  href={waLink("Hello Cabo Tours & Travels, I would like to enquire about your VISA SERVICES service.")}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => logLead("VISA SERVICES Direct WA", window.location.pathname)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black transition duration-300"
                >
                  WhatsApp Consultation
                </a>
              </div>
            </div>

            <div className="md:col-span-5 hidden md:block">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black/40 p-6 space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-brand">Service Highlights</div>
                <ul className="space-y-3 text-sm text-white/80">
                  <li className="flex items-start gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-brand mt-1.5 shrink-0" />
                    Same-Day & Next-Day VISA SERVICES options
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-brand mt-1.5 shrink-0" />
                    Airport to airport & border-crossing guidance
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-brand mt-1.5 shrink-0" />
                    Dedicated visa officer for document checks
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-brand mt-1.5 shrink-0" />
                    Transparent pricing with zero hidden fees
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS STEPS */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="mb-10 text-center">
          <div className="text-[11px] tracking-[0.3em] uppercase text-brand font-semibold">Step-by-Step</div>
          <h2 className="mt-2 font-display text-3xl md:text-4xl uppercase leading-tight text-white">
            HOW OUR VISA SERVICE WORKS
          </h2>
        </div>
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

      {/* POPULAR VISAS GRID */}
      <section className="bg-[oklch(0.16_0.01_250)] border-y border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-brand font-semibold">Popular Visas</div>
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
                onClick={() => handleOpenModal(`Visa for ${c.n}`)}
                className="group cursor-pointer rounded-2xl border border-white/10 bg-background p-5 flex items-center gap-4 hover:border-brand/50 transition-all duration-300"
              >
                <Globe2 className="h-5 w-5 text-brand shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex-1 min-w-0">
                  <div className="font-display text-lg uppercase group-hover:text-brand transition-colors">{c.n}</div>
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

      {/* BOTTOM CTA */}
      <section className="mx-auto max-w-5xl px-6 lg:px-10 py-20 text-center">
        <h2 className="font-display text-4xl uppercase leading-[0.95]">Start your visa today.</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/65">
          Tell us your travel details or submit an enquiry — our visa specialists will get back to you with exact requirements and timelines.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => handleOpenModal("Visa Assistance")}
            className="inline-flex rounded-full bg-brand px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-brand/90 transition-colors shadow-lg"
          >
            Enquire Now
          </button>
          <a
            href={waLink(waMessages.visa)}
            target="_blank"
            rel="noreferrer"
            onClick={() => logLead("visa", window.location.pathname)}
            className="inline-flex rounded-full border border-white/30 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black transition-colors"
          >
            Start visa on WhatsApp
          </a>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFab />

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultService={selectedService}
        sourcePage="Visa Page"
        title={selectedService === "VISA SERVICES" ? "VISA SERVICES ASSISTANCE" : "VISA SERVICE ENQUIRY"}
        subtitle="Submit your details for expert visa guidance and processing."
      />
    </main>
  );
}
