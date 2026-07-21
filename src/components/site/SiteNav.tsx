import { Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { waLink, waMessages } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

const items = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/packages", label: "Packages" },
  { to: "/cabs", label: "Cab Services" },
  { to: "/visa", label: "Visa" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function SiteNav({ transparentOnTop = false }: { transparentOnTop?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      lastActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (lastActiveElement.current) {
        lastActiveElement.current.focus();
        lastActiveElement.current = null;
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const solid = !transparentOnTop || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        solid ? "bg-background/85 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 lg:px-10 py-4">
        <Link
          to="/"
          aria-label="Cabo Tours & Travels Home"
          className="shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <BrandLogo />
        </Link>
        <nav
          className="hidden lg:flex items-center gap-8 text-[11px] tracking-[0.22em] text-white/85"
          aria-label="Main Navigation"
        >
          {items.map((i) => (
            <Link
              key={i.to}
              to={i.to}
              className="uppercase relative py-1 transition hover:text-white [&.active]:text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              activeProps={{ className: "active" }}
              activeOptions={{ exact: i.to === "/" }}
            >
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={waLink(waMessages.general)}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("whatsapp_click", "engagement", "SiteNav Desktop CTA")}
            className="hidden md:inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_8px_24px_-8px_rgba(67,168,232,0.7)] transition hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Book on WhatsApp
          </a>
          <button
            aria-label="Open navigation menu"
            type="button"
            aria-haspopup="true"
            aria-expanded={open}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(true);
            }}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl lg:hidden touch-none"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <BrandLogo />
            <button
              aria-label="Close navigation menu"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen(false);
              }}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 p-6" aria-label="Mobile Navigation">
            {items.map((i) => (
              <Link
                key={i.to}
                to={i.to}
                onClick={() => setOpen(false)}
                className="font-display text-2xl uppercase tracking-[0.05em] text-white/90 py-3 border-b border-white/5 [&.active]:text-brand rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                activeProps={{ className: "active" }}
                activeOptions={{ exact: i.to === "/" }}
              >
                {i.label}
              </Link>
            ))}
            <a
              href={waLink(waMessages.general)}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("whatsapp_click", "engagement", "SiteNav Mobile CTA")}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              Book on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
