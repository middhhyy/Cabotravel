import { X, Send } from "lucide-react";
import type { TripResponse } from "@/types/itinerary";
import { useState } from "react";

export function RequestQuoteModal({ trip, onClose }: { trip: TripResponse; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate server call
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-background border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Request a Quote</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {status === "success" ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <Send className="h-8 w-8 text-green-400" />
            </div>
            <h4 className="text-2xl font-semibold text-white mb-2">Request Sent!</h4>
            <p className="text-white/60">
              Our travel experts will review your itinerary and get back to you within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-8 px-6 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/60 mb-1">First Name</label>
                <input
                  required
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-brand focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Last Name</label>
                <input
                  required
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-brand focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/60 mb-1">Email</label>
                <input
                  required
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-brand focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Phone Number</label>
                <input
                  required
                  type="tel"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-brand focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/60 mb-1">Departure City</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-brand focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Travelers</label>
                <input
                  type="number"
                  min="1"
                  defaultValue="2"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-brand focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-1">
                Special Requirements (Optional)
              </label>
              <textarea
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-brand focus:outline-none resize-none"
              ></textarea>
            </div>

            <button
              disabled={status === "submitting"}
              className="w-full mt-4 py-3 bg-brand text-white font-medium rounded-xl hover:bg-brand/90 transition-colors flex items-center justify-center gap-2"
            >
              {status === "submitting" ? (
                <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                "Submit Request"
              )}
            </button>
            <p className="text-center text-xs text-white/40 mt-4">
              Your itinerary details ({trip.destination?.name}) will be automatically attached.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
