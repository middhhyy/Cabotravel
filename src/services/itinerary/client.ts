import type { TripRequest, TripResponse } from "@/types/itinerary";

/**
 * Mock generator for Phase 1.
 * This simulates network latency but does not actually return a real itinerary yet.
 */
export async function generateTripMock(request: TripRequest): Promise<TripResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In Phase 1, we just return a stub response.
      // The user explicitly requested NOT to generate fake itineraries,
      // so this stub is only to satisfy the TS compiler for the hook.
      resolve({
        id: "mock-123",
        title: "Your Personalized Journey",
        summary: "This is a placeholder summary for Phase 1.",
        destination: {
          name: request.destination || "TBD",
          country: "TBD",
          description: "TBD",
          image: "",
        },
        days: [],
        hotels: [],
        budgetSummary: {
          totalEstimated: 0,
          currency: "USD",
          breakdown: { flights: 0, accommodation: 0, activities: 0, food: 0, transport: 0 },
        },
        weather: {
          averageTemp: "TBD",
          condition: "TBD",
          bestTimeToVisit: "TBD",
        },
        packingList: [],
      });
    }, 2000); // 2 second mock delay
  });
}
