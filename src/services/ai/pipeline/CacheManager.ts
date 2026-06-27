import type { TripResponse } from "@/types/itinerary";
import { generateCacheKey } from "@/utils/hash";
import type { OptimizedRequest } from "@/types/OptimizedRequest";

const cache = new Map<string, TripResponse>();

export async function getCachedItinerary(request: OptimizedRequest): Promise<TripResponse | null> {
  const key = await generateCacheKey(request);
  return cache.get(key) || null;
}

export async function setCachedItinerary(
  request: OptimizedRequest,
  response: TripResponse,
): Promise<void> {
  const key = await generateCacheKey(request);
  cache.set(key, response);
}

export async function getTripById(id: string): Promise<TripResponse | null> {
  for (const trip of cache.values()) {
    if (trip.id === id) {
      return trip;
    }
  }
  return null;
}
