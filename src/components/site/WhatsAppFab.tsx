import { useState } from "react";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { waLink, waMessages, PHONE_DISPLAY } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { logLead } from "@/lib/logLead";
import { EnquiryModal } from "./EnquiryModal";

export function WhatsAppFab() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <>
      <div
        className="fixed left-3 sm:left-5 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3.5 items-center"
        aria-label="Floating contact options"
      >
        {/* 1. CALL BUTTON */}
        <div className="group relative flex items-center">
          <a
            href="tel:+917736406630"
            aria-label="Call Cabo Tours"
            onClick={() => {
              trackEvent("phone_click", "engagement", "Floating Call FAB");
              logLead("call", window.location.pathname);
            }}
            className="grid h-11 w-11 sm:h-13 sm:w-13 place-items-center rounded-full bg-brand text-white shadow-[0_8px_24px_-4px_rgba(67,168,232,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Phone className="h-5 w-5 sm:h-5 sm:w-5" strokeWidth={2.2} />
          </a>
          <span className="pointer-events-none absolute left-full ml-3 hidden sm:group-hover:inline-block whitespace-nowrap rounded-md bg-black/85 backdrop-blur border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-md">
            Call Us ({PHONE_DISPLAY})
          </span>
        </div>

        {/* 2. WHATSAPP BUTTON */}
        <div className="group relative flex items-center">
          <a
            href={waLink(waMessages.general)}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat with Cabo Tours on WhatsApp"
            onClick={() => {
              trackEvent("whatsapp_click", "engagement", "Floating WhatsApp FAB");
              logLead("general", window.location.pathname);
            }}
            className="grid h-11 w-11 sm:h-13 sm:w-13 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_-4px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
          >
            <MessageCircle className="h-5 w-5 sm:h-5 sm:w-5" strokeWidth={2.2} />
          </a>
          <span className="pointer-events-none absolute left-full ml-3 hidden sm:group-hover:inline-block whitespace-nowrap rounded-md bg-black/85 backdrop-blur border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-md">
            WhatsApp Chat
          </span>
        </div>

        {/* 3. ENQUIRY BUTTON */}
        <div className="group relative flex items-center">
          <button
            type="button"
            aria-label="Open Enquiry Form"
            onClick={() => {
              trackEvent("enquiry_modal_open", "engagement", "Floating Enquiry FAB");
              setEnquiryOpen(true);
            }}
            className="grid h-11 w-11 sm:h-13 sm:w-13 place-items-center rounded-full bg-brand text-white shadow-[0_8px_24px_-4px_rgba(67,168,232,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <FileText className="h-5 w-5 sm:h-5 sm:w-5" strokeWidth={2.2} />
          </button>
          <span className="pointer-events-none absolute left-full ml-3 hidden sm:group-hover:inline-block whitespace-nowrap rounded-md bg-black/85 backdrop-blur border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-md">
            Enquire Now
          </span>
        </div>
      </div>

      {/* Global Enquiry Modal Overlay */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />
    </>
  );
}
