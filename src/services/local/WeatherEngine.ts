import type { OptimizedRequest } from "@/types/OptimizedRequest";

export function getStaticWeather(request: OptimizedRequest) {
  // Real implementation would look up historical weather data
  return {
    averageTemp: request.month === "December" ? "22°C" : "28°C",
    condition: "Sunny with occasional clouds",
    bestTimeToVisit: "November to March",
  };
}
