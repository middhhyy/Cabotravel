import { Activity } from "lucide-react";
import type { TripResponse } from "@/types/itinerary";

export function TravelScore({ trip }: { trip: TripResponse }) {
  // Placeholder logic for calculating score based on itinerary density, budget, etc.
  const score = 92;

  return (
    <div className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
      <div className="p-4 border-b border-white/5 flex items-center gap-2">
        <Activity className="h-4 w-4 text-brand" />
        <h3 className="text-sm font-medium text-white">Travel Quality</h3>
      </div>

      <div className="p-6 text-center">
        <div className="relative inline-flex items-center justify-center mb-2">
          <svg className="w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-white/10"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-brand"
              strokeDasharray="251"
              strokeDashoffset={251 - (251 * score) / 100}
            />
          </svg>
          <span className="absolute text-2xl font-bold text-white">{score}</span>
        </div>
        <div className="text-sm text-brand font-medium">Excellent Balance</div>
        <p className="text-xs text-white/40 mt-2">Perfect mix of activities and downtime.</p>
      </div>
    </div>
  );
}
