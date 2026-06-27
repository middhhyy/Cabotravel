import type { OptimizedRequest } from "@/types/OptimizedRequest";

export function generatePackingListLocally(request: OptimizedRequest): string[] {
  const base = [
    "Passport & IDs",
    "Universal Adapter",
    "Power Bank",
    "First Aid Kit",
    "Comfortable Walking Shoes",
  ];

  if (request.destination?.toLowerCase() === "bali" || request.interests?.includes("beach")) {
    base.push("Swimwear", "Reef-safe Sunscreen", "Sunglasses", "Flip-flops");
  }

  if (request.destination?.toLowerCase() === "kashmir" || request.month === "December") {
    base.push("Thermal Wear", "Heavy Jacket", "Gloves", "Woolen Socks");
  }

  return base;
}
