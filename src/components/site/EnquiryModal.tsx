import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { trackEvent } from "@/lib/analytics";

const DESTINATION_OPTIONS = [
  "Munnar",
  "Alleppey",
  "Thekkady",
  "Varkala",
  "Kovalam",
  "Kanyakumari",
  "Madurai",
  "Rameswaram",
  "Kannur",
  "Kashmir",
  "Dubai",
  "Maldives",
  "Bali",
  "Thailand",
  "Vietnam",
  "Other / Custom Trip",
];

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDestination?: string;
}

export function EnquiryModal({ isOpen, onClose, defaultDestination }: EnquiryModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState(defaultDestination || "Munnar");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [errors, setErrors] = useState<{ name?: string; phone?: string; destination?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!name.trim()) {
      errs.name = "Full Name is required";
    }
    if (!phone.trim()) {
      errs.phone = "Phone Number is required";
    } else if (!/^[0-9+ \-()]{8,15}$/.test(phone.trim())) {
      errs.phone = "Enter a valid phone number";
    }
    if (!destination) {
      errs.destination = "Destination is required";
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
      const { error } = await supabase.from("leads").insert({
        name: name.trim(),
        phone: phone.trim(),
        interest: destination,
        source: `Website Enquiry (${window.location.pathname})`,
        status: "new",
      });

      if (error) throw error;

      trackEvent("enquiry_submit", "lead", destination);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Enquiry submission error:", err);
      setErrorMsg("Unable to submit your enquiry. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    onClose();
    setTimeout(() => {
      setName("");
      setPhone("");
      setDestination(defaultDestination || "Munnar");
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
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-lg overflow-hidden rounded-[24px] border border-white/10 bg-[oklch(0.14_0.01_250)] p-6 sm:p-8 shadow-2xl"
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
                    Enquiry Received
                  </h3>
                  <p className="text-sm text-white/75 leading-relaxed max-w-sm mx-auto">
                    Thank you! Your enquiry has been received. Our travel team will contact you shortly.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleResetAndClose}
                      className="rounded-full bg-brand px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-brand/90 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-brand font-semibold mb-1">
                      Start Planning
                    </div>
                    <h2
                      id="enquiry-modal-title"
                      className="font-display text-3xl uppercase leading-none text-white"
                    >
                      PLAN YOUR JOURNEY.
                    </h2>
                    <p className="mt-2 text-xs text-white/70 leading-relaxed">
                      Tell us where you want to go and our travel team will get back to you with custom itineraries.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
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
                        className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/30 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                      {errors.name && (
                        <p className="mt-1 text-[11px] text-red-400">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="enquiry-phone" className="block text-[10px] uppercase tracking-wider text-white/70 mb-1 font-semibold">
                        Phone Number <span className="text-brand">*</span>
                      </label>
                      <input
                        id="enquiry-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/30 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-[11px] text-red-400">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="enquiry-destination" className="block text-[10px] uppercase tracking-wider text-white/70 mb-1 font-semibold">
                        Destination <span className="text-brand">*</span>
                      </label>
                      <select
                        id="enquiry-destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-[oklch(0.18_0.01_250)] px-4 py-3 text-sm text-white focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      >
                        {DESTINATION_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[oklch(0.18_0.01_250)] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.destination && (
                        <p className="mt-1 text-[11px] text-red-400">{errors.destination}</p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-brand/90 transition-colors disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" /> SUBMITTING...
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
