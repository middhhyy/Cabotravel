import type { OptimizedRequest } from "@/types/OptimizedRequest";

export function calculateBudgetLocally(request: OptimizedRequest) {
  // Deterministic local logic
  const days = request.days || 3;
  const travelers = request.travelers || 2;
  const styleMultiplier = request.style === "Luxury" ? 3 : request.style === "Premium" ? 2 : 1;

  const flights = 15000 * travelers;
  const accommodation = 5000 * styleMultiplier * days * Math.ceil(travelers / 2);
  const activities = 2000 * styleMultiplier * days * travelers;
  const food = 1500 * styleMultiplier * days * travelers;
  const transport = 1000 * styleMultiplier * days;

  return {
    totalEstimated: flights + accommodation + activities + food + transport,
    currency: "INR",
    breakdown: { flights, accommodation, activities, food, transport },
  };
}
