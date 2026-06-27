import type { TripResponse } from "@/types/itinerary";

export class ResponseTransformer {
  static transform(raw: any): TripResponse {
    // 1. Ensure id exists
    if (!raw.id) raw.id = `trip-${Date.now()}`;

    // 2. Normalize currencies (ensure numbers)
    if (raw.budgetSummary) {
      if (typeof raw.budgetSummary.totalEstimated === "string") {
        raw.budgetSummary.totalEstimated =
          parseInt(raw.budgetSummary.totalEstimated.replace(/\D/g, ""), 10) || 0;
      }
    }

    // 3. Normalize defaults
    if (!raw.packingList) raw.packingList = [];
    if (!raw.weather)
      raw.weather = { averageTemp: "Unknown", condition: "Unknown", bestTimeToVisit: "Unknown" };
    if (!raw.hotels) raw.hotels = [];
    if (!raw.days) raw.days = [];

    // 4. Convert legacy string locations to unverified Location objects
    if (Array.isArray(raw.hotels)) {
      raw.hotels.forEach((hotel: any) => {
        if (typeof hotel.location === "string") {
          hotel.location = {
            id: `loc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            name: hotel.location,
            verified: false,
          };
        } else if (!hotel.location) {
          hotel.location = {
            id: `loc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            name: hotel.name,
            verified: false,
          };
        }
      });
    }

    if (Array.isArray(raw.days)) {
      raw.days.forEach((day: any) => {
        if (Array.isArray(day.activities)) {
          day.activities.forEach((activity: any) => {
            if (typeof activity.location === "string") {
              activity.location = {
                id: `loc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                name: activity.location,
                verified: false,
              };
            }
          });
        }
      });
    }

    // Ensure it strictly matches the interface
    return raw as TripResponse;
  }
}
