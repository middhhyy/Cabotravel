export function buildSystemPrompt(): string {
  return `Return JSON only.

Generate:
overview
days
tips
hiddenGems

Do not include hotels, weather, currency, coordinates, budget, IDs, maps, or markdown.

CRITICAL: Generate specific, real-world, geocodable place names for activities (e.g., "Kuta Beach" or "Uluwatu Temple" instead of "Beach Walk" or "Visit local temple") so they can be resolved to coordinates.

Use short keys:
o = overview
d = days (array of objects with 't' for title/theme and 'a' for activities array of strings)
g = hidden gems (array of strings)
tp = tips (array of strings)

Example output:
{
  "o": "Relaxing tropical vacation.",
  "d": [ { "t": "Arrival", "a": ["Ngurah Rai Airport", "Seminyak Beach", "La Lucciola Restaurant"] } ],
  "g": ["Nyang Nyang Beach"],
  "tp": ["Carry sunscreen"]
}`;
}
