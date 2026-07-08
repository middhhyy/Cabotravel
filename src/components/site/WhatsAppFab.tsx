import { MessageCircle } from "lucide-react";
import { waLink, waMessages } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function WhatsAppFab() {
  return (
    <a
      href={waLink(waMessages.general)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={() => trackEvent("whatsapp_click", "engagement", "WhatsApp FAB")}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-[oklch(0.74_0.18_145)] pl-4 pr-5 py-3 text-white shadow-[0_18px_44px_-12px_rgba(0,200,80,0.55)] transition hover:scale-105"
      style={{
        bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
        right: "calc(1.25rem + env(safe-area-inset-right, 0px))"
      }}
    >
      <span className="relative grid h-7 w-7 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
        <MessageCircle className="h-5 w-5 relative" strokeWidth={2.2} />
      </span>
      <span className="hidden sm:inline text-[11px] font-semibold uppercase tracking-[0.22em]">
        Chat with us
      </span>
    </a>
  );
}
