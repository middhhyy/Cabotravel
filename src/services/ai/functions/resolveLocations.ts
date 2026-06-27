import { createServerFn } from "@tanstack/react-start";
import { resolveLocationsInBackground } from "../pipeline/LocationResolver";
import type { TripResponse } from "@/types/itinerary";

export const resolveLocationsServerFn = createServerFn({ method: "POST" })
  .validator((trip: TripResponse) => trip)
  .handler(async ({ data: trip }): Promise<TripResponse> => {
    let finalTrip = trip;
    // We run it synchronously here because the client is awaiting it specifically for the progressive update.
    await resolveLocationsInBackground(trip, async (updatedTrip) => {
      finalTrip = updatedTrip;
    });
    return finalTrip;
  });
