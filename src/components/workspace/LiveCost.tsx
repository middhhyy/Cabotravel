import { Wallet, CheckCircle2 } from "lucide-react";
import type { TripResponse } from "@/types/itinerary";

export function LiveCost({ trip }: { trip: TripResponse }) {
  const budget = trip.budgetSummary;

  return (
    <div className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-brand" />
          <h3 className="text-sm font-medium text-white">Live Cost</h3>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 rounded-full">
          <CheckCircle2 className="h-3 w-3 text-green-500" />
          <span className="text-[10px] font-medium text-green-500 uppercase tracking-wider">
            Live Rate
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="text-3xl font-display text-white mb-6">
          {budget?.currency || "INR"} {(budget?.totalEstimated || 0).toLocaleString()}
        </div>

        <div className="space-y-3">
          {budget?.breakdown &&
            Object.entries(budget.breakdown).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center text-sm">
                <span className="text-white/60 capitalize">{key}</span>
                <span className="text-white font-medium">{(value as number).toLocaleString()}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
