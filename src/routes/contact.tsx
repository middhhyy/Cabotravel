import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { PageHeader } from "@/components/site/PageHeader";
import { waLink, waMessages, PHONE_DISPLAY } from "@/lib/whatsapp";
import maldives from "@/assets/dest-maldives.webp";
import { trackEvent } from "@/lib/analytics";
import { BUSINESS_INFO } from "@/lib/business";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Cabo Tours & Travels — Calicut Travel Agent" },
      {
        name: "description",
        content:
          "Get in touch with Cabo Tours & Travels in Calicut, Kerala. Call or WhatsApp us at +91 77364 06630 to start customizing your custom trip packages today!",
      },
      { property: "og:title", content: "Contact Us | Cabo Tours & Travels — Calicut Travel Agent" },
      {
        property: "og:description",
        content:
          "Get in touch with Cabo Tours & Travels in Calicut, Kerala. Call or WhatsApp us to customize your trip.",
      },
      { property: "og:url", content: "https://cabotourskerala.in/contact" },
      { property: "og:image", content: "https://cabotourskerala.in/social-preview.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact Us | Cabo Tours & Travels — Calicut Travel Agent" },
      {
        name: "twitter:description",
        content:
          "Get in touch with Cabo Tours & Travels in Calicut, Kerala. Call or WhatsApp us to customize your trip.",
      },
      { name: "twitter:image", content: "https://cabotourskerala.in/social-preview.png" },
    ],
    links: [{ rel: "canonical", href: "https://cabotourskerala.in/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    destination: "",
    dates: "",
    travellers: "",
    notes: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    trackEvent("contact_form_submit", "lead", form.destination || "General");
    const msg = [
      `Hello Cabo Tours & Travels — trip inquiry from ${form.name || "a guest"}.`,
      form.destination && `Destination: ${form.destination}`,
      form.dates && `Dates: ${form.dates}`,
      form.travellers && `Travellers: ${form.travellers}`,
      form.phone && `Phone: ${form.phone}`,
      form.notes && `Notes: ${form.notes}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(msg), "_blank");
    setSent(true);
  }

  return (
    <main className="bg-background">
      <SiteNav transparentOnTop />
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let's plan
            <br />
            something good.
          </>
        }
        subtitle="Talk to our travel desk on WhatsApp, drop us a trip brief, or just say hi."
        image={maldives}
      />

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24 grid gap-10 lg:grid-cols-12">
        {/* Form */}
        <div className="lg:col-span-7">
          <div className="rounded-[26px] bg-[oklch(0.2_0.01_250)] ring-1 ring-white/10 p-8 lg:p-10">
            <h2 className="font-display text-2xl uppercase">Trip Inquiry</h2>
            <p className="mt-2 text-sm text-white/60">
              Submitting opens WhatsApp with your details pre-filled.
            </p>
            <form onSubmit={submit} className="mt-7 grid gap-4 sm:grid-cols-2">
              <Field
                label="Your name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                required
              />
              <Field
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                required
              />
              <Field
                label="Destination"
                value={form.destination}
                onChange={(v) => setForm({ ...form, destination: v })}
                placeholder="e.g. Bali, Maldives"
              />
              <Field
                label="Travel dates"
                value={form.dates}
                onChange={(v) => setForm({ ...form, dates: v })}
                placeholder="Feb 2027 — flexible"
              />
              <Field
                label="Travellers"
                value={form.travellers}
                onChange={(v) => setForm({ ...form, travellers: v })}
                placeholder="2 adults"
              />
              <div className="sm:col-span-2">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-white/55 mb-2">
                  Notes
                </label>
                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Honeymoon? Family with kids? Tell us anything that helps."
                  className="w-full rounded-2xl border border-white/15 bg-background px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-brand"
                />
              </div>
              <div className="sm:col-span-2 flex flex-wrap items-center gap-3 mt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white"
                >
                  <Send className="h-3.5 w-3.5" /> Send on WhatsApp
                </button>
                <a
                  href={waLink(waMessages.general)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("whatsapp_click", "engagement", "Contact Just Chat")}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Just chat
                </a>
                {sent && <span className="text-xs text-brand">Opened WhatsApp ✓</span>}
              </div>
            </form>
          </div>
        </div>

        {/* Aside */}
        <aside className="lg:col-span-5 space-y-6">
          <InfoCard
            icon={Phone}
            label="WhatsApp / Call"
            value={BUSINESS_INFO.phoneDisplay}
            href={waLink(waMessages.general)}
          />
          <InfoCard
            icon={Mail}
            label="Email"
            value={BUSINESS_INFO.email}
            href={`mailto:${BUSINESS_INFO.email}`}
          />
          <InfoCard icon={MapPin} label="Founder" value={BUSINESS_INFO.founder} />
          <InfoCard icon={MapPin} label="Based in" value={BUSINESS_INFO.maps.displayAddress} />
          <div className="overflow-hidden rounded-[22px] ring-1 ring-white/10 h-64">
            <iframe
              title="Cabo Tours map"
              src={BUSINESS_INFO.maps.embedUrl}
              className="h-full w-full"
              loading="eager"
            />
          </div>
        </aside>
      </section>

      <SiteFooter />
      <WhatsAppFab />
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.3em] text-white/55 mb-2">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/15 bg-background px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-brand"
      />
    </div>
  );
}

function InfoCard({
  icon: I,
  label,
  value,
  href,
}: {
  icon: any;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[oklch(0.2_0.01_250)] p-5">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-brand/15 text-brand">
        <I className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] tracking-[0.3em] uppercase text-white/45">{label}</div>
        <div className="mt-0.5 font-medium truncate">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="block hover:ring-1 hover:ring-brand/40 rounded-2xl transition"
    >
      {inner}
    </a>
  ) : (
    inner
  );
}
