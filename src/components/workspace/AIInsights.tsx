import { Lightbulb, ArrowRight } from "lucide-react";
import type { TripResponse } from "@/types/itinerary";

export function AIInsights({ trip }: { trip: TripResponse }) {
  return (
    <div className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
      <div className="p-4 border-b border-white/5 flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-brand" />
        <h3 className="text-sm font-medium text-white">AI Insights</h3>
      </div>

      <div className="p-4 space-y-3">
        <div className="p-3 bg-brand/5 border border-brand/10 rounded-xl cursor-pointer hover:bg-brand/10 transition-colors group">
          <p className="text-sm text-white/80 mb-2">
            Save ₹12,000 by changing to a 4-star boutique hotel.
          </p>
          <div className="text-xs text-brand font-medium flex items-center gap-1">
            Apply Suggestion{" "}
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div className="p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors group">
          <p className="text-sm text-white/80 mb-2">Better weather if you shift dates by 1 week.</p>
          <div className="text-xs text-brand font-medium flex items-center gap-1">
            View Dates{" "}
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
