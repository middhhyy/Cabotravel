import { GeminiProvider } from "../providers/GeminiProvider";
import { GroqProvider } from "../providers/GroqProvider";
import { buildSystemPrompt } from "./PromptBuilder";
import { extractJson, validateLevel3, CriticalValidationError } from "./ResponseValidator";
import { ResponseRecovery } from "./ResponseRecovery";
import { ProviderScorer } from "./ProviderScorer";

const providers = [
  new GeminiProvider(), // Primary
  new GroqProvider(), // Fallback
];

export async function executeAIPipeline(payload: any, customPrompt?: string): Promise<any> {
  let prompt = customPrompt || buildSystemPrompt();
  const startTime = Date.now();

  for (let i = 0; i < providers.length; i++) {
    const provider = providers[i];
    let attempts = i === 0 ? 2 : 1; // Retry Gemini once, don't retry Groq

    while (attempts > 0) {
      try {
        console.log(`[AI Engine] Attempting generation with ${provider.name}...`);
        const rawResponse = await provider.generateItinerary(payload, prompt);

        // 1. Extract JSON
        const parsedData = extractJson(rawResponse);

        // 2. Recover (Level 2 fixes - missing optional arrays, ids, etc)
        const originalStringified = JSON.stringify(parsedData);
        const recoveredData = ResponseRecovery.recover(parsedData);
        const wasRecovered = originalStringified !== JSON.stringify(recoveredData);

        // 3. Level 3 Strict Validation
        const canonical = validateLevel3(recoveredData);

        // 4. Log Success / Recovery
        const latency = Date.now() - startTime;
        ProviderScorer.logScore(provider.name, wasRecovered ? "RECOVERED" : "SUCCESS", latency);

        return canonical;
      } catch (error) {
        attempts--;
        console.warn(`[AI Engine] ${provider.name} failed:`, error);

        if (error instanceof CriticalValidationError && attempts > 0) {
          console.warn(
            `[AI Engine] Critical missing fields. Retrying ${provider.name} with stricter prompt...`,
          );
          // Append strict warning to prompt for the retry
          prompt +=
            "\n\nCRITICAL: You must include all required fields including 'title', 'destination', and 'days' array. Ensure JSON is strictly valid.";
        } else if (attempts === 0) {
          const latency = Date.now() - startTime;
          ProviderScorer.logScore(provider.name, "FAILED", latency);
          console.warn(`[AI Engine] Exhausted attempts for ${provider.name}. Moving to fallback.`);
        } else {
          console.warn(`[AI Engine] Retrying ${provider.name}...`);
        }
      }
    }
  }

  throw new Error("All AI providers failed to generate a valid itinerary.");
}
