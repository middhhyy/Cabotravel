import { createServerFn } from "@tanstack/react-start";
import { getTripById } from "../pipeline/CacheManager";
import type { TripResponse } from "@/types/itinerary";

export const getTripByIdServerFn = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }): Promise<TripResponse> => {
    const trip = await getTripById(id);
    if (!trip) {
      throw new Error(`Trip not found for id: ${id}`);
    }
    return trip;
  });
