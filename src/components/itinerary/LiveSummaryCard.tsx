import { motion } from "framer-motion";
import type { TripRequest } from "@/types/itinerary";
import { MapPin, Calendar, Wallet, Users, Compass, Bed, Clock } from "lucide-react";

export function LiveSummaryCard({ state }: { state: Partial<TripRequest> }) {
  if (!state.destination) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto mt-12 bg-white/[0.02] backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-[50px] -z-10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px] -z-10" />

      <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
        AI Itinerary Plan
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-3">
          <MapPin className="h-4 w-4 text-brand mt-0.5" />
          <div>
            <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
              Destination
            </div>
            <div className="text-white text-sm font-medium truncate">{state.destination}</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar className="h-4 w-4 text-brand mt-0.5" />
          <div>
            <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Duration</div>
            <div className="text-white text-sm font-medium">{state.duration || 3} Days</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Wallet className="h-4 w-4 text-brand mt-0.5" />
          <div>
            <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Budget</div>
            <div className="text-white text-sm font-medium">{state.budget || "Standard"}</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users className="h-4 w-4 text-brand mt-0.5" />
          <div>
            <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Travelers</div>
            <div className="text-white text-sm font-medium capitalize">
              {state.travelers || "Couple"}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Bed className="h-4 w-4 text-brand mt-0.5" />
          <div>
            <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Stay</div>
            <div className="text-white text-sm font-medium">{state.accommodation || "Hotel"}</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Compass className="h-4 w-4 text-brand mt-0.5" />
          <div>
            <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Vibe</div>
            <div className="text-white text-sm font-medium truncate max-w-[180px]" title={state.interests && state.interests.length > 0 ? state.interests.join(", ") : (state.travelStyle || "Relaxing")}>
              {state.interests && state.interests.length > 0
                ? state.interests.join(", ")
                : (state.travelStyle || "Relaxing")}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/40 text-xs">
          <Clock className="h-3.5 w-3.5" />
          <span>Estimated Generation Time</span>
        </div>
        <div className="text-brand text-xs font-medium">~15 seconds</div>
      </div>
    </motion.div>
  );
}
