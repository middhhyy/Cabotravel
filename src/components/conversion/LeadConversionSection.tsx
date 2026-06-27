import { useState } from "react";
import { HandCoins, CalendarDays, Heart } from "lucide-react";
import { RequestQuoteModal } from "./RequestQuoteModal";
import { BookConsultationModal } from "./BookConsultationModal";
import { ShareItineraryModal } from "./ShareItineraryModal";
import type { TripResponse } from "@/types/itinerary";

export function LeadConversionSection({ trip }: { trip: TripResponse }) {
  const [activeModal, setActiveModal] = useState<"quote" | "consultation" | "share" | null>(null);

  return (
    <div className="mt-24 mb-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-display text-white mb-4">
          Love your itinerary? Let's make it happen.
        </h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Our travel experts can personalize, optimize, and book this itinerary for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quote Card */}
        <div
          onClick={() => setActiveModal("quote")}
          className="group relative bg-black/40 border border-white/10 rounded-3xl p-8 hover:bg-white/5 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center text-center backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-brand/0 via-brand/0 to-brand/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <HandCoins className="h-8 w-8 text-brand" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Request a Quote</h3>
          <p className="text-white/60 text-sm mb-6 flex-1">
            Receive a customized quotation based on your preferred hotels, flights, activities, and
            travel dates.
          </p>
          <button className="w-full py-3 rounded-full bg-brand text-white font-medium hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-shadow">
            Request Quote
          </button>
        </div>

        {/* Consultation Card */}
        <div
          onClick={() => setActiveModal("consultation")}
          className="group relative bg-black/40 border border-white/10 rounded-3xl p-8 hover:bg-white/5 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center text-center backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <CalendarDays className="h-8 w-8 text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Book Consultation</h3>
          <p className="text-white/60 text-sm mb-6 flex-1">
            Schedule a free consultation with a travel expert to refine and personalize your trip.
          </p>
          <button className="w-full py-3 rounded-full bg-blue-500 text-white font-medium hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-shadow">
            Book Free Call
          </button>
        </div>

        {/* Share Card */}
        <div
          onClick={() => setActiveModal("share")}
          className="group relative bg-black/40 border border-white/10 rounded-3xl p-8 hover:bg-white/5 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center text-center backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-rose-500/0 via-rose-500/0 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Heart className="h-8 w-8 text-rose-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">Save & Share</h3>
          <p className="text-white/60 text-sm mb-6 flex-1">
            Save your itinerary to revisit later or share it with family and friends.
          </p>
          <button className="w-full py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
            Save & Share
          </button>
        </div>
      </div>

      {/* Modals */}
      {activeModal === "quote" && (
        <RequestQuoteModal trip={trip} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "consultation" && (
        <BookConsultationModal trip={trip} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "share" && (
        <ShareItineraryModal trip={trip} onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}
