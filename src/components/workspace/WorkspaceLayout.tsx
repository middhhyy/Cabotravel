import type { TripResponse } from "@/types/itinerary";
import { useWorkspace } from "@/hooks/useWorkspace";
import { AICommandBar } from "./AICommandBar";
import { VersionHistoryPanel } from "./VersionHistoryPanel";
import { AIChatPanel } from "./AIChatPanel";
import { TravelScore } from "./TravelScore";
import { AIInsights } from "./AIInsights";
import { TripView } from "../itinerary/TripView";
import { LeadConversionSection } from "../conversion/LeadConversionSection";
import { useUpdateTrip } from "@/hooks/useUpdateTrip";
import { DeveloperDiagnostics } from "./DeveloperDiagnostics";
import { useEffect, useRef } from "react";
import { resolveLocationsServerFn } from "@/services/ai/functions/resolveLocations";

export function WorkspaceLayout({ initialTrip }: { initialTrip: TripResponse }) {
  const workspace = useWorkspace(initialTrip);
  const { update, loading } = useUpdateTrip();
  const resolvingRef = useRef(false);

  useEffect(() => {
    let hasUnverified = false;
    workspace.activeTrip.hotels?.forEach((h) => {
      if (h.location && !h.location.verified) hasUnverified = true;
    });
    workspace.activeTrip.days?.forEach((d) => {
      d.activities?.forEach((a) => {
        if (a.location && !a.location.verified) hasUnverified = true;
      });
    });

    if (hasUnverified && !resolvingRef.current) {
      resolvingRef.current = true;
      resolveLocationsServerFn({ data: workspace.activeTrip })
        .then((updatedTrip) => {
          workspace.updateCurrentVersion(updatedTrip);
        })
        .catch((err) => {
          console.error("Failed to resolve locations:", err);
        })
        .finally(() => {
          resolvingRef.current = false;
        });
    }
  }, [workspace.activeTrip, workspace.updateCurrentVersion]);

  const handleCommand = async (cmd: string) => {
    const updatedTrip = await update(cmd, workspace.activeTrip);
    if (updatedTrip) {
      workspace.saveNewVersion(updatedTrip, `Command: ${cmd}`);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row xl:h-screen bg-background xl:overflow-hidden overflow-y-auto">
      {/* Left Sidebar */}
      <aside className="hidden xl:block w-full xl:w-80 flex-shrink-0 border-b xl:border-b-0 xl:border-r border-white/10 bg-black/40 backdrop-blur-xl flex flex-col h-auto xl:h-full overflow-y-auto order-2 xl:order-none">
        <div className="p-6 space-y-8">
          <VersionHistoryPanel workspace={workspace} />
          <AIChatPanel trip={workspace.activeTrip} />
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col h-auto xl:h-full relative order-1 xl:order-none">
        <div className="sticky top-0 z-50 p-6 bg-background/80 backdrop-blur-xl border-b border-white/10">
          <AICommandBar onCommand={handleCommand} loading={loading} />
        </div>

        <div className="p-6 max-w-4xl mx-auto w-full pb-32">
          {/* We reuse the TripView for now, passing the active version */}
          <TripView trip={workspace.activeTrip} />
          <LeadConversionSection trip={workspace.activeTrip} />
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="hidden xl:block w-full xl:w-80 flex-shrink-0 border-t xl:border-t-0 xl:border-l border-white/10 bg-black/40 backdrop-blur-xl flex flex-col h-auto xl:h-full overflow-y-auto order-3 xl:order-none">
        <div className="p-6 space-y-8">
          <TravelScore trip={workspace.activeTrip} />
          <AIInsights trip={workspace.activeTrip} />
        </div>
      </aside>

      <DeveloperDiagnostics trip={workspace.activeTrip} />
    </div>
  );
}
