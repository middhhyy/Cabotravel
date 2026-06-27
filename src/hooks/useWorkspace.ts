import { useState } from "react";
import type { TripResponse } from "@/types/itinerary";

export interface Version {
  id: string;
  name: string;
  data: TripResponse;
  timestamp: number;
}

export function useWorkspace(initialTrip: TripResponse) {
  const [versions, setVersions] = useState<Version[]>([
    {
      id: initialTrip.id,
      name: "Original Version",
      data: initialTrip,
      timestamp: Date.now(),
    },
  ]);

  const [currentVersionId, setCurrentVersionId] = useState<string>(initialTrip.id);

  const activeTrip = versions.find((v) => v.id === currentVersionId)?.data || initialTrip;

  const saveNewVersion = (newData: TripResponse, name?: string) => {
    const newVersion: Version = {
      id: `trip-${Date.now()}`,
      name: name || `Version ${versions.length + 1}`,
      data: newData,
      timestamp: Date.now(),
    };
    setVersions((prev) => [...prev, newVersion]);
    setCurrentVersionId(newVersion.id);
  };

  const updateCurrentVersion = (updates: Partial<TripResponse>) => {
    setVersions((prev) =>
      prev.map((v) => (v.id === currentVersionId ? { ...v, data: { ...v.data, ...updates } } : v)),
    );
  };

  return {
    activeTrip,
    versions,
    currentVersionId,
    setCurrentVersionId,
    saveNewVersion,
    updateCurrentVersion,
  };
}
