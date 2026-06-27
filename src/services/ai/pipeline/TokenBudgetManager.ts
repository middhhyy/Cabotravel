import { estimateTokens } from "@/utils/estimateTokens";

const MAX_TOKENS = 4000;
const WARNING_THRESHOLD = 3000;

export class TokenBudgetManager {
  private currentEstimate = 0;

  checkBudget(payloadStr: string, systemPrompt: string): boolean {
    const tokens = estimateTokens(payloadStr) + estimateTokens(systemPrompt);
    this.currentEstimate += tokens;

    if (this.currentEstimate > WARNING_THRESHOLD) {
      console.warn(
        `[TokenBudgetManager] Warning: High token usage detected (~${this.currentEstimate})`,
      );
    }

    if (this.currentEstimate > MAX_TOKENS) {
      console.error(`[TokenBudgetManager] Error: Exceeded hard token limit of ${MAX_TOKENS}`);
      return false; // Force context reduction in a real app
    }
    return true;
  }

  getCurrentEstimate() {
    return this.currentEstimate;
  }
}
