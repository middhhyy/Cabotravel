import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ArrowRight, Loader2, MessageSquare } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { trackEvent } from "@/lib/analytics";
import { waLink, buildEnquiryWaMessage } from "@/lib/whatsapp";

const SERVICE_OPTIONS = [
  "Kerala Tour Package",
  "VISA SERVICES",
  "Munnar",
  "Alleppey",
  "Thekkady",
  "Varkala",
  "Kovalam",
  "Kashmir",
  "Dubai",
  "Maldives",
  "Bali",
  "Thailand",
  "Vietnam",
  "Flight Booking",
  "Cab Services",
  "Other / Custom Trip",
];

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDestination?: string;
  defaultService?: string;
  sourcePage?: string;
  title?: string;
  subtitle?: string;
}

export function EnquiryModal({
  isOpen,
  onClose,
  defaultDestination,
  defaultService,
  sourcePage,
  title = "PLAN YOUR JOURNEY",
  subtitle = "Tell us your travel requirements and our team will get back to you with custom itineraries.",
}: EnquiryModalProps) {
  const initialService = defaultService || defaultDestination || "Kerala Tour Package";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(initialService);
  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string; service?: string }>({});

  useEffect(() => {
    if (isOpen) {
      setService(defaultService || defaultDestination || "Kerala Tour Package");
    }
  }, [isOpen, defaultService, defaultDestination]);

  const validate = () => {
    const errs: typeof errors = {};
    if (!name.trim()) {
      errs.name = "Full Name is required";
    }
    if (!phone.trim()) {
      errs.phone = "Phone / WhatsApp Number is required";
    } else if (!/^[0-9+ \-()]{8,15}$/.test(phone.trim())) {
      errs.phone = "Enter a valid phone number (8-15 digits)";
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Enter a valid email address";
    }
    if (!service) {
      errs.service = "Service / Enquiry Type is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const activeSource = sourcePage || `Website Enquiry (${window.location.pathname})`;

      const notesParts = [
        email.trim() ? `Email: ${email.trim()}` : "",
        travelDate ? `Travel Date: ${travelDate}` : "",
        travelers ? `Travelers: ${travelers}` : "",
        message.trim() ? `Message: ${message.trim()}` : "",
      ].filter(Boolean);

      const notesContent = notesParts.join(" | ");

      // 1. Save lead to Supabase CRM (matching exact table schema)
      const { error } = await supabase.from("leads").insert({
        name: name.trim(),
        phone: phone.trim(),
        interest: service,
        source: activeSource,
        status: "new",
        notes: notesContent || undefined,
      });

      if (error) {
        console.error("Supabase insert error details:", error);
        throw error;
      }

      trackEvent("enquiry_submit", "lead", service);
      setSubmitted(true);

      // 2. Redirect to WhatsApp with pre-filled enquiry message
      const waMsg = buildEnquiryWaMessage({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        service: service,
        travelDate: travelDate || undefined,
        travelers: travelers || undefined,
        message: message.trim() || undefined,
      });

      const waUrl = waLink(waMsg);
      setTimeout(() => {
        window.open(waUrl, "_blank");
      }, 400);

    } catch (err: any) {
      console.error("Enquiry submission error:", err);
      setErrorMsg("Unable to submit your enquiry. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    onClose();
    setTimeout(() => {
      setName("");
      setPhone("");
      setEmail("");
      setService(initialService);
      setTravelDate("");
      setTravelers("2");
      setMessage("");
      setSubmitted(false);
      setErrorMsg("");
      setErrors({});
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleResetAndClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[24px] border border-white/10 bg-[oklch(0.14_0.01_250)] p-6 sm:p-8 shadow-2xl scrollbar-none"
              role="dialog"
              aria-modal="true"
              aria-labelledby="enquiry-modal-title"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleResetAndClose}
                aria-label="Close enquiry modal"
                className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <X className="h-4 w-4" />
              </button>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/20 text-brand border border-brand/30">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-2xl uppercase text-white tracking-wide">
                    Enquiry Submitted!
                  </h3>
                  <p className="text-sm text-white/75 leading-relaxed max-w-sm mx-auto">
                    Your enquiry has been successfully recorded in our CRM and we are opening WhatsApp to connect you directly with our travel expert.
                  </p>
                  <div className="pt-4 flex flex-col gap-3 items-center">
                    <a
                      href={waLink(
                        buildEnquiryWaMessage({
                          name: name.trim(),
                          phone: phone.trim(),
                          email: email.trim() || undefined,
                          service: service,
                          travelDate: travelDate || undefined,
                          travelers: travelers || undefined,
                          message: message.trim() || undefined,
                        })
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-brand/90 transition-colors"
                    >
                      <MessageSquare className="h-4 w-4" /> Continue on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={handleResetAndClose}
                      className="text-xs text-white/50 hover:text-white underline transition-colors"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-6 pr-6">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-brand font-semibold mb-1">
                      Cabo Tours & Travels
                    </div>
                    <h2
                      id="enquiry-modal-title"
                      className="font-display text-2xl sm:text-3xl uppercase leading-none text-white"
                    >
                      {title}
                    </h2>
                    <p className="mt-2 text-xs text-white/70 leading-relaxed">
                      {subtitle}
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="enquiry-name" className="block text-[10px] uppercase tracking-wider text-white/70 mb-1 font-semibold">
                        Full Name <span className="text-brand">*</span>
                      </label>
                      <input
                        id="enquiry-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                      {errors.name && (
                        <p className="mt-1 text-[11px] text-red-400">{errors.name}</p>
                      )}
                    </div>

                    {/* Phone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="enquiry-phone" className="block text-[10px] uppercase tracking-wider text-white/70 mb-1 font-semibold">
                          Phone / WhatsApp <span className="text-brand">*</span>
                        </label>
                        <input
                          id="enquiry-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-[11px] text-red-400">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="enquiry-email" className="block text-[10px] uppercase tracking-wider text-white/70 mb-1 font-semibold">
                          Email Address
                        </label>
                        <input
                          id="enquiry-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="rahul@example.com"
                          className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                        {errors.email && (
                          <p className="mt-1 text-[11px] text-red-400">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Service / Enquiry Type */}
                    <div>
                      <label htmlFor="enquiry-service" className="block text-[10px] uppercase tracking-wider text-white/70 mb-1 font-semibold">
                        Service / Enquiry Type <span className="text-brand">*</span>
                      </label>
                      <select
                        id="enquiry-service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-[oklch(0.18_0.01_250)] px-4 py-2.5 text-sm text-white focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[oklch(0.18_0.01_250)] text-white">
                            {opt}
                          </option>
                        ))}
                        {!SERVICE_OPTIONS.includes(service) && (
                          <option value={service} className="bg-[oklch(0.18_0.01_250)] text-white">
                            {service}
                          </option>
                        )}
                      </select>
                      {errors.service && (
                        <p className="mt-1 text-[11px] text-red-400">{errors.service}</p>
                      )}
                    </div>

                    {/* Travel Date & Travelers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="enquiry-date" className="block text-[10px] uppercase tracking-wider text-white/70 mb-1 font-semibold">
                          Travel Date
                        </label>
                        <input
                          id="enquiry-date"
                          type="date"
                          value={travelDate}
                          onChange={(e) => setTravelDate(e.target.value)}
                          className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand [color-scheme:dark]"
                        />
                      </div>

                      <div>
                        <label htmlFor="enquiry-travelers" className="block text-[10px] uppercase tracking-wider text-white/70 mb-1 font-semibold">
                          No. of Travelers
                        </label>
                        <input
                          id="enquiry-travelers"
                          type="number"
                          min="1"
                          max="100"
                          value={travelers}
                          onChange={(e) => setTravelers(e.target.value)}
                          className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                      </div>
                    </div>

                    {/* Message / Special Requirements */}
                    <div>
                      <label htmlFor="enquiry-message" className="block text-[10px] uppercase tracking-wider text-white/70 mb-1 font-semibold">
                        Message / Travel Notes
                      </label>
                      <textarea
                        id="enquiry-message"
                        rows={2}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Any specific preferences or questions..."
                        className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-brand/90 transition-colors disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" /> SAVING ENQUIRY...
                          </>
                        ) : (
                          <>
                            SUBMIT ENQUIRY <ArrowRight className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
