import { useState } from "react";
import type { TripRequest } from "@/types/itinerary";
import { generateItineraryServerFn } from "@/services/ai/functions/generateItinerary";

export function useGenerateTrip() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (request: TripRequest): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateItineraryServerFn({ data: request });
      return result.id;
    } catch (err) {
      setError("Failed to generate itinerary. Please try again.");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
  };

  return { generate, reset, loading, error };
}
