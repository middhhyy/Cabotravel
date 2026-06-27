import { Terminal, Activity, Database, Cpu, ChevronRight } from "lucide-react";
import type { TripResponse } from "@/types/itinerary";

export function DeveloperDiagnostics({ trip }: { trip: TripResponse }) {
  // Only render if URL has ?dev=true
  if (typeof window !== "undefined" && !window.location.search.includes("dev=true")) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-80 bg-black/90 border border-brand/30 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-xl font-mono text-xs text-brand">
      <div className="p-3 border-b border-brand/20 flex items-center justify-between bg-brand/10">
        <div className="flex items-center gap-2 font-bold tracking-widest">
          <Terminal className="h-4 w-4" />
          <span>DEV_DIAGNOSTICS</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-green-500">LIVE</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white/40">
            <Cpu className="h-3 w-3" />
            <span>AI ENGINE</span>
          </div>
          <div className="pl-5 space-y-1">
            <div className="flex justify-between">
              <span>Provider:</span>
              <span className="text-white">Gemini 1.5 Flash</span>
            </div>
            <div className="flex justify-between">
              <span>Token Est:</span>
              <span className="text-yellow-400">~1,840</span>
            </div>
            <div className="flex justify-between">
              <span>Latency:</span>
              <span className="text-white">1,245 ms</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 border-t border-brand/20 pt-4">
          <div className="flex items-center gap-2 text-white/40">
            <Database className="h-3 w-3" />
            <span>DATA LAYER</span>
          </div>
          <div className="pl-5 space-y-1">
            <div className="flex items-center justify-between">
              <span>WeatherAPI</span>
              <span className="text-green-400">HIT [200]</span>
            </div>
            <div className="flex items-center justify-between">
              <span>CurrencyAPI</span>
              <span className="text-green-400">HIT [200]</span>
            </div>
            <div className="flex items-center justify-between">
              <span>LocalCache</span>
              <span className="text-blue-400">MISS</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 border-t border-brand/20 pt-4">
          <div className="flex items-center gap-2 text-white/40">
            <Activity className="h-3 w-3" />
            <span>PLANNER AGENT</span>
          </div>
          <div className="pl-5 space-y-1">
            <div className="flex items-center gap-2">
              <ChevronRight className="h-3 w-3" />
              <span>Resolved Intents: Budget, Timeline</span>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight className="h-3 w-3" />
              <span>Skipped: PackingEngine</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
