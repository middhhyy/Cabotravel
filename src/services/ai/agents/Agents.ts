import type { OptimizedRequest } from "@/types/OptimizedRequest";
import { executeAIPipeline } from "../pipeline/FallbackManager";

export class DestinationAgent {
  static async run(request: OptimizedRequest) {
    // Only pass minimum context
    const minimalRequest: any = { destination: request.destination };
    return executeAIPipeline(
      minimalRequest,
      "Return JSON for destination overview, culture, visa.",
    );
  }
}

export class TimelineAgent {
  static async run(request: OptimizedRequest) {
    const minimalRequest = {
      destination: request.destination,
      days: request.days,
      style: request.style,
    };
    return executeAIPipeline(minimalRequest, "Return JSON for a daily itinerary timeline.");
  }
}

export class ActivityAgent {
  static async run(request: OptimizedRequest) {
    const minimalRequest = { destination: request.destination, interests: request.interests };
    return executeAIPipeline(minimalRequest, "Return JSON for activities and hidden gems.");
  }
}

export class HotelAgent {
  static async run(request: OptimizedRequest) {
    const minimalRequest = {
      destination: request.destination,
      budget: request.budget,
      style: request.style,
    };
    return executeAIPipeline(
      minimalRequest,
      "Return JSON for 3 recommended hotels in this budget.",
    );
  }
}

export class TravelTipsAgent {
  static async run(request: OptimizedRequest) {
    const minimalRequest = { destination: request.destination };
    return executeAIPipeline(minimalRequest, "Return JSON for travel tips, safety, and etiquette.");
  }
}
