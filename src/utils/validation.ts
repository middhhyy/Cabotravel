export function validatePrompt(prompt: string): boolean {
  return prompt.trim().length > 10;
}
