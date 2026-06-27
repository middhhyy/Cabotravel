import type { TripResponse } from "./itinerary";
import type { OptimizedRequest } from "./OptimizedRequest";

export interface AIProvider {
  name: string;
  generateItinerary(payload: OptimizedRequest, prompt: string): Promise<string>;
}
