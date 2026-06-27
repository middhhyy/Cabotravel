/**
 * Rough estimation for token count (approx. 4 chars per token).
 * Used only for internal metrics/logging.
 */
export function estimateTokens(text: string): number {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}
