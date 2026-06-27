import type { TripResponse } from "@/types/itinerary";

export class CriticalValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CriticalValidationError";
  }
}

export function extractJson(rawResponse: string): any {
  let clean = rawResponse.trim();

  // Strip markdown blocks if present
  if (clean.startsWith("```json")) {
    clean = clean
      .replace(/^```json/, "")
      .replace(/```$/, "")
      .trim();
  } else if (clean.startsWith("```")) {
    clean = clean.replace(/^```/, "").replace(/```$/, "").trim();
  }

  try {
    return JSON.parse(clean);
  } catch (error) {
    console.error("Failed to parse AI JSON:", clean);
    throw new Error("Invalid JSON syntax");
  }
}

export function validateLevel3(data: any): any {
  // Level 3 Critical validation logic
  // We only check for 'o' (overview) and 'd' (days array) now
  if (!data.o || !Array.isArray(data.d) || data.d.length === 0) {
    throw new CriticalValidationError("Missing critical Level 3 fields ('o' or 'd')");
  }

  return data;
}
