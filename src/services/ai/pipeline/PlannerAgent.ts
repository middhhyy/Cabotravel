import { executeAIPipeline } from "./FallbackManager";
import { TokenBudgetManager } from "./TokenBudgetManager";
import { WeatherAdapter } from "../../external/WeatherAdapter";
import { CurrencyAdapter } from "../../external/CurrencyAdapter";
import { PlacesAdapter } from "../../external/PlacesAdapter";
import { buildSystemPrompt } from "./PromptBuilder";
import type { OptimizedRequest } from "@/types/OptimizedRequest";
import type { TripResponse } from "@/types/itinerary";

export class PlannerAgent {
  private budgetManager = new TokenBudgetManager();

  async orchestrate(request: OptimizedRequest, onProgress?: (msg: string) => void): Promise<any> {
    console.log("[PlannerAgent] Orchestrating request...");
    onProgress?.("Fetching live travel data...");

    // 1. External Data Retrieval (Zero Tokens, High Fidelity)
    const [weatherContext, currencyContext, placesContext] = await Promise.all([
      WeatherAdapter.getForecast(request.d || "Unknown", request.m || "Unknown"),
      CurrencyAdapter.getExchangeRate(),
      PlacesAdapter.getTopAttractions(request.d || "Unknown"),
    ]);

    console.log("[PlannerAgent] External context retrieved.");
    onProgress?.("Planning itinerary...");

    // 2. Inject context into custom prompt
    const enhancedPrompt = `${buildSystemPrompt()}

Generate the itinerary based on this verified live data:
- Weather: ${weatherContext.averageTemp}, ${weatherContext.condition}.
- Currency: 1 ${currencyContext.base} = ${currencyContext.rate} ${currencyContext.target}.
- Top Attractions to include: ${placesContext.map((p) => p.name).join(", ")}.

User Request: ${JSON.stringify(request)}`;

    // 3. Fallback Manager (Executes Gemini/Grok)
    const rawResult = await executeAIPipeline(request, enhancedPrompt);
    return rawResult;
  }
}
