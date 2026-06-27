import { createServerFn } from "@tanstack/react-start";
import { executeAIPipeline } from "../pipeline/FallbackManager";
import { ResponseTransformer } from "../pipeline/ResponseTransformer";
import { ResponseMerger } from "../pipeline/ResponseMerger";
import { getCachedItinerary, setCachedItinerary } from "../pipeline/CacheManager";
import { resolveLocationsInBackground } from "../pipeline/LocationResolver";
import type { TripResponse } from "@/types/itinerary";

interface UpdateRequest {
  command: string;
  currentTrip: TripResponse;
}

export const updateItineraryServerFn = createServerFn({ method: "POST" })
  .validator((request: UpdateRequest) => request)
  .handler(async ({ data: request }): Promise<TripResponse> => {
    console.log(`[UpdateItinerary] Processing command: "${request.command}"`);

    const enhancedPrompt = `
    You are an expert AI Travel Planner. The user wants to modify their existing itinerary.
    User Command: "${request.command}"
    
    Current Itinerary (JSON):
    ${JSON.stringify(request.currentTrip)}
    
    Instructions:
    1. Understand the user's intent.
    2. Regenerate ONLY the parts of the itinerary that need changing (e.g. if they want a cheaper trip, update hotels and activities).
    3. Keep the overall structure identical to the original TripResponse schema.
    4. Return the updated fields.
  `;

    // We pass an empty optimized request since the context is in the prompt
    // executeAIPipeline will return a partial or full TripResponse
    const aiUpdates = await executeAIPipeline(
      { d: request.currentTrip.destination?.name || "" },
      enhancedPrompt,
    );

    // Merge the AI updates onto the current trip
    const merged = ResponseMerger.merge(request.currentTrip, aiUpdates);
    const canonical = ResponseTransformer.transform(merged);

    // 6. Save update
    await setCachedItinerary(request.originalRequest, canonical);

    // 7. Background Resolution
    setTimeout(() => {
      resolveLocationsInBackground(canonical, async (updatedTrip) => {
        await setCachedItinerary(request.originalRequest, updatedTrip);
      });
    }, 0);

    return canonical;
  });
