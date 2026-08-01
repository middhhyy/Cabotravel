import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";

const Instagram = (p: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={p.className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const Facebook = (p: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={p.className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
import { BrandLogo } from "./BrandLogo";
import { waLink, waMessages, PHONE_DISPLAY } from "@/lib/whatsapp";
import { BUSINESS_INFO } from "@/lib/business";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-[oklch(0.13_0.01_250)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-8 lg:py-20">
        <div className="grid grid-cols-2 gap-x-12 gap-y-6 lg:gap-y-16 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-5">
            <div className="scale-90 lg:scale-100 origin-left">
              <BrandLogo size="lg" loading="lazy" />
            </div>
            <p className="mt-4 lg:mt-6 max-w-sm text-xs lg:text-sm leading-relaxed text-white/80">
              A travel company crafting curated journeys across the world — from Kerala's backwaters
              to Maldivian atolls. International & Domestic tours, flights, hotels, visas and
              bespoke experiences.
            </p>
            <a
              href={waLink(waMessages.general)}
              target="_blank"
              rel="noreferrer"
              className="relative mt-5 lg:mt-7 inline-flex items-center gap-2.5 lg:gap-3 rounded-full bg-brand px-5 py-2.5 lg:px-6 lg:py-3 text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.22em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background after:absolute after:-inset-y-1 after:inset-x-0 lg:after:inset-0"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" /> Book on WhatsApp
            </a>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <div className="text-[9px] lg:text-[10px] uppercase tracking-[0.3em] text-white/70 mb-2 lg:mb-4">Explore</div>
            <ul className="space-y-1.5 lg:space-y-3.5 text-xs lg:text-sm text-white/70">
              <li>
                <Link
                  to="/destinations"
                  className="hover:text-brand rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand relative block py-1 lg:py-0 lg:inline after:absolute after:-inset-y-2.5 after:inset-x-0 lg:after:inset-0"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="hover:text-brand rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand relative block py-1 lg:py-0 lg:inline after:absolute after:-inset-y-2.5 after:inset-x-0 lg:after:inset-0"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/cabs"
                  className="hover:text-brand rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand relative block py-1 lg:py-0 lg:inline after:absolute after:-inset-y-2.5 after:inset-x-0 lg:after:inset-0"
                >
                  Cab Services
                </Link>
              </li>
              <li>
                <Link
                  to="/visa"
                  className="hover:text-brand rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand relative block py-1 lg:py-0 lg:inline after:absolute after:-inset-y-2.5 after:inset-x-0 lg:after:inset-0"
                >
                  Visa Help
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-brand rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand relative block py-1 lg:py-0 lg:inline after:absolute after:-inset-y-2.5 after:inset-x-0 lg:after:inset-0"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-brand rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand relative block py-1 lg:py-0 lg:inline after:absolute after:-inset-y-2.5 after:inset-x-0 lg:after:inset-0"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <div className="text-[9px] lg:text-[10px] uppercase tracking-[0.3em] text-white/70 mb-2 lg:mb-4">
              Services
            </div>
            <ul className="space-y-1.5 lg:space-y-3.5 text-xs lg:text-sm text-white/70">
              <li>
                <a
                  href="https://wa.me/917736406630?text=Hi%2C%20I%27m%20interested%20in%20booking%20flight%20tickets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand relative block py-1 lg:py-0 lg:inline after:absolute after:-inset-y-2.5 after:inset-x-0 lg:after:inset-0"
                >
                  Flight Booking
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/917736406630?text=Hi%2C%20I%27m%20interested%20in%20booking%20hotels"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand relative block py-1 lg:py-0 lg:inline after:absolute after:-inset-y-2.5 after:inset-x-0 lg:after:inset-0"
                >
                  Hotel Booking
                </a>
              </li>
              <li>Cruise Booking</li>
              <li>Bus & Train Tickets</li>
              <li>Taxi & Transfers</li>
              <li>Group Tours</li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-3">
            <div className="text-[9px] lg:text-[10px] uppercase tracking-[0.3em] text-white/70 mb-2 lg:mb-4">Contact</div>
            <ul className="space-y-1.5 lg:space-y-4 text-xs lg:text-sm text-white/75">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-3.5 w-3.5 lg:h-4 lg:w-4 shrink-0 text-brand" aria-hidden="true" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-3.5 w-3.5 lg:h-4 lg:w-4 shrink-0 text-brand" aria-hidden="true" />
                <span>{BUSINESS_INFO.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-3.5 w-3.5 lg:h-4 lg:w-4 shrink-0 text-brand" aria-hidden="true" />
                <a
                  href={BUSINESS_INFO.maps.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand transition-colors relative block py-1 lg:py-0 lg:inline after:absolute after:-inset-y-2.5 after:inset-x-0 lg:after:inset-0"
                >
                  {BUSINESS_INFO.maps.displayAddress}
                </a>
              </li>
            </ul>
            <div className="mt-5 lg:mt-7 flex gap-2.5 lg:gap-3">
              <a
                href={BUSINESS_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Profile"
                className="relative grid h-8 w-8 lg:h-9 lg:w-9 place-items-center rounded-full border border-white/15 text-white/80 hover:bg-brand hover:border-brand hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background after:absolute after:-inset-2 lg:after:inset-0"
              >
                <Instagram className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
              </a>
              <a
                href={BUSINESS_INFO.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Page"
                className="relative grid h-8 w-8 lg:h-9 lg:w-9 place-items-center rounded-full border border-white/15 text-white/80 hover:bg-brand hover:border-brand hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background after:absolute after:-inset-2 lg:after:inset-0"
              >
                <Facebook className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[10px] lg:text-[11px] tracking-[0.18em] uppercase text-white/60">
          <div>© {new Date().getFullYear()} Cabo Tours & Travels</div>
          <div className="text-[13px] lg:text-[15px] normal-case tracking-normal" style={{ fontFamily: "'Lobster', cursive" }}>
            <a
              href="https://verdestudios.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors relative inline-block py-1 lg:py-0 after:absolute after:-inset-y-2.5 after:inset-x-0 lg:after:inset-0"
            >
              Powered by Verde Studios
            </a>
          </div>
          <div>Crafted journeys. Honest pricing. Real humans.</div>
        </div>
      </div>
    </footer>
  );
}
