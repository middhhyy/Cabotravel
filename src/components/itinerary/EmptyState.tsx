import { OverviewPanel } from "./OverviewPanel";
import { BudgetPanel } from "./BudgetPanel";
import { TimelinePanel } from "./TimelinePanel";
import { WeatherPanel, MapPanel, PackingPanel } from "./MiscPanels";
import { motion } from "framer-motion";

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mt-16 border-t border-white/10 pt-16"
    >
      <div className="text-center mb-16">
        <h2 className="text-xl font-medium tracking-wide text-white/50">
          Your itinerary will appear here
        </h2>
        <p className="mt-2 text-sm text-white/30">
          Fill in your preferences above to unlock a custom travel experience.
        </p>
      </div>

      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50 grayscale pointer-events-none select-none transition-all duration-1000">
        <OverviewPanel />
        <BudgetPanel />
        <TimelinePanel />
        <WeatherPanel />
        <MapPanel />
        <PackingPanel />
      </div>
    </motion.div>
  );
}
