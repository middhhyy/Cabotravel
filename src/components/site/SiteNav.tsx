import { Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { waLink, waMessages } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { motion, AnimatePresence } from "framer-motion";
import { BUSINESS_INFO } from "@/lib/business";

const items = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/packages", label: "Packages" },
  { to: "/cabs", label: "Cab Services" },
  { to: "/visa", label: "Visa" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function DrawerLogger() {
  useEffect(() => {
    const log = "[NAV] Drawer rendered";
    console.log(log);
    (window as any).__addNavLog?.(log);
    return () => {
      const logUnmount = "[NAV] Drawer unmounted";
      console.log(logUnmount);
      (window as any).__addNavLog?.(logUnmount);
    };
  }, []);
  return null;
}

export function SiteNav({ transparentOnTop = false }: { transparentOnTop?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const log = "[NAV] MOUNTED (SiteNav)";
    console.log(log);
    (window as any).__addNavLog?.(log);
    return () => {
      const logUnmount = "[NAV] UNMOUNTED (SiteNav)";
      console.log(logUnmount);
      (window as any).__addNavLog?.(logUnmount);
    };
  }, []);

  useEffect(() => {
    const log = `[NAV] open changed: ${open}`;
    console.log(log);
    (window as any).__addNavLog?.(log);
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      const log = `[NAV] Scroll event ${window.scrollY}`;
      console.log(log);
      (window as any).__addNavLog?.(log);
      setScrolled(window.scrollY > 30);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const preventDefault = (e: TouchEvent | WheelEvent) => {
      const drawer = drawerRef.current;
      if (drawer && drawer.contains(e.target as Node)) {
        return; // Allow scrolling inside the drawer
      }
      e.preventDefault();
    };

    document.addEventListener("touchmove", preventDefault, { passive: false });
    document.addEventListener("wheel", preventDefault, { passive: false });

    // Restore focus on close if we can
    const lastActive = document.activeElement as HTMLElement;

    return () => {
      document.removeEventListener("touchmove", preventDefault);
      document.removeEventListener("wheel", preventDefault);
      if (lastActive) {
        lastActive.focus();
      }
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
            onPointerDown={() => {
              const log = "[NAV] pointerdown";
              console.log(log);
              (window as any).__addNavLog?.(log);
            }}
            onTouchStart={() => {
              const log = "[NAV] touchstart";
              console.log(log);
              (window as any).__addNavLog?.(log);
            }}
            onClick={() => {
              const logText = `[NAV] Hamburger clicked scrollY:${window.scrollY} open:${open} time:${performance.now().toFixed(1)}`;
              console.log(logText);
              (window as any).__addNavLog?.(logText);
              
              const logSet = "[NAV] setOpen(true)";
              console.log(logSet);
              (window as any).__addNavLog?.(logSet);

              setOpen(true);
            }}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <DrawerLogger />
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => {
                const log = "[NAV] Backdrop clicked";
                console.log(log);
                (window as any).__addNavLog?.(log);
                setOpen(false);
              }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[6px] lg:hidden"
            />
            {/* Drawer Panel */}
            <motion.div
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[80vw] max-w-[300px] bg-background border-l border-white/10 shadow-2xl flex flex-col lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <Link
                  to="/"
                  aria-label="Cabo Tours & Travels Home"
                  onClick={() => {
                    console.log("[SiteNav] Logo in drawer clicked, calling setOpen(false)");
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <BrandLogo />
                </Link>
                <button
                  aria-label="Close navigation menu"
                  type="button"
                  onClick={() => {
                    const log = "[NAV] Close button clicked";
                    console.log(log);
                    (window as any).__addNavLog?.(log);
                    setOpen(false);
                  }}
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <X className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
                </button>
              </div>
              <nav className="flex flex-col gap-4 p-6 flex-1 overflow-y-auto scrollbar-none" aria-label="Mobile Navigation">
                {items.map((i) => (
                  <Link
                    key={i.to}
                    to={i.to}
                    onClick={() => setOpen(false)}
                    className="font-display text-2xl uppercase tracking-[0.05em] py-4 px-4 border-b border-white/5 border-l-4 border-l-transparent text-white/80 transition-all duration-200 rounded-r-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    activeProps={{ className: "active border-l-brand bg-white/[0.03] text-brand font-bold" }}
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
    </header>
  );
}
