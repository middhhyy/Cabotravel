import { useState } from "react";
import type { TripResponse } from "@/types/itinerary";
import { updateItineraryServerFn } from "@/services/ai/functions/updateItinerary";

export function useUpdateTrip() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (
    command: string,
    currentTrip: TripResponse,
  ): Promise<TripResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateItineraryServerFn({ data: { command, currentTrip } });
      return result;
    } catch (err) {
      setError("Failed to update itinerary. Please try again.");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
}
