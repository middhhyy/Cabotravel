export function normalizeString(input?: string | null): string | undefined {
  if (!input) return undefined;
  const trimmed = input.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function normalizeCurrency(budget?: string | null): number | undefined {
  if (!budget) return undefined;
  // Naive normalizer: economy -> 50000, standard -> 100000, etc.
  // In a real app, this could be more sophisticated.
  const lower = budget.toLowerCase();
  if (lower.includes("economy")) return 50000;
  if (lower.includes("standard")) return 100000;
  if (lower.includes("premium")) return 200000;
  if (lower.includes("luxury")) return 500000;

  const parsed = parseInt(budget.replace(/\D/g, ""), 10);
  return isNaN(parsed) ? undefined : parsed;
}

export function normalizeTravelers(travelers?: string | null): number | undefined {
  if (!travelers) return undefined;
  const lower = travelers.toLowerCase();
  if (lower.includes("solo")) return 1;
  if (lower.includes("couple")) return 2;
  if (lower.includes("family")) return 4;
  if (lower.includes("group")) return 6;
  return undefined;
}
