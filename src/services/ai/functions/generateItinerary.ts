import { createServerFn } from "@tanstack/react-start";
import { optimizeRequest } from "../pipeline/TokenOptimizer";
import { getCachedItinerary, setCachedItinerary } from "../pipeline/CacheManager";
import { resolveLocationsInBackground } from "../pipeline/LocationResolver";
import { PlannerAgent } from "../pipeline/PlannerAgent";
import { calculateBudgetLocally } from "../../local/BudgetEngine";
import { generatePackingListLocally } from "../../local/PackingEngine";
import { getStaticWeather } from "../../local/WeatherEngine";
import { ResponseMerger } from "../pipeline/ResponseMerger";
import { ResponseTransformer } from "../pipeline/ResponseTransformer";
import type { TripRequest, TripResponse } from "@/types/itinerary";

export const generateItineraryServerFn = createServerFn({ method: "POST" })
  .validator((request: TripRequest) => request)
  .handler(async ({ data: request }): Promise<TripResponse> => {
    // 1. Optimize input payload
    const optimized = optimizeRequest(request);

    // 2. Cache Lookup
    const cached = await getCachedItinerary(optimized);
    if (cached) return cached;

    // 3. Local Engine (Zero Tokens)
    const localData = {
      budgetSummary: calculateBudgetLocally(optimized),
      packingList: generatePackingListLocally(optimized),
      weather: getStaticWeather(optimized),
      hotels: [],
      destination: {
        name: request.destination || "Unknown Destination",
        country: "",
        description: "",
        image: "",
      },
    };

    // 4. Planner Agent (Orchestrates AI)
    const planner = new PlannerAgent();
    const aiData = await planner.orchestrate(optimized);

    // 5. Merge & Transform (Assembler)
    const canonical = ResponseMerger.assemble(aiData, request, localData);

    // 6. Cache initially (unverified)
    await setCachedItinerary(optimized, canonical);

    // 7. Background Resolution
    setTimeout(() => {
      resolveLocationsInBackground(canonical, async (updatedTrip) => {
        await setCachedItinerary(optimized, updatedTrip);
      });
    }, 0);

    return canonical;
  });
