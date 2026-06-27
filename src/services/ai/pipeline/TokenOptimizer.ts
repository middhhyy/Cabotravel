import type { TripRequest } from "@/types/itinerary";
import { normalizeCurrency, normalizeTravelers } from "./Normalizer";

/**
 * Applies smart defaults and strips all empty data.
 * Outputs the ultra-compact JSON payload for the AI.
 */
export function optimizeRequest(request: TripRequest): any {
  const rawPayload = {
    d: request.destination,
    dy: request.duration || 3, // days
    b: normalizeCurrency(request.budget) || "Standard", // budget
    t: normalizeTravelers(request.travelers) || "Couple", // travelers
    s:
      request.interests && request.interests.length > 0
        ? request.interests
        : [request.travelStyle || "Relaxing"], // styles
  };

  const optimized: any = {};
  for (const [key, value] of Object.entries(rawPayload)) {
    if (value !== null && value !== undefined && value !== "") {
      optimized[key] = value;
    }
  }

  return optimized;
}
